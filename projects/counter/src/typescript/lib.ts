export function count(max: number): void {

    let res = 0;
    for (let i = 0; i < max; ++i) {
        res++;
    }
}


export function run(): void {

    for (let i = 0; i < 1000; ++i) {
        count(i);
    }
}
