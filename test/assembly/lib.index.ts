import "allocator/buddy";

export { allocate_memory, free_memory }; // needed to manipulate strings and arrays from outside

export const arr: string[] = ['hello', 'world'];

export function toArray(a: string, b: string): string[] {

    let results: string[] = [];
    results.push(a);
    results.push(b);
    return results;
}

export function getBigArray(pattern: string, nb: i32): string[] {

    let res: string[] = new Array<string>(nb);
    for (let i = 0; i < nb; ++i) {
        res[i] = pattern;
    }
    return res;
}

declare function validateArrayItem(i: i32, val: string): void;
export function validateArray(arr: string[]): void {

    for (let i = 0; i < arr.length; ++i) {
        validateArrayItem(i, arr[i]);
    }
}

export function cloneArray(arr: string[]): string[] {

    let result: string[] = new Array<string>(arr.length);
    for (let i = 0; i < arr.length; ++i) {
        result[i] = arr[i];
    }
    return result;
}

export function equals(a: string, b: string): bool {

    return a.startsWith(b) && a.length === b.length;
}
