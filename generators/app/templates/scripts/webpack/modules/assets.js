// Core
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

// Constants
import { SOURCE, STATICS, HTML_TEMPLATE } from '../constants';

export const loadFonts = () => ({
    module: {
        rules: [
            {
                test:    /\.woff2?(\?v=\d+\.\d+\.\d+)?$/,
                include: SOURCE,
                use:     {
                    loader:  'file-loader',
                    options: {
                        name: 'fonts/[name].[hash:5].[ext]',
                    },
                },
            },
        ],
    },
});

export const loadImages = () => ({
    module: {
        rules: [
            {
                test:    /\.jpe?g|png|svg$/,
                include: SOURCE,
                use:     {
                    loader:  'url-loader',
                    options: {
                        fallback: 'file-loader',
                        limit:    8192,
                        name:     'images/[name].[hash:5].[ext]',
                    },
                },
            },
        ],
    },
});

export const setupFavicon = () => ({
    plugins: [
        new FaviconsWebpackPlugin({
            logo:            './static/favicon/favicon.svg',
            prefix:          'images/favicon/icon-[hash]',
            statsFilename:   'iconstats-[hash].json',
            persistentCache: true,
        }),
    ],
});

export const setupHtml = () => ({
    plugins: [
        new HtmlWebpackPlugin({
            template: HTML_TEMPLATE,
            title:    'Lectrum Education',
            favicon:  `${STATICS}/favicon/lectrum-favicon-512x512.png`,
        }),
    ],
});
