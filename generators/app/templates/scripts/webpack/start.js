// Core
import webpack from 'webpack';
import devServer from 'webpack-dev-server';
import hot from 'webpack-hot-middleware';
import openBrowser from 'react-dev-utils/openBrowser';
import waitpage from 'webpack-dev-server-waitpage';

// Config
import generateDevConfig from './config/webpack.dev';

(async () => {
    const config = await generateDevConfig();
    const {
        devServer: { host, port },
    } = config;

    const compiler = webpack(config);

    const server = new devServer(compiler, {
        host,
        port,
        historyApiFallback: true,
        overlay:            true,
        quiet:              true,
        clientLogLevel:     'none',
        noInfo:             true,
        before:             (app, server) => {
            app.use(
                waitpage(server, {
                    theme: 'material',
                }),
            );
        },
        after: (app) => {
            app.use(
                hot(compiler, {
                    log: false,
                }),
            );
        },
    });

    server.listen(port, host, () => {
        openBrowser(`http://${host}:${port}`);
    });
})();
