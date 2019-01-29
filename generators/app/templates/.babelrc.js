module.exports = api => {
    const env = api.env();

    api.cache.using(() => env === 'development');

    const plugins = [
        ['@babel/proposal-decorators', { legacy: true }],
        ['@babel/proposal-class-properties', { loose: true }],
        '@babel/syntax-dynamic-import',
    ];

    if (env === 'development') {
        plugins.push('react-hot-loader/babel');
    }

    return {
        presets: [
            '@babel/react',
            [
                '@babel/env',
                {
                    useBuiltIns: 'usage',
                    shippedProposals: true,
                    spec: true,
                    loose: false,
                    debug: false,
                    modules: env === 'test' ? 'cjs' : false,
                },
            ],
        ],
        plugins,
    };
};
