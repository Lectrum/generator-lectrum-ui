module.exports = function(api) {
    const env = api.env();

    api.cache.using(() => env === 'development');

    const plugins = [
        '@babel/plugin-proposal-class-properties',
        ['@babel/plugin-proposal-decorators', { legacy: true }],
    ];

    if (env === 'node') {
        plugins.push('dynamic-import-node');
    } else {
        plugins.push('react-hot-loader/babel');
    }

    return {
        presets: [
            '@babel/preset-react',
            [
                '@babel/preset-env',
                {
                    useBuiltIns: 'usage',
                    shippedProposals: true,
                    spec: true,
                    loose: false,
                    debug: false,
                    targets: {
                        node: '8.11.4',
                    },
                    modules: 'commonjs',
                },
            ],
        ],
        plugins,
    };
};
