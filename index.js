const Fs = require('fs');
const Path = require('path');

const Loader = require('@assemblyscript/loader');

const Lib = require('./lib');

const Bin = Fs.readFileSync(Path.join(__dirname, 'build', 'untouched.wasm'));
const imports = {
    env: {
        log: function (x,y) {
            console.log(x, y, asmModule.getString(y));
        }
    }
};
const asmModule = Loader.instantiateBuffer(Bin, imports);

asmModule.getStringArray = Lib.getStringArray;

asmModule.newStringArray = Lib.newStringArray;


const path = asmModule.newString('alpha');
const params = asmModule.newString(['hello', '/etc/passwd'].join('|'));
const ptr = asmModule.pre(path, params);
console.log(ptr, asmModule.getStringArray(ptr));