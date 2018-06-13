'use strict';
const Path = require('path');
const Fs = require('fs');

const Loader = require('@assemblyscript/loader');

const Bin = Fs.readFileSync(Path.join(__dirname, 'lib.wasm'));
const imports = {};
const Module = Loader.instantiateBuffer(Bin, imports);

module.exports = Module;
