/**
 * Copyright (c) 2016 - 2018 Sqreen. All Rights Reserved.
 * Please refer to our terms for more information: https://www.sqreen.io/terms.html
 */
'use strict';
const Fs = require('fs');
const Path = require('path');

const Loader = require('@assemblyscript/loader');

const Lib = require('./index');
let asmModule;

const getModule = function () {
    const Bin = Fs.readFileSync(Path.join(__dirname, '..', 'build', 'lfi.optimized.wasm'));
    const imports = {};
    const asmModule = Loader.instantiateBuffer(Bin, imports);
    asmModule.getStringArray = Lib.getStringArray;
    asmModule.newStringArray = Lib.newStringArray;

    return asmModule;
};



const rawPre = module.exports.rawPre = function (path, params) {
    const path_ptr = asmModule.newString(path);
    const params_ptr = asmModule.newStringArray(params);
    const result_ptr = asmModule.pre(path_ptr, params_ptr);

    const res = asmModule.getStringArray(result_ptr);

    asmModule.free_memory(path_ptr);
    asmModule.free_memory(params_ptr);
    asmModule.free_memory(result_ptr);

    return res;
};

const init = module.exports.init = function() {

    asmModule = getModule();
};

init();

module.exports.pre = function (path, params) {

    const res = rawPre(path, params);
    if (res.length === 0) {
        return null;
    }

    return {
        status: res[0],
        record: {
            found: res[1],
            what: res[2]
        }
    };
};

