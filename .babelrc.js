module.exports = function(api) {
    api.cache.using(() => api.env() === 'development');

    return {
        presets: [
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
            'add-module-exports',
            '@babel/plugin-transform-flow-strip-types',
            '@babel/plugin-proposal-class-properties',
        ],
    };
};
