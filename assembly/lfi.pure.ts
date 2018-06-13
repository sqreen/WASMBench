import { preCB } from './lib/lfi';

export function pre (path: string, params: string): boolean {

    return !!(preCB(path, params.split('|')));
}

export function run(): void {

    for (let i = 0; i < 10000; ++i) {
        preCB('documents/../../../../../../../../../etc/passwd', ["hello", "/etc/passwd" + i]);
    }
}
