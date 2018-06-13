import "allocator/arena";
export { allocate_memory, free_memory }; // needed to manipulate strings and arrays from outside
import { preCB } from './lib/lfi';

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

export function pre(path: string, params: string): bool {

    return preCB(path, split(params, '|'));
}


export function run(): void {

    for (let i = 0; i < 10000; ++i) {
        preCB('documents/../../../../../../../../../etc/passwd', ["hello", "/etc/passwd" + <string> i]);
    }
}
