export function includes(a: string, b: string): boolean {

    return a.includes(b);
}

export function run() {

    for (let i = 0; i < 10000; ++i) {
        includes('hello', 'llo')
    }
}
