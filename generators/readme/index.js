const Generator = require('yeoman-generator');
const messages = require('./templates/messages');

module.exports = class Readme extends Generator {
    constructor(args, options) {
        super(args, options);

        this.option('project', {
            description:
                'Name of the project README.md file is generating for.',
            type:    String,
            default: this.config.get('repositoryName'),
        });
    }

    writing() {
        const project = this.options.project;

        const isInitialized = this.config.get('isInitialized');
        const repositoryOwner = this.config.get('repositoryOwner');
        const repositoryName = this.config.get('repositoryName');

        const selectedMessages = messages[ project ];

        if (!isInitialized) {
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
                isInitialized,
                repositoryOwner,
                repositoryName,
            },
        );
    }
};
