import "allocator/buddy";

declare function log(str: string, val: string): void;

export { allocate_memory, free_memory }; // needed to manipulate strings and arrays from outside

function getParams (str: string): string[] {

    const result: string[] = [];
    let current = '';
    for (let i = 0; i < str.length; ++i) {
        if (str[i].charCodeAt(0) === 124) {
            result.push(current);
            current = '';
        }
        else {
            current += str[i];
        }
    }
    result.push(current);
    return result;
}

export function pre(path: string, rawParams: string): string[] {

/*    const result: string[] = [];
    for (let i = 0; i < rawParams.length; ++i) {
        log(<string> i, rawParams[i])
        // result.push(rawParams[i]);
    }*/

    return getParams(rawParams);
}

