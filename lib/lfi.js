/**
 * Copyright (c) 2016 - 2018 Sqreen. All Rights Reserved.
 * Please refer to our terms for more information: https://www.sqreen.io/terms.html
 */
'use strict';
const Fs = require('fs');
const Path = require('path');

const Loader = require('@assemblyscript/loader');

let asmModule;

const getModule = function () {
    const Bin = Fs.readFileSync(Path.join(__dirname, '..', 'build', 'lfi.optimized.wasm'));
    const imports = {};
    return Loader.instantiateBuffer(Bin, imports);
};

const rawPre = module.exports.rawPre = function (path, params) {

    const path_ptr = asmModule.newString(path);
    const params_ptr = asmModule.newString(params.join('|'));

    const res = asmModule.pre(path_ptr, params_ptr);

    asmModule.free_memory(path_ptr);
    asmModule.free_memory(params_ptr);

    return Boolean(res);
};

const init = module.exports.init = function() {

    asmModule = getModule();
    module.exports.asmModule = asmModule;
};

init();

module.exports.asmModule = asmModule;

module.exports.pre = function (path, params) {

    return rawPre(path, params);
};

