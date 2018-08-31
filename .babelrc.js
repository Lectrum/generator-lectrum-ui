module.exports = function(api) {
    api.cache(false);

    console.log('→ api', api);
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
                },
            ],
        ],
    };
};
