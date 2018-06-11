import "allocator/buddy";

export { allocate_memory, free_memory }; // needed to manipulate strings and arrays from outside

export const arr: string[] = ['hello', 'world'];

export function toArray(a: string, b: string): string[] {

    const results: string[] = [];
    results.push(a);
    results.push(b);
    return results;
}

export function getBigArray(pattern: string, nb: i32): string[] {

    const res: string[] = new Array<string>(nb);
    for (let i = 0; i < nb; ++i) {
        res[i] = pattern;
    }
    return res;
}
