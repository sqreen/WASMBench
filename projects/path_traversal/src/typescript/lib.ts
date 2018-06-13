import { hasInjectedPathsLIB } from './shared'

export function hasInjectedPaths(path: string, params: string): boolean {

    return hasInjectedPathsLIB(params, params.split('|'));
}

export function run() {

    for (let i = 0; i < 1000; ++i) {
        hasInjectedPathsLIB('documents/../../../../../../../../../etc/passwd', ['../../../../../../../../../etc/passwd']);
    }
}
