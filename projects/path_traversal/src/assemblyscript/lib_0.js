'use strict';
const Path = require('path');
const Fs = require('fs');

const Loader = require('@assemblyscript/loader');

const Bin = Fs.readFileSync(Path.join(__dirname, 'lib.wasm'));
const imports = {};
const Module = Loader.instantiateBuffer(Bin, imports);

const findInjectedPaths = function (str, params) {

    const str_ptr = Module.newString(str);
    const params_ptr = Module.newString(params);

    const result = Boolean(Module._findInjectedPaths(str_ptr, params_ptr));

    Module.free_memory(str_ptr);
    Module.free_memory(params_ptr);
    return result;
};

Module.findInjectedPaths = findInjectedPaths;

module.exports = Module;
