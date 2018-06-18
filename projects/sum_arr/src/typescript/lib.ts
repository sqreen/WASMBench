export function sum(a: number[]): number {

    return a.reduce((x, y) => x + y, 0);
}

export function run() {

    for (let i = 0; i < 10000; ++i) {
        sum([1, 2, 3, 4, 5, 6, 7, 8, 9])
    }
}
