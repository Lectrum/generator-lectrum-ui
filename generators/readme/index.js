// Core
const Generator = require('yeoman-generator');
const messages = require('./templates/messages');

module.exports = class Readme extends Generator {
    writing() {
        const initialized = this.config.get('initialized');
        const educational = this.config.get('educational');
        const redux = this.config.get('redux');
        const webpack = this.config.get('webpack');
        const repositoryOwner = this.config.get('repositoryOwner');

        let repositoryName = 'clean-install';
        const isPackageJsonExists = this.fs.exists('package.json');

        if (isPackageJsonExists && educational) {
            const { name } = JSON.parse(this.fs.read('package.json'));
            repositoryName = name;
        }

        const selectedMessages = messages[ repositoryName ];

        if (!initialized) {
            this.fs.copy(
                this.templatePath('static'),
                this.destinationPath('static'),
            );
        }

        let logo = 'react';

        if (redux) {
            logo = 'redux';
        } else if (webpack) {
            logo = 'webpack';
        }

        this.fs.copyTpl(
            this.templatePath(`${repositoryName}.ejs`),
            this.destinationPath('README.md'),
            {
                ...selectedMessages,
                initialized,
                educational,
                repositoryOwner,
                repositoryName,
                logo,
                NODE_VERSION: '10.13.0',
                NPM_VERSION:  '6.4.1',
            },
        );
    }
};
