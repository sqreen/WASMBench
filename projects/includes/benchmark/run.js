'use strict';
const Fs = require('fs');
const Path = require('path');

const targets = Fs.readdirSync(Path.join(__dirname, '..', 'build'));

const run = function (mod) {

    const t0 = process.hrtime();
    mod.run();
    const tfinal = process.hrtime(t0);

    return tfinal[0] + tfinal[1] / 1e6;
};

for (let item of targets) {

    let mod;
    if (item === 'rust') {
        mod = require(`../build/${item}/lib_bg.js`);
    }
    else {
        mod = require(`../build/${item}/lib.js`);
    }

    const res = run(mod);
    console.log(`${res} ms\t${item}`);
}

