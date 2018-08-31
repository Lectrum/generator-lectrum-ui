// Core
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

// Utils
const { promisify } = require('util');
const exec = promisify(require('child_process').exec);

// Parts
const packageJson = require('./templates/_package.json');

module.exports = class extends Generator {
    constructor(args, options) {
        super(args, options);

        this.log(
            yosay(`Команда ${chalk.blueBright('Lectrum')} приветствует тебя!`),
        );
    }

    _writeDotfiles() {
        this.fs.copy(
            this.templatePath('gitignore'),
            this.destinationPath('.gitignore'),
        );
        this.fs.copy(
            this.templatePath('editorconfig'),
            this.destinationPath('.editorconfig'),
        );
        this.fs.copy(
            this.templatePath('eslintignore'),
            this.destinationPath('.eslintignore'),
        );
        this.fs.copy(
            this.templatePath('eslintrc.yaml'),
            this.destinationPath('.eslintrc.yaml'),
        );
        this.fs.copy(this.templatePath('czrc'), this.destinationPath('.czrc'));
        this.fs.copy(
            this.templatePath('stylelintrc'),
            this.destinationPath('.stylelintrc'),
        );
        this.fs.copy(
            this.templatePath('stylelintignore'),
            this.destinationPath('.stylelintignore'),
        );
        this.fs.copy(
            this.templatePath('browserslistrc'),
            this.destinationPath('.browserslistrc'),
        );
        this.fs.copy(
            this.templatePath('babelrc'),
            this.destinationPath('.babelrc'),
        );
    }

    _writeRegularFiles() {
        this.fs.copy(
            this.templatePath('_LICENSE'),
            this.destinationPath('LICENSE'),
        );
        this.fs.copy(
            this.templatePath('_README.md'),
            this.destinationPath('README.md'),
        );
        this.fs.copy(
            this.templatePath('_nodemon.json'),
            this.destinationPath('nodemon.json'),
        );
    }

    _writeDirectories() {
        this.fs.copy(
            this.templatePath('_webpack'),
            this.destinationPath('webpack'),
        );
        this.fs.copy(
            this.templatePath('_static'),
            this.destinationPath('static'),
        );
    }

    _writePackageJson() {
        this.fs.copy(
            this.templatePath('_package.json'),
            this.destinationPath('package.json'),
        );
        this.fs.copy(
            this.templatePath('_package-lock.json'),
            this.destinationPath('package-lock.json'),
        );
        this.fs.copy(
            this.templatePath('_yarn.lock'),
            this.destinationPath('yarn.lock'),
        );
    }

    _writePackageJson() {
        const isPackageJsonExists = this.fs.exists('package.json');

        if (isPackageJsonExists) {
            const {
                name,
                version,
                author,
                private: isPrivate,
                dependencies,
            } = JSON.parse(this.fs.read('package.json'));

            this.fs.delete('package.json');
            this.fs.writeJSON('package.json', {
                name,
                version,
                author,
                private:         isPrivate,
                scripts:         packageJson.scripts,
                dependencies,
                devDependencies: packageJson.devDependencies,
            });
        }
    }

    writing() {
        this._writeDotfiles();
        this._writeRegularFiles();
        this._writeDirectories();
        this._writePackageJson();
    }

    async install() {
        const yarn = chalk.blue('yarn');
        const npm = chalk.red('npm');

        try {
            await exec('yarn');
            this.log(
                chalk.bgBlack(
                    `${chalk.greenBright('✓ ')} ${yarn} ${chalk.whiteBright(
                        'found.\nInstalling dependencies with',
                    )} ${yarn}.`,
                ),
            );
            this.yarnInstall();
        } catch (error) {
            this.log(
                chalk.bgBlack(
                    `${chalk.red('x ')}${yarn} ${chalk.whiteBright(
                        'not found.\nInstalling dependencies with',
                    )} ${npm}.`,
                ),
            );
            this.npmInstall();
            this.log(error.message);
        }
    }

    end() {
        this.config.save();
    }
};
