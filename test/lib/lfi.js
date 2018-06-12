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


const LFI = require('../../lib/lfi');

describe('LFI', () => {

    it('should detect LFIs', () => {

        expect(LFI.pre('documents/../../../../../../../../../etc/passwd', ['../../../../../../../../../etc/passwd'])).to.equal({
            status: 'raise',
            record: {
                found: 'documents/../../../../../../../../../etc/passwd',
                what: '../../../../../../../../../etc/passwd'
            }
        });
        expect(LFI.pre('/home/my/documents/pony.txt', ['/home/my/documents/'])).to.equal(null);
    });

    it('should detect LFIs imgs/../secret.yml', () => {

        expect(LFI.pre('imgs/../secret.yml', ['../secret.yml'])).to.equal({
            status: 'raise',
            record: {
                found: 'imgs/../secret.yml',
                what: '../secret.yml'
            }
        });
    });

    it('should detect full LFIs /etc/password', () => {

        expect(LFI.pre('/etc/password', ['/etc/password'])).to.equal({
            status: 'raise',
            record: {
                found: '/etc/password',
                what: '/etc/password'
            }
        });
    });

    it('should not detect LFIs', () => {

        expect(LFI.pre('/home/my/documents/pony.txt', ['/home/my/documents/'])).to.equal(null);
        expect(LFI.pre('a/etc/password', ['a/etc/password'])).to.equal(null);
        expect(LFI.pre('documents/pony.txt', ['my/documents/pony.txt'])).to.equal(null);
        expect(LFI.pre('XXX/YYY/documents/pony.txt', ['documents/pony.txt'])).to.equal(null);
        expect(LFI.pre('documents/unicorn', ['pony.txt'])).to.equal(null);
        expect(LFI.pre('documents/unicorn.jp', ['pony.jp'])).to.equal(null);
    });
});
