// Core
import merge from 'webpack-merge';

// Configurations
import generateCommonConfiguration from './webpack.common';

// Webpack modules
import {
    loadProductionCss,
    setupBuildAnalysis,
    setupFavicon,
    cleanBuildDirectory,
} from '../modules';

export default () => {
    return merge(
        // Common configuration
        generateCommonConfiguration(),

        // Loaders
        loadProductionCss(),
        setupFavicon(),

        // Plugins
        cleanBuildDirectory(),
        setupBuildAnalysis(),
        {
            mode:   'production',
            output: {
                filename: 'js/[name].[chunkhash:5].js',
            },
        },
    );
};
