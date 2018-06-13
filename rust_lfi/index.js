'use strict';
const Mode = require('./target/nodejs/rust_lfi');

module.exports.pre = function (path, params) {

    return Mode.pre(path, params.join('|'));
};
