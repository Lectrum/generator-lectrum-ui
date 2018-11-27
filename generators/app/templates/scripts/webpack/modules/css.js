// Core
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

// PostCSS
import fontMagician from 'postcss-font-magician';
import modules from 'postcss-icss-selectors';
import env from 'postcss-preset-env';
import gradients from 'postcss-easing-gradients';
import fontSmoothing from 'postcss-font-smoothing';
import reporter from 'postcss-reporter';
import cssnano from 'cssnano';

// Instruments
import { SOURCE, CHUNK_NAME_CSS } from '../constants';

const loadPostCss = (
    { sourceMap, minimize } = { sourceMap: false, minimize: false },
) => {
    const getPlugins = (loader) => {
        const plugins = [
            fontMagician({
                protocol: 'https:',
            }),
            modules({
                mode: loader.resourcePath.includes('.m.css')
                    ? 'local'
                    : 'global',
            }),
            env({
                stage:    0,
                features: {
                    'custom-media-queries': {
                        importFrom: [
                            {
                                customMedia: {
                                    '--phonePortrait':  '(width <= 414px)',
                                    '--phoneLandscape':
                                        '(width >= 415px) and (width <= 667px)',
                                    '--tabletPortrait':
                                        '(width >= 668px) and (width <= 768px)',
                                    '--tabletLandscape':
                                        '(width >= 769px) and (width <= 1024px)',
                                    '--desktopS':
                                        '(width >= 1025px) and (width <= 1366px)',
                                    '--desktopM':
                                        '(width >= 1367px) and (width <= 1680px)',
                                    '--desktopL':
                                        '(width >= 1681px) and (width <= 1920px)',
                                    '--desktopXL': '(width >= 1921px)',
                                },
                            },
                        ],
                    },
                },
            }),
            gradients(),
            fontSmoothing(),
            reporter(),
        ];

        if (minimize) {
            plugins.push(
                cssnano({ preset: [ 'default', { normalizeUrl: false }] }),
            );
        }

        return plugins;
    };

    return {
        loader:  'postcss-loader',
        options: {
            ident:   'postcss',
            plugins: (loader) => {
                return [ ...getPlugins(loader) ];
            },
            sourceMap,
        },
    };
};

const loadCss = ({ sourceMap = false } = { sourceMap: false }) => ({
    loader:  'css-loader',
    options: {
        sourceMap,
        importLoaders: 1,
    },
});

export const loadDevCss = () => ({
    module: {
        rules: [
            {
                test:    /\.css$/,
                include: [ SOURCE, /node_modules/ ],
                use:     [
                    'style-loader',
                    loadCss({ sourceMap: true }),
                    loadPostCss({ sourceMap: true, minimize: false }),
                ],
            },
        ],
    },
});

export const loadProdCss = () => ({
    module: {
        rules: [
            {
                test:    /\.css$/,
                include: [ SOURCE, /node_modules/ ],
                use:     [
                    MiniCssExtractPlugin.loader,
                    loadCss({ sourceMap: false }),
                    loadPostCss({ sourceMap: false, minimize: true }),
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename:      `css/${CHUNK_NAME_CSS}`,
            chunkFilename: `css/${CHUNK_NAME_CSS}`,
        }),
    ],
});
