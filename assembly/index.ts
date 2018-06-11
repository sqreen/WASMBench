import "allocator/buddy";

declare function log(str: string, val: string): void;

export { allocate_memory, free_memory }; // needed to manipulate strings and arrays from outside

export function pre(path: string, arr: string[]): string[] {

    let result: string[] = new Array<string>(arr.length);
    for (let i = 0; i < arr.length; ++i) {
        result[i] = arr[i];
    }
    return result;
}

