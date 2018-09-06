const Generator = require('yeoman-generator');

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

        const title = this.config.get('title');
        const repositoryName = this.config.get('repositoryName');
        const descriptionGreeting = this.config.get('descriptionGreeting');
        const descriptionBody = this.config.get('descriptionBody');
        const descriptionFooter = this.config.get('descriptionFooter');

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
                isInitialized,
                title,
                repositoryName,
                descriptionGreeting,
                descriptionBody,
                descriptionFooter,
            },
        );
    }
};
