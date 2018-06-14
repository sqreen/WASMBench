'use strict';
const Fs = require('fs');
const Path = require('path');

const Benchmark = require('benchmark');

const targets = Fs.readdirSync(Path.join(__dirname, '..', 'build'));

const runBench = function (name, method, ...args) {

    console.log(`\nRunning ${name} - ${targets.join(', ')}`);

    const modules = {};
    for (let item of targets) {
        modules[item] = require(`../build/${item}/lib.js`);
    }

    return new Promise((resolve) => {

        const suite = new Benchmark.Suite(name);

        for (let item of targets) {
            suite.add(item, () => {

                modules[item][method].apply(null, args);
            });
        }

        suite.on('error', (err) => {
            console.log(err);
        });

        suite.on('cycle', function(event) {
            console.log(String(event.target));
        });

        suite.on('complete', (bench) => {

            return resolve(bench);
        });

        suite.run();
    });
};

const main = async function () {

    await runBench('simple count', 'count', [1000])
        .then((bench) => {
            console.log('=> Fastest is ' + bench.currentTarget.filter('fastest').map('name'));
        });
};

main();
