const Fs = require('fs');
const Path = require('path');

const Loader = require('@assemblyscript/loader');

const Bin = Fs.readFileSync(Path.join(__dirname, 'build', 'optimized.wasm'));
const imports = {};
const asmModule = Loader.instantiateBuffer(Bin, imports);

asmModule.getStringArray = function (ptr) {

    const U32 = this.U32;
    const ptr0 = ptr >>> 2;
    const dataStart = (U32[ptr0] >>> 2) + 2; // 0 -> size; 1 -> static 0
    const len = U32[ptr0 + 1];

    return Array.from(U32.subarray(dataStart, dataStart + len), this.getString);
};

asmModule.newStringArray = function (arr) {

    const dataLength = arr.length;
    const pointers = arr.map((x) => this.newString(x));
    const U32 = this.U32;

    const ptr = this.allocate_memory(arr.length + 4);
    const ptr0 = ptr >>> 2;

    U32[ptr0 + 1] = dataLength;
    const dataStart = ptr0 + 2;
    U32[ptr0] = dataStart << 2;
    U32[dataStart] = dataLength << 2;
    U32[dataStart + 1] = 0;

    for (let i = 0; i < dataStart; ++i) {
        U32[dataStart + 2 + i] = pointers[i];
    }
    return ptr;
};

const ptr = asmModule.newStringArray(['a', 'b', 'j', 'aime', 'les', 'licornes']);

console.log(asmModule.getStringArray(ptr));
