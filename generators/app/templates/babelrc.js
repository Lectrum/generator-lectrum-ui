module.exports = function(api) {
    api.cache.using(() => api.env() === 'development');

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
        plugins: [
            '@babel/plugin-proposal-class-properties',
            ['@babel/plugin-proposal-decorators', { legacy: true }],
            'react-hot-loader/babel',
        ],
    };
};
