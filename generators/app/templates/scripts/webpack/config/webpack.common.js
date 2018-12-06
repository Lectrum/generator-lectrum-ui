// Core
import merge from 'webpack-merge';

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
    const { NODE_ENV } = process.env;
    const IS_DEVELOPMENT = NODE_ENV === 'development';

    return merge(
        {
            output: {
                path:          BUILD,
                filename:      IS_DEVELOPMENT ? '[name].js' : `js/${CHUNK_NAME_JS}`,
                chunkFilename: IS_DEVELOPMENT
                    ? '[name].js'
                    : `js/${CHUNK_NAME_JS}`,
                hashDigestLength: 5,
                publicPath:       '/',
            },
            optimization: {
                nodeEnv: NODE_ENV,
            },
            resolve: {
                extensions: [ '.js', '.json', '.css', '.jpg', '.png' ],
                modules:    [ SOURCE, 'node_modules' ],
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
