import "allocator/arena";
export { allocate_memory, free_memory }; // needed to manipulate strings and arrays from outside

import { findInjectedPathsLIB } from '../shared/shared'

function split(str: string, sep: string): string[] {

    let res: string[] = [];
    let current = '';
    for (let i = 0; i < str.length; ++i) {
        if (str[i] === sep) {
            res.push(current);
            current = '';
        }
        else {
            current += str[i];
        }
    }
    res.push(current);
    return res;
}

export function _findInjectedPaths(path: string, params: string): bool {

    return findInjectedPathsLIB(params, split(params, '|'));
}
