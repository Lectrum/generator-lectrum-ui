// Core
import { DefinePlugin, HotModuleReplacementPlugin } from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';

// Instruments
import { PROJECT_ROOT } from '../constants';

export const defineEnvVariables = (variables) => ({
    plugins: [ new DefinePlugin(variables) ],
});

export const connectBuildAnalysis = () => ({
    plugins: [
        new BundleAnalyzerPlugin({
            analyzerMode:      'disabled',
            openAnalyzer:      false,
            generateStatsFile: true,
        }),
    ],
});

export const cleanBuildDirectory = () => ({
    plugins: [
        new CleanWebpackPlugin([ 'build' ], {
            root: PROJECT_ROOT,
        }),
    ],
});

export const connectFriendlyErrors = () => ({
    plugins: [ new FriendlyErrorsWebpackPlugin() ],
});

export const connectHotModuleReplacement = () => ({
    plugins: [ new HotModuleReplacementPlugin() ],
});
