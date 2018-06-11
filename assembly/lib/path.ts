// stolen from https://github.com/nodejs/node/blob/master/lib/path.js
// This only works for UNIX, we'll have WIN later
'use strict';
// FIXME: I remove continues from this.. this is to be tested!
function normalizeStringPosix(path: string, allowAboveRoot: boolean): string {
    let res = '';
    let lastSlash = -1;
    let dots = 0;
    let code: i32;
    for (let i = 0; i <= path.length; ++i) {
        let cont = false;
        if (i < path.length)
            code = path.charCodeAt(i);
        else if (code === 47/*/*/)
            break;
        else
            code = 47/*/*/;
        if (code === 47/*/*/) {
            if (lastSlash === i - 1 || dots === 1) {
                // NOOP
            } else if (lastSlash !== i - 1 && dots === 2) {
                if (res.length < 2 ||
                    res.charCodeAt(res.length - 1) !== 46/*.*/ ||
                    res.charCodeAt(res.length - 2) !== 46/*.*/) {
                    if (res.length > 2) {
                        const start = res.length - 1;
                        let j = start;
                        for (; j >= 0; --j) {
                            if (res.charCodeAt(j) === 47/*/*/)
                                return res;
                        }
                        if (j !== start) {
                            if (j === -1)
                                res = '';
                            else
                                res = res.substring(0, j);
                            lastSlash = i;
                            dots = 0;
                            cont = true; // continue
                        }
                    } else if (res.length === 2 || res.length === 1) {
                        res = '';
                        lastSlash = i;
                        dots = 0;
                        cont = true; // continue
                    }
                }
                if (!cont && allowAboveRoot) {
                    if (res.length > 0)
                        res += '/..';
                    else
                        res = '..';
                }
            } else if (!cont){
                if (res.length > 0)
                    res += '/' + path.substring(lastSlash + 1, i);
                else
                    res = path.substring(lastSlash + 1, i);
            }
            lastSlash = i;
            dots = 0;
        } else if (!cont && code === 46/*.*/ && dots !== -1) {
            ++dots;
        } else if (!cont){
            dots = -1;
        }
    }
    return res;
}

function normalize(path: string): string {

    if (path.length === 0)
        return '.';

    const isAbsolute = path.charCodeAt(0) === 47/*/*/;
    const trailingSeparator = path.charCodeAt(path.length - 1) === 47/*/*/;

    // Normalize the path
    path = normalizeStringPosix(path, !isAbsolute);

    if (path.length === 0 && !isAbsolute)
        path = '.';
    if (path.length > 0 && trailingSeparator)
        path += '/';

    if (isAbsolute)
        return '/' + path;
    return path;
}

// TS wrapper
export function isAbsolute(path: string): boolean {

    return path.charCodeAt(0) === 47/*/*/ || path.charCodeAt(0) === 126 /*~*/;
}

export function normalizePath(path: string): string {

    return normalize(path);
}
