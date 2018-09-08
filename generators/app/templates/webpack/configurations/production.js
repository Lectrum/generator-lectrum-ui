// Core
import merge from 'webpack-merge';
import SimpleProgressWebpackPlugin from 'simple-progress-webpack-plugin';

// Configurations
import { generateCommonConfiguration } from './common';

// Webpack modules
import {
    loadProductionCss,
    setupBuildAnalysis,
    setupFavicon,
    cleanBuildDirectory,
} from '../modules';

export const generateProductionConfiguration = () => merge(
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
        plugins: [
            new SimpleProgressWebpackPlugin({
                format: 'compact',
            }),
        ],
    },
);
