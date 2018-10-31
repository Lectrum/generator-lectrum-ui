module.exports = api => {
    const env = api.env();

    api.cache.using(() => env === 'development');

    const plugins = [
        '@babel/plugin-proposal-class-properties',
        'dynamic-import-node',
    ];

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
                        node: 'current',
                    },
                },
            ],
        ],
        plugins,
    };
};
