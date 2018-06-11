/**
 * Copyright (c) 2016 - 2018 Sqreen. All Rights Reserved.
 * Please refer to our terms for more information: https://www.sqreen.io/terms.html
 */
'use strict';
const Assert = require('assert');

module.exports.newStringArray = function (arr) {

    const dataLength = arr.length;
    const pointers = arr.map((x) => this.newString(x));
    const U32 = this.U32;

    const ptr = this.allocate_memory(arr.length + 4);
    const ptr0 = ptr >>> 2;

    U32[ptr0 + 1] = dataLength;
    const dataStart = ptr0 + 2;
    U32[ptr0] = dataStart << 2;
    U32[dataStart] = dataLength << 2;
    U32[dataStart + 1] = 0;

    for (let i = 0; i < dataStart; ++i) {
        U32[dataStart + 2 + i] = pointers[i];
    }
    return ptr;
};

const toNumber = function (items) {

    let res = 0;
    for (let i = 0; i < items.length; ++i) {
        res += items[i] * Math.pow(2, 8 * i);
    }
    return res;
};

Uint8Array.prototype.uint32At = function (ptr, offset = 0) {
    return toNumber(this.subarray(ptr + offset * 4, ptr + 4 + offset * 4));
};

module.exports.getStringArray = function (ptr) {

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
    const U8 = this.U8;

    const buffer_ptr = U8.uint32At(ptr);
    const len = U8.uint32At(ptr, 1);
    const byteLength = U8.uint32At(buffer_ptr);

    Assert(byteLength === len * 4);
    Assert(U8.uint32At(buffer_ptr, 1) === 0);

    const dataStart = buffer_ptr + 4 + 4;

    const data = U8.subarray(dataStart, dataStart + byteLength);

    const res = [];
    for (let i = 0; i < len; ++i) {
        const item = data.subarray(i * 4,  (i + 1) * 4);
        const string_ptr = toNumber(item);
        res.push(this.getString(string_ptr))
    }
    return res;
};
