// Core
import merge from 'webpack-merge';

// Config
import getCommonConfig from './webpack.common';

// Instruments
import { SOURCE, RECORDS } from '../constants';
import {
    loadProdCss,
    connectBuildAnalysis,
    cleanBuildDirectory,
    optimizeImages,
} from '../modules';

export default () => {
    const { ANALYZE } = process.env;

    return merge(
        getCommonConfig(),
        {
            mode:        'production',
            entry:       SOURCE,
            devtool:     false,
            performance: false,
            recordsPath: RECORDS,
        },
        cleanBuildDirectory(),
        loadProdCss(),
        optimizeImages(),
        ANALYZE && connectBuildAnalysis(),
    );
};
