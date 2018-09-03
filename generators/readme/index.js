var Generator = require('yeoman-generator');

module.exports = class Readme extends Generator {
    constructor(one, two) {
        super(one, two);
    }

    writing() {
        this.fs.copyTpl(
            this.templatePath('generator.ejs'),
            this.destinationPath('README.md'),
        );
    }
};
