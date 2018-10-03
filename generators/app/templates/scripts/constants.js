// Core
import { path as PROJECT_ROOT } from 'app-root-path';
import { resolve } from 'path';

// Assets
import PACKAGE_JSON from '../package.json';

// Network
export const HOST = 'localhost';
export const PORT = 3000;
export const LEAD_BRANCH_NAME = 'lectrum-dev';
export const MASTER_REMOTE_UPSTREAM_REFERENCE = 'refs/remotes/upstream/master';
export const LEAD_LOCAL_REFERENCE = `refs/heads/${LEAD_BRANCH_NAME}`;
export const LEAD_REMOTE_ORIGIN_REFERENCE = `refs/remotes/origin/${LEAD_BRANCH_NAME}`;
export const LEAD_REMOTE_UPSTREAM_REFERENCE = `refs/remotes/upstream/${LEAD_BRANCH_NAME}`;
export const BACKUP_BRANCH_NAME = 'my-backup';
export const GIT_HTTPS_URL = `https://github.com/Lectrum/${
    PACKAGE_JSON.name
}.git`;
export const GIT_SSH_URL = `git@github.com:Lectrum/${PACKAGE_JSON.name}.git`;
export const COMMIT_PHRASE_START = '→ Checkpoint at';

// Paths
export const SOURCE = resolve(PROJECT_ROOT, './source');
export const BUILD = resolve(PROJECT_ROOT, './build');
export const STATICS = resolve(PROJECT_ROOT, './static');
export const GIT_ROOT = resolve(PROJECT_ROOT, './.git');
export const HTML_TEMPLATE = resolve(PROJECT_ROOT, './static/template.html');

// Assets
export { PACKAGE_JSON };
