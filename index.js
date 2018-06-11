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


