// The entry file of your WebAssembly module.
import "allocator/tlsf";
import { normalizePath } from './lib/path';

declare function log(str: string, val: string): void;

export { allocate_memory, free_memory }; // needed to manipulate strings and arrays from outside

const RELEVANT_INJECTED_SIZE = 5;

const report = function (found: string, what: string): string[] {

    return ['raise', found, what];
};

export function pre(filePath: string, params: string[]): string[] {

    log('buff', params.buffer);

    let common: string[] = [];
    for (let i = 0; i < params.length; ++i) {
        if (params[i].length > RELEVANT_INJECTED_SIZE && filePath.includes(params[i])) {
            common.push(params[i]);
        }
    }

    log('common length', <string> common.length);
    log('common[0]', common[1]);
    if (common.length === 0) {
        log('log', 'nothing in common');
        return [];
    }

    for (let i = 0; i < common.length; ++i) {
        const part:string = common[i];
        if (part.startsWith('/') && filePath.startsWith('/') && part === filePath) {
            return report(filePath, part);
        }
        if (filePath.endsWith(part)) {
            const current = normalizePath(part);
            if (current.includes('/../')) { // equivalent to splitted = current.split('/'); then (splitted.length > 1 && includes(splitted, '..')
                return report(filePath, part);
            }
        }
    }
    log('log','final');
    return [];
}
