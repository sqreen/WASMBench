// The entry file of your WebAssembly module.
const RELEVANT_INJECTED_SIZE = 5;

export function findInjectedPathsLIB(filePath: string, params: string[]): boolean {

    for (let i = 0; i < params.length; ++i) {
        var part = params[i];
        if (part.length > RELEVANT_INJECTED_SIZE && filePath.includes(part)) {
            if (part.startsWith('/') && filePath.startsWith('/') && filePath == part) {
                return true;
            }
            if (filePath.endsWith(part)) {
                var current = part;
                // TODO: write memory efficien split
                if (current.includes('/..') || current.includes('../')) { // equivalent to splitted = current.split('/'); then (splitted.length > 1 && includes(splitted, '..')
                    return true;
                }
            }
        }
    }
    return false;
}
