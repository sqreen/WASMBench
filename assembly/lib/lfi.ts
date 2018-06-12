// The entry file of your WebAssembly module.
import { normalizePath } from './path';

const RELEVANT_INJECTED_SIZE = 5;

const report = function (found: string, what: string): string[] {

    return ['raise', found, what];
};

export function pre(filePath: string, params: string[]): string[] {

    for (let i = 0; i < params.length; ++i) {
        const part = params[i];
        if (part.length > RELEVANT_INJECTED_SIZE && filePath.includes(part)) {
            if (part.startsWith('/') && filePath.startsWith('/') && filePath == part) {
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
    }

    return [];
}
