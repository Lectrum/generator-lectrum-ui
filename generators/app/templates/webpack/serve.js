// Core
import serve from 'webpack-serve';
import connect from 'koa-connect';
import compress from 'koa-compress';
import fallback from 'connect-history-api-fallback';
import progress from 'webpack-serve-waitpage';

// Main config
import createConfig from './webpack.config.js';

const argv = {};

(async () => {
    const config = await createConfig();

    await serve(argv, {
        config,
        logLevel:      'silent',
        devMiddleware: {
            publicPath: '/',
            logLevel:   'silent',
        },
        hotClient: {
            logLevel: 'silent',
        },
        add: (app, middleware, options) => {
            app.use(
                progress(options, {
                    theme: 'material',
                }),
            );
            app.use(connect(fallback()));
            app.use(compress());
        },
    });
})();
