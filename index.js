/**
 * Copyright (c) 2016 - 2018 Sqreen. All Rights Reserved.
 * Please refer to our terms for more information: https://www.sqreen.io/terms.html
 */
'use strict';
const LFI = require('./lib/lfi');

console.log(LFI.pre('documents/../../../../../../../../../etc/passwd', ['../../../../../../../../../etc/passwd']));




