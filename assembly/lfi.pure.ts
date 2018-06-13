import { preCB } from './lib/lfi';

export function pre (path: string, params: string): boolean {

    return Boolean(preCB(path, params.split('|')));
}