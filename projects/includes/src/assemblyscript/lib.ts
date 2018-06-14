import "allocator/buddy";
export { allocate_memory, free_memory }; // needed to manipulate strings and arrays from outside

export function _includes(a: string, b: string): bool {

    return a.includes(b);
}

export function run(): void {

    for (let i = 0; i < 10000; ++i) {
        _includes('hello', 'llo')
    }
}
