// The entry file of your WebAssembly module.
import "allocator/tlsf";
export { allocate_memory, free_memory }; // needed to manipulate strings and arrays from outside
import { normalizePath } from './lib/path';


const RELEVANT_INJECTED_SIZE = 5;

const report = function (found: string, what: string): string[] {

    return ['raise', found, what];
};

const equal = function (a: string, b: string): bool {

    return a.length === b.length && a.startsWith(b)
};

export function pre(filePath: string, params: string[]): string[] {

    let common: string[] = [];
    for (let i = 0; i < params.length; ++i) {
        if (params[i].length > RELEVANT_INJECTED_SIZE && filePath.includes(params[i])) {
            common.push(params[i]);
        }
    }

    if (common.length === 0) {
        return [];
    }

    for (let i = 0; i < common.length; ++i) {
        let part:string = common[i];
        if (part.startsWith('/') && filePath.startsWith('/') && equal(filePath, part)) {
            return report(filePath, part);
        }
        if (filePath.endsWith(part)) {
            let current = normalizePath(part);
            // TODO: write memory efficien split
            if (current.includes('../') || current.includes('../')) { // equivalent to splitted = current.split('/'); then (splitted.length > 1 && includes(splitted, '..')
                return report(filePath, part);
            }
        }
    }
    return [];
}
