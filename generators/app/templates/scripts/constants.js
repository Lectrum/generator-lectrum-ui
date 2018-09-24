// Core
import { path as PROJECT_ROOT } from 'app-root-path';
import { resolve } from 'path';

// Network
export const HOST = 'localhost';
export const PORT = 3000;
export const SYNC_BRANCH_NAME = 'dev';
export const MASTER_REMOTE_UPSTREAM_REFERENCE = 'refs/remotes/upstream/master';
export const SYNC_LOCAL_REFERENCE = `refs/heads/${SYNC_BRANCH_NAME}`;
export const SYNC_REMOTE_ORIGIN_REFERENCE = `refs/remotes/origin/${SYNC_BRANCH_NAME}`;
export const SYNC_REMOTE_UPSTREAM_REFERENCE = `refs/remotes/upstream/${SYNC_BRANCH_NAME}`;
export const BACKUP_BRANCH_NAME = 'checkpoint';

// Paths
export const SOURCE = resolve(PROJECT_ROOT, './source');
export const BUILD = resolve(PROJECT_ROOT, './build');
export const STATICS = resolve(PROJECT_ROOT, './static');
export const GIT_ROOT = resolve(PROJECT_ROOT, './.git');
