/**
 * Copyright (c) 2016 - 2018 Sqreen. All Rights Reserved.
 * Please refer to our terms for more information: https://www.sqreen.io/terms.html
 */
'use strict';
const Benchmark = require('benchmark');

const LFI = require('../lib/lfi');
const TsLFI = require('../build_ts/lfi.pure');

const run = function (name, path, params) {

    return new Promise((resolve) => {

        LFI.init();
        console.log(name);
        (new Benchmark.Suite(name))
            .add('LFI.wasm', () => {
                LFI.rawPre(path, params);
            })
            .add('LFI.ts', () => {
                TsLFI.pre(path, params);
            })
            .on('cycle', function(event) {
                console.log(String(event.target));
            })
            .on('complete', (x) => {
                console.log(`Fatest is ${x.currentTarget.filter('fastest').map('name')}`);
                resolve();
            })
            .run();
    });
};

const runWithCache = function (name, path, params) {

    return new Promise((resolve) => {

        const asmModule = LFI.asmModule;
        const path_ptr = asmModule.newString(path);
        const params_ptr = asmModule.newStringArray(params);

        LFI.init();
        console.log(name);
        (new Benchmark.Suite(name))
            .add('LFI.wasm', () => {
                asmModule.pre(path_ptr, params_ptr);
            })
            .add('LFI.ts', () => {
                TsLFI.pre(path, params);
            })
            .on('cycle', function(event) {
                console.log(String(event.target));
            })
            .on('complete', (x) => {
                console.log(`Fatest is ${x.currentTarget.filter('fastest').map('name')}`);
                resolve();
            })
            .run();
    });
};

const long = Array.apply(null, Array(50)).map(Number.prototype.valueOf,0).map((x, i) => 'nb_' + i);

const main = async function () {

    console.log();
    console.log('Without js -> wasm and wasm -> js');
    await runWithCache('no attack reuse pointers', '/var/www/imgs/me.jpg', ['me']);
    await runWithCache('no attack reuse pointers big params', '/var/www/imgs/me.jpg', long);

    console.log();
    console.log('With js -> wasm and wasm -> js');
    await run('no attack', '/var/www/imgs/me.jpg', ['me']);
    await run('no attack big params', '/var/www/imgs/me.jpg', long);
    await run('attack', 'documents/../../../../../../../../../etc/passwd', ['../../../../../../../../../etc/passwd']);


};

main();
