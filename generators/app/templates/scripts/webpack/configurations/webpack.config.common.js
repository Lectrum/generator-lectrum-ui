/* eslint-disable no-console */

// Core
import merge from 'webpack-merge';
import getRepositoryName from 'git-repo-name';
import chalk from 'chalk';

// Constants
import { SOURCE, BUILD } from '../../constants';

// Webpack modules
import {
    loadJavaScript,
    loadFonts,
    loadImages,
    setupHtml,
    setupContextReplacement,
    initializeEnvVariables,
} from '../modules';

export default () => {
    const { NODE_ENV, DEPLOY_TARGET } = process.env;
    const IS_DEPLOYING_TO_GITHUB_PAGES = DEPLOY_TARGET === 'github-pages';
    let REPOSITORY_NAME = '';

    try {
        REPOSITORY_NAME = getRepositoryName.sync();
    } catch (error) {
        console.log(
            chalk.whiteBright.bgRed.bold(`
Твой локальный репозиторий не привязан к удалённому репозиторию, или локальный репозиторий отсутствует.
Для успешного деплоя на Github Pages:
    1. Если локального репозитория для этого проект нет — создай его;
    2. Создай удалённый репозиторий на Github;
    3. Привяжи локальный репозиторий этого проекта к удалённому репозиторию на Github.
`),
        );
    }

    return merge(
        // Loaders
        loadJavaScript(),
        loadFonts(),
        loadImages(),

        // Plugins
        setupHtml(),
        setupContextReplacement(),
        initializeEnvVariables({
            __ENV__:  JSON.stringify(NODE_ENV),
            __DEV__:  NODE_ENV === 'development',
            __PROD__: NODE_ENV === 'production',
        }),
        {
            entry: {
                SOURCE,
            },
            output: {
                path:       BUILD,
                publicPath: IS_DEPLOYING_TO_GITHUB_PAGES
                    ? `/${REPOSITORY_NAME}/`
                    : '/',
            },
            resolve: {
                extensions: [
                    '.mjs',
                    '.js',
                    '.json',
                    '.css',
                    '.m.css',
                    '.png',
                    '.jpg',
                ],
                modules: [ SOURCE, 'node_modules' ],
            },
            optimization: {
                nodeEnv: NODE_ENV,
            },
            stats: false,
        },
    );
};
