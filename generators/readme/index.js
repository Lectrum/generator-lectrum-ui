var Generator = require('yeoman-generator');

module.exports = class Readme extends Generator {
    constructor(one, two) {
        super(one, two);
    }

    writing() {
        const title = this.config.get('title');
        const faviconUrl = this.config.get('faviconUrl');
        const repositoryName = this.config.get('repositoryName');
        const descriptionGreeting = this.config.get('descriptionGreeting');
        const descriptionBody = this.config.get('descriptionBody');
        const descriptionFooter = this.config.get('descriptionFooter');

        this.fs.copyTpl(
            this.templatePath('generator.ejs'),
            this.destinationPath('README.md'),
            {
                title,
                faviconUrl,
                repositoryName,
                descriptionGreeting,
                descriptionBody,
                descriptionFooter,
            },
        );
    }
};
