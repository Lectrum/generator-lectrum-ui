// Core
import { DefinePlugin, ContextReplacementPlugin } from 'webpack';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

// Constants
import { BUILD } from '../../constants';

export const initializeEnvVariables = (variables) => ({
    plugins: [ new DefinePlugin(variables) ],
});

export const setupContextReplacement = () => ({
    plugins: [ new ContextReplacementPlugin(/moment\/locale$/, /ru/) ],
});

export const setupBuildAnalysis = () => ({
    plugins: [
        new BundleAnalyzerPlugin({
            analyzerMode:      'disabled',
            generateStatsFile: true,
            statsFilename:     'build-stats.json',
            openAnalyzer:      false,
        }),
    ],
});

export const cleanBuildDirectory = () => ({
    plugins: [
        new CleanWebpackPlugin(BUILD, {
            allowExternal: true,
        }),
    ],
});
