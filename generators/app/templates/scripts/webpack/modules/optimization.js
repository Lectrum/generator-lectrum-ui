// Core
import { ContextReplacementPlugin } from 'webpack';
import ImageminPlugin from 'imagemin-webpack';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';
import imageminSvgo from 'imagemin-svgo';

export const connectContextReplacement = () => ({
    plugins: [ new ContextReplacementPlugin(/moment\/locale$/, /(en|uk|ru)/) ],
});

export const optimizeImages = () => ({
    plugins: [
        new ImageminPlugin({
            imageminOptions: {
                plugins: [
                    imageminMozjpeg({
                        progressive: true,
                        quality:     60,
                    }),
                    imageminPngquant({
                        quality: 60,
                    }),
                    imageminSvgo(),
                ],
            },
        }),
    ],
});
