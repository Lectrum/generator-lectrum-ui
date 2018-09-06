module.exports = {
    runner:                       'jest-runner',
    displayName:                  'test:unit',
    rootDir:                      '../',
    verbose:                      false,
    notify:                       true,
    bail:                         false,
    collectCoverage:              false,
    modulePaths:                  [ '<rootDir>/source', '<rootDir>/node_modules' ],
    moduleFileExtensions:         [ 'js', 'json', 'css' ],
    setupFiles:                   [ '<rootDir>/jest/scripts/setupFiles.js' ],
    setupTestFrameworkScriptFile:
        '<rootDir>/jest/scripts/setupEnzymeEnvironment.js',
    snapshotSerializers: [ 'enzyme-to-json/serializer' ],
    moduleNameMapper:    {
        '\\.(css|m.css)$': 'identity-obj-proxy',
    },
    testURL: 'https://www.test.com',
};
