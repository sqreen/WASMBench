/**
 * Copyright (c) 2016 - 2018 Sqreen. All Rights Reserved.
 * Please refer to our terms for more information: https://www.sqreen.io/terms.html
 */
'use strict';
const Fs = require('fs');
const Util = require('util');
const Path = require('path');
const Asc = require('assemblyscript/cli/asc');
const MkdirP = require('mkdirp');

const src = Path.join(__dirname, 'assembly');
const target = Path.join(__dirname, 'build');

const compile = function (file, targetFile) {

    // -b build/optimized.wasm -t build/optimized.wat --sourceMap --validate --optimize --noDebug
    return new Promise((resolve, reject) => {

        Asc.main([
            file,
            '--binaryFile', targetFile,
            '-t', `${targetFile}.wat`,
            '--optimize',
            '--validate'
        ], {
            stdout: process.stdout,
            stderr: process.stderr
        }, (err) => {

            if (err) {
                return reject(err);
            }
            return resolve();
        });
    });
};

const readDir = Util.promisify(Fs.readdir);
const mkdirP = Util.promisify(MkdirP.mkdirP);

const build = async function (srcDir, targetDir) {

    await mkdirP(targetDir);
    const srcFiles = (await readDir(srcDir)).filter((x) => x.endsWith('.ts')).filter((x) => !x.endsWith('.pure.ts'));
    for (const file of srcFiles) {
        const fileName = (Path.parse(file)).name;
        const targetFile = Path.relative(__dirname, Path.join(targetDir, fileName + '.optimized.wasm'));
        await compile(Path.relative(__dirname, Path.join(srcDir, file)), targetFile);
    }
};

const buildAll = async function () {

    try {
        await build(Path.join(__dirname, 'assembly'), Path.join(__dirname, 'build'));
        await build(Path.join(__dirname, 'test', 'assembly'), Path.join(__dirname, 'test', 'build'));
    }
    catch (e) {
        console.error(e);
        process.exit(1);
    }
};

buildAll();
