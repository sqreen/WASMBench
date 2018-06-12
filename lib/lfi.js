/**
 * Copyright (c) 2016 - 2018 Sqreen. All Rights Reserved.
 * Please refer to our terms for more information: https://www.sqreen.io/terms.html
 */
'use strict';
const Fs = require('fs');
const Path = require('path');

const Loader = require('@assemblyscript/loader');

const Lib = require('./index');

const Bin = Fs.readFileSync(Path.join(__dirname, '..', 'build', 'lfi.optimized.wasm'));
const imports = {};
const asmModule = Loader.instantiateBuffer(Bin, imports);

asmModule.getStringArray = Lib.getStringArray;

asmModule.newStringArray = Lib.newStringArray;


module.exports.pre = function (path, params) {
    const path_ptr = asmModule.newString(path);
    const params_ptr = asmModule.newStringArray(params);
    const result_ptr = asmModule.pre(path_ptr, params_ptr);

    const res = asmModule.getStringArray(result_ptr);
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

