// Core
import { path as PROJECT_ROOT } from 'app-root-path';
import { resolve } from 'path';

// Network
export const HOST = 'localhost';
export const PORT = 3000;

// Paths
export { PROJECT_ROOT };
export const SOURCE = resolve(PROJECT_ROOT, './source');
export const BUILD = resolve(PROJECT_ROOT, './build');
export const STATIC = resolve(PROJECT_ROOT, './static');
export const RECORDS = resolve(PROJECT_ROOT, './scripts/webpack/records.json');

// Formatting
export const CHUNK_NAME_JS = '[name].[chunkhash].[id].js';
export const CHUNK_NAME_CSS = '[name].[contenthash].[id].css';
export const CHUNK_NAME_ASSET = '[name].[hash:5].[ext]';
