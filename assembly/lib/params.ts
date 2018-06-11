export function matchingParams(str: string, params: string[], minLength: i32): string[] {

    const res: string[] = [];
    for (let i = 0; i < params.length; ++i) {
        if (str.indexOf(params[i]) > -1) {
            res.push(params[i]);
        }
    }
    return res;
}