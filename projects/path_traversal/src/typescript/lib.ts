import { hasInjectedPathsLIB } from './shared'

export function hasInjectedPaths(path: string, params: string): boolean {

    return hasInjectedPathsLIB(params, params.split('|'));
}

