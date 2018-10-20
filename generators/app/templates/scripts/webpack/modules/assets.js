// Core
import HtmlWebpackPlugin from 'html-webpack-plugin';

// Instruments
import { STATIC, SOURCE, CHUNK_NAME_ASSET } from '../constants';

export const loadImages = () => ({
    module: {
        rules: [
            {
                test:    /\.(png|jpg|jpeg)$/,
                include: SOURCE,
                use:     [
                    {
                        loader:  'file-loader',
                        options: {
                            name: `images/${CHUNK_NAME_ASSET}`,
                        },
                    },
                ],
            },
        ],
    },
});
export const loadSvg = () => ({
    module: {
        rules: [
            {
                test:   /\.svg$/,
                issuer: {
                    test: /\.js$/,
                },
                use: [
                    '@svgr/webpack',
                    {
                        loader:  'file-loader',
                        options: {
                            name: `images/${CHUNK_NAME_ASSET}`,
                        },
                    },
                ],
            },
            {
                test:   /\.svg$/,
                issuer: {
                    test: /\.css$/,
                },
                use: [
                    {
                        loader:  'file-loader',
                        options: {
                            name: `images/${CHUNK_NAME_ASSET}`,
                        },
                    },
                ],
            },
        ],
    },
});

export const loadFonts = () => ({
    module: {
        rules: [
            {
                test:    /\.woff2$/,
                include: SOURCE,
                use:     [
                    {
                        loader:  'file-loader',
                        options: {
                            name: `fonts/${CHUNK_NAME_ASSET}`,
                        },
                    },
                ],
            },
        ],
    },
});

export const connectHtml = () => ({
    plugins: [
        new HtmlWebpackPlugin({
            title:    'Lectrum Education',
            template: `${STATIC}/template.html`,
            favicon:  `${STATIC}/favicon/lectrum-favicon-512x512.png`,
        }),
    ],
});
