'use strict';
const Path = require('path');
const Fs = require('fs');

const Loader = require('@assemblyscript/loader');

const Bin = Fs.readFileSync(Path.join(__dirname, 'lib.wasm'));
const imports = {};
const Module = Loader.instantiateBuffer(Bin, imports);

const includes = function (a, b) {

    const a_ptr = Module.newString(a);
    const b_ptr = Module.newString(b);

    const result = Boolean(Module._includes(a_ptr, b_ptr));

    Module.free_memory(a_ptr);
    Module.free_memory(b_ptr);
    return result;
};

Module.includes = includes;

module.exports = Module;
