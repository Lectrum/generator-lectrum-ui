// Core
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import HtmlWebpackTemplate from 'html-webpack-template';

// Constants
import { SOURCE, STATICS } from '../../constants';

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
            inject:   false,
            template: HtmlWebpackTemplate,
            title:    'Lectrum Education',
            favicon:  `${STATICS}/favicon/lectrum-favicon-512x512.png`,
            meta:     [
                {
                    name:    'viewport',
                    content:
                        'user-scalable=no, width=device-width, initial-scale=1',
                },
            ],
            appMountIds: [ 'app', 'spinner' ],
        }),
    ],
});
