import { findInjectedPathsLIB } from './shared'

export function findInjectedPaths(path: string, params: string): boolean {

    return findInjectedPathsLIB(params, params.split('|'));
}

