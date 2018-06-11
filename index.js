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


const path = asmModule.newString('/etc/passwd');
const params = asmModule.newStringArray(['hello', '/etc/passwd']);
const ptr = asmModule.pre(path, params);
console.log(asmModule.getStringArray(ptr));