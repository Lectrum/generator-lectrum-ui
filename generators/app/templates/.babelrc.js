module.exports = (api) => {
    const env = api.env();

    api.cache.using(() => env === 'development');

    const plugins = [
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        ['@babel/plugin-proposal-class-properties', { loose: true }],
        // Included until Node v.10 release
        '@babel/plugin-proposal-async-generator-functions',
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
                },
            ],
        ],
        plugins,
    };
};
