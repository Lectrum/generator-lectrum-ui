const Generator = require('yeoman-generator');
const messages = require('./templates/messages');

module.exports = class Readme extends Generator {
    constructor(args, options) {
        super(args, options);

        this.option('project', {
            description:
                'Name of the project README.md file is generating for.',
            type:    String,
            default: this.config.get('repositoryName') || 'clean-install',
        });
    }

    writing() {
        const { project } = this.options;

        const initialized = this.config.get('initialized');
        const educational = this.config.get('educational');
        const redux = this.config.get('redux');
        const repositoryOwner = this.config.get('repositoryOwner');
        const repositoryName = this.config.get('repositoryName');

        const selectedMessages = messages[ project ];

        if (!initialized) {
            this.fs.copy(
                this.templatePath('static'),
                this.destinationPath('static'),
            );
        }

        this.fs.copyTpl(
            this.templatePath(`${project}.ejs`),
            this.destinationPath('README.md'),
            {
                ...selectedMessages,
                initialized,
                educational,
                repositoryOwner,
                repositoryName,
                logo: redux ? 'redux' : 'react',
            },
        );
    }
};
