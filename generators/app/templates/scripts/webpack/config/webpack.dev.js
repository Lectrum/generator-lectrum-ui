// Core
import merge from 'webpack-merge';
import { choosePort } from 'react-dev-utils/WebpackDevServerUtils';

// Config
import getCommonConfig from './webpack.common';

// Instruments
import { SOURCE, HOST, PORT } from '../constants';
import {
    loadDevCss,
    connectFriendlyErrors,
    connectHotModuleReplacement,
} from '../modules';

export default async () => {
    const suggestedPort = await choosePort(HOST, PORT);

    return merge(
        getCommonConfig(),
        {
            mode:    'development',
            devtool: 'cheap-module-eval-source-map',
            entry:   [
                SOURCE,
                'webpack-hot-middleware/client?reload=true&quiet=true',
            ],
            devServer: {
                host: HOST,
                port: suggestedPort,
            },
        },
        loadDevCss(),
        connectFriendlyErrors(),
        connectHotModuleReplacement(),
    );
};
