module.exports = api => {
    const env = api.env();

    api.cache.using(() => env === 'development');

    const plugins = [
        // Included until Node v.10 release
        '@babel/plugin-proposal-async-generator-functions',
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
                        node: 'current'
                    }
                },
            ],
        ],
        plugins,
    };
};