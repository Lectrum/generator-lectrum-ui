// Core
import merge from 'webpack-merge';
import getRepositoryName from 'git-repo-name';
import chalk from 'chalk';

// Instruments
import { BUILD, CHUNK_NAME_JS, SOURCE } from '../constants';
import {
    loadJavaScript,
    loadFonts,
    loadImages,
    loadSvg,
    defineEnvVariables,
    connectHtml,
    connectContextReplacement,
} from '../modules';

export default () => {
    const { NODE_ENV, DEPLOY_TARGET } = process.env;
    const IS_DEPLOYING_TO_GITHUB_PAGES = DEPLOY_TARGET === 'github-pages';
    const IS_DEVELOPMENT = NODE_ENV === 'development';

    let publicPath = '/';

    if (IS_DEPLOYING_TO_GITHUB_PAGES) {
        try {
            const repositoryName = getRepositoryName.sync();

            publicPath = `/${repositoryName}/`;
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
    }

    return merge(
        {
            output: {
                path:          BUILD,
                filename:      IS_DEVELOPMENT ? '[name].js' : `js/${CHUNK_NAME_JS}`,
                chunkFilename: IS_DEVELOPMENT
                    ? '[name].js'
                    : `js/${CHUNK_NAME_JS}`,
                hashDigestLength: 5,
                publicPath,
            },
            optimization: {
                nodeEnv: NODE_ENV,
            },
            resolve: {
                extensions: [ '.js', '.json', '.css', '.jpg', '.png' ],
                modules:    [ 'node_modules', SOURCE ],
            },
        },
        defineEnvVariables({
            __ENV__:  JSON.stringify(NODE_ENV),
            __DEV__:  IS_DEVELOPMENT,
            __PROD__: !IS_DEVELOPMENT,
        }),
        connectHtml(),
        loadJavaScript(),
        loadFonts(),
        loadImages(),
        loadSvg(),
        connectContextReplacement(),
    );
};
