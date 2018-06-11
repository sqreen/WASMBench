/**
 * Copyright (c) 2016 - 2018 Sqreen. All Rights Reserved.
 * Please refer to our terms for more information: https://www.sqreen.io/terms.html
 */
'use strict';
const Code = require('code');
const Lab = require('lab');
const lab = exports.lab = Lab.script();

const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;

const Fs = require('fs');
const Path = require('path');

const Loader = require('@assemblyscript/loader');

const Bin = Fs.readFileSync(Path.join(__dirname, 'build', 'optimized.wasm'));

const Lib = require('../lib');


const env = { validateArrayItem() {} };
describe('lib', () => {

    describe('newStringArray', () => {

        it('should properly write an array', { plan: 2 }, () => {

            const baseline = ['foo', 'bar'];
            const asm = Loader.instantiateBuffer(Bin, {
                env: {
                    validateArrayItem: function (i, str_ptr) {

                        expect(asm.getString(str_ptr)).to.equal(baseline[i]);
                    }
                }
            });
            asm.newStringArray = Lib.newStringArray;

            const ptr = asm.newStringArray(baseline);

            asm.validateArray(ptr);
        });
    });
    
    describe('getStringArray', () => {

        it('should read a static array properly', { plan: 1 }, () => {

            const asm = Loader.instantiateBuffer(Bin, { env });
            asm.getStringArray = Lib.getStringArray;
            expect(asm.getStringArray(asm.arr)).to.equal(['hello', 'world']);
        });

        it('should read a dynamic array properly', { plan: 1 }, () => {

            const asm = Loader.instantiateBuffer(Bin, { env });
            asm.getStringArray = Lib.getStringArray;
            const a = asm.newString('world');
            const b = asm.newString('holds');
            const resPtr = asm.toArray(a, b);
            expect(asm.getStringArray(resPtr)).to.equal(['world', 'holds']);
        });

        it('should read a dynamic array properly', { plan: 2 }, () => {

            const asm = Loader.instantiateBuffer(Bin, { env });

            asm.getStringArray = Lib.getStringArray;
            const pattern = asm.newString('foo');
            const target = [];
            for (let i = 0; i < 10; ++i) {
                target.push('foo');
            }
            const resPtr = asm.getBigArray(pattern, 10);
            const result = asm.getStringArray(resPtr);
            expect(result.length).to.equal(10);
            expect(result).to.equal(target);
        });

    });
});
