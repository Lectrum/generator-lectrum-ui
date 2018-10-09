/* eslint-disable no-console */

// Core
import createCompiler from 'webpack';

// Production config
import generateProductionConfiguration from './config/webpack.prod';

const compiler = createCompiler(generateProductionConfiguration());

compiler.run((error, stats) => {
    if (error) {
        console.error(error.stack || error);

        if (error.details) {
            console.error(error.details);
        }

        return;
    }

    const info = stats.toJson();

    if (stats.hasErrors()) {
        console.error(info.errors);
    }

    if (stats.hasWarnings()) {
        console.warn(info.warnings);
    }
});
