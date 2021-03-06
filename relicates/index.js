/**
 * Copyright (c) 2016 - 2018 Sqreen. All Rights Reserved.
 * Please refer to our terms for more information: https://www.sqreen.io/terms.html
 */
'use strict';
const Assert = require('assert');

/*
╒═══ Array<T> ══╕
0     1    2    3
├─┴─┴─┴─┴─┴─┴─┴─┤
│    .buffer    │ points at the backing ArrayBuffer (private)
├───────────────┤
│    .length    │ number of array elements of size sizeof<T>()
└───────────────┘

╒═ ArrayBuffer ═╕
0     1    2    3
├─┴─┴─┴─┴─┴─┴─┴─┤
│  .byteLength  │ number of bytes
├───────────────┤
│       0       │ free space due to alignment
├───────────────┤
│      ...      │ N=byteLength bytes of data
└───────────────┘
 */

const toUint8Array = function (num) {
    const res = (new Uint8Array([
        (num & 0xff000000) >> 24,
        (num & 0x00ff0000) >> 16,
        (num & 0x0000ff00) >> 8,
        (num & 0x000000ff)
    ])).reverse();

    // Assert.equal(toNumber(res), num);
    return res;
};

const writeString = module.exports.writeString = function (str) {

    const ptr_0 = this.STRINGS.get(str);

    if (ptr_0 === undefined) {
        const ptr = this.newString(str);
        this.STRINGS.set(str, ptr);
        return ptr;
    }
    return ptr_0;
};

module.exports.newStringArray = function (arr) {

    if (this.STRINGS === undefined) {
        this.STRINGS = new Map();
        this.writeString = writeString;
    }

    const len = arr.length;
    const string_ptr_list = arr.map((x) => this.writeString(x));

/*    for (let i = 0; i < len; ++i) {
        Assert.equal(arr[i], this.getString(string_ptr_list[i]));
    }*/

    const byteLength = 4 * len;

    const ptr = this.allocate_memory(8 + 8 + byteLength);

    const U8 = this.U8;
    for (let i = ptr; i < ptr + 16 + byteLength; ++i) {
        U8[i] = 0;
    }

    const buffer_ptr = ptr + 8; // array buffer

    const buffer_ptr_Uint8Array = toUint8Array(buffer_ptr);

    for (let i = 0; i < 4; ++i) {
        U8[ptr + i] = buffer_ptr_Uint8Array[i];
    }
    const len_Uint8Array = toUint8Array(len);
    for (let i = 0; i < 4; ++i) {
        U8[ptr + 4 + i] = len_Uint8Array[i];
    }

    U8[buffer_ptr] = byteLength;
    for (let i = 0; i < len; ++i) {
        const str_ptr_Uint8Array = toUint8Array(string_ptr_list[i]);
        for (let j = 0; j < 4; ++j) {
            U8[buffer_ptr + 8 + 4 * i + j] = str_ptr_Uint8Array[j];
        }
    }

    return ptr;
};

const Pow = Array.apply(null, Array(32)).map(Number.prototype.valueOf,0).map((x, i) => Math.pow(2, i));

const toNumber = function (items) {

    let res = 0;
    for (let i = 0; i < 4; ++i) {
        res += items[i] * Pow[i * 8];
    }
    return res;
};

Uint8Array.prototype.uint32At = function (ptr, offset = 0) {
    return toNumber(this.subarray(ptr + offset * 4, ptr + offset * 4 + 4));
};

module.exports.getStringArray = function (ptr) {

    const buffer_ptr = this.U8.uint32At(ptr);
    const len = this.U8.uint32At(ptr, 1);
    const byteLength = this.U8.uint32At(buffer_ptr);

    // Assert.equal(byteLength, len * 4);
    // Assert.equal(this.U8.uint32At(buffer_ptr, 1), 0);

    const dataStart = buffer_ptr + 4 + 4;

    const data = this.U8.subarray(dataStart, dataStart + byteLength);

    const res = [];
    for (let i = 0; i < len; ++i) {
        const item = data.subarray(i * 4,  (i + 1) * 4);
        const string_ptr = toNumber(item);
        res.push(this.getString(string_ptr))
    }
    return res;
};
