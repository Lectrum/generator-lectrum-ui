module.exports = function(api) {
    api.cache(false);

    return {
        presets: [
            [
                '@babel/preset-env',
                {
                    useBuiltIns: 'entry',
                    shippedProposals: true,
                    spec: true,
                    debug: false,
                    targets: {
                        node: '8.11.4',
                    },
                    modules: 'commonjs'
                },
            ],
        ],
        plugins: [
            'add-module-exports',
            '@babel/plugin-transform-modules-commonjs',
        ],
    };
};
