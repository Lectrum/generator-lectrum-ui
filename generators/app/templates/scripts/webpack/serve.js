// Core
import serve from 'webpack-serve';
import connect from 'koa-connect';
import compress from 'koa-compress';
import fallback from 'connect-history-api-fallback';
import progress from 'webpack-serve-waitpage';

// Development config
import generateDevelopmentConfiguration from './configurations/webpack.config.development';

const argv = {};

(async () => {
    const config = await generateDevelopmentConfiguration();

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
