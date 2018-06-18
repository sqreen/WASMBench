// The entry file of your WebAssembly module.
const RELEVANT_INJECTED_SIZE = 5;

export function hasInjectedPathsLIB(filePath: string, params: string[]): boolean {
    for (let i = 0; i < params.length; ++i) {
        var part = params[i];
        if (part.length > RELEVANT_INJECTED_SIZE && filePath.includes(part)) {
            if (part.startsWith('/') && filePath.startsWith('/') && filePath == part) {
                return true;
            }
            if (filePath.endsWith(part)) {
                var current = part;
                if (current.includes('/..') || current.includes('../')) {
                    return true;
                }
            }
        }
    }
    return false;
}
