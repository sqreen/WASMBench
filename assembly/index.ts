// The entry file of your WebAssembly module.
import "allocator/arena";
import { normalizePath } from './lib/path';
import {matchingParams} from "./lib/params";

export { allocate_memory, free_memory }; // needed to manipulate strings and arrays from outside

const RELEVANT_INJECTED_SIZE = 5;

const report = function (found: string, what: string): string[] {

    return ['raise', found, what];
};

export function pre(filePath: string, params: string[]): string[] {

    const common = matchingParams(filePath, params, RELEVANT_INJECTED_SIZE);

    if (common.length === 0) {
        return [];
    }

    for (let i = 0; i < common.length; ++i) {
        const part = common[i];
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
    return [];
}
