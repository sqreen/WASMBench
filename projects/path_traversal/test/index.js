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

        it('should detect injections', () => {

            expect(Mod.hasInjectedPaths('documents/../../../../../../../../../etc/passwd', ['../../../../../../../../../etc/passwd'].join('|'))).to.equal(true);
        });

        it('should detect injections imgs/../secret.yml', () => {

            expect(Mod.hasInjectedPaths('imgs/../secret.yml', ['../secret.yml'].join('|'))).to.equal(true);
        });

        it('should detect full injections /etc/password', () => {

            expect(Mod.hasInjectedPaths('/etc/password', ['/etc/password'].join('|'))).to.equal(true);
        });

        it('should not detect any injections', () => {

            expect(Mod.hasInjectedPaths('a/etc/password', ['a/etc/password'].join('|'))).to.equal(false);
            expect(Mod.hasInjectedPaths('documents/pony.txt', ['my/documents/pony.txt'].join('|'))).to.equal(false);
            expect(Mod.hasInjectedPaths('XXX/YYY/documents/pony.txt', ['documents/pony.txt'].join('|'))).to.equal(false);
            expect(Mod.hasInjectedPaths('documents/unicorn', ['pony.txt'].join('|'))).to.equal(false);
            expect(Mod.hasInjectedPaths('documents/unicorn.jp', ['pony.jp'].join('|'))).to.equal(false);
        });
    });
}


