// Core
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

// PostCSS
import imports from 'postcss-import';
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
    const plugins = [
        imports({
            getPath:        SOURCE,
            skipDuplicates: true,
        }),
        fontMagician({
            protocol: 'https:',
        }),
    ];

    if (minimize) {
        plugins.push(cssnano({ preset: [ 'default', { normalizeUrl: false }] }));
    }

    return {
        loader:  'postcss-loader',
        options: {
            ident:   'postcss',
            plugins: (loader) => {
                return [
                    ...plugins,
                    modules({
                        mode: loader.resourcePath.includes('.m.css')
                            ? 'local'
                            : 'global',
                    }),
                    env({
                        stage: 0,
                    }),
                    gradients(),
                    fontSmoothing(),
                    reporter(),
                ];
            },
            sourceMap,
        },
    };
};

export const loadDevCss = () => ({
    module: {
        rules: [
            {
                test:    /\.css$/,
                include: [ SOURCE, /node_modules/ ],
                use:     [
                    'cache-loader',
                    'style-loader',
                    {
                        loader:  'css-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
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
                    'css-loader',
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
