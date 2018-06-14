'use strict';
const Fs = require('fs');
const Path = require('path');

const Code = require('code');
const Lab = require('lab');
const lab = exports.lab = Lab.script();

const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;

const targets = Fs.readdirSync(Path.join(__dirname, '..', 'build'));

for (let target of targets) {

    const Mod = require(`../build/${target}/lib`);

    describe(target, () => {

        it('should detect inclusion', () => {

            expect(Mod.includes('hello world','world')).to.equal(true);
        });

        it('should not detect inclusion', () => {

            expect(Mod.includes('hello world','pony')).to.equal(false);
        });
    });
}


