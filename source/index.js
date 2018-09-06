/* @flow */

// Core
import Generator from 'yeoman-generator';
import chalk from 'chalk';
import yosay from 'yosay';
import updateNotifier from 'update-notifier';
import { execSync } from 'child_process';
import rimraf from 'rimraf';

// Parts
import pkg from '../../package.json';
import packageJson from './templates/package.json';

const notifier = updateNotifier({
    pkg,
    updateCheckInterval: 1000 * 60 * 60 * 24, // 1 day
});

if (notifier.update) {
    notifier.notify({
        message: `Update available ${chalk.grey(
            notifier.update.current,
        )} → ${chalk.green(notifier.update.latest)}
Run ${chalk.blue(`npm i -g ${notifier.packageName}`)} to update`,
    });
}

export default class Ui extends Generator {
    PACKAGE_MANAGER = 'yarn';

    constructor(args: Object, options: Object) {
        super(args, options);

        this.log(
            yosay(`Команда ${chalk.blueBright('Lectrum')} приветствует тебя!`),
        );
        this.option('zip', {
            description: 'Returns repository to its initial state',
            type:        Boolean,
            default:     false,
        });
    }

    initializing() {
        this.composeWith('@lectrum/ui:readme');
    }

    writing() {
        const { zip } = this.options;
        if (zip) {
            this._removeDirectories();
            this._removeRegularFiles();
            this._removeDotfiles();
            this._zipPackageJson();
            this.config.set('isInitialized', false);
        } else {
            this._writeDotfiles();
            this._writeRegularFiles();
            this._writeDirectories();
            this._writePackageJson();
        }
    }

    install() {
        const { zip } = this.options;
        const yarn = chalk.blue('yarn');
        const npm = chalk.red('npm');

        if (!zip) {
            try {
                execSync('yarn bin');
                this.log(
                    chalk.bgBlack(
                        `${chalk.greenBright('✓ ')} ${yarn} ${chalk.whiteBright(
                            'found.\nInstalling dependencies with',
                        )} ${yarn}.`,
                    ),
                );
                this.yarnInstall();
            } catch {
                this.PACKAGE_MANAGER = 'npm';

                this.log(
                    chalk.bgBlack(
                        `${chalk.red('x ')}${yarn} ${chalk.whiteBright(
                            'not found.\nInstalling dependencies with',
                        )} ${npm}.`,
                    ),
                );
                this.npmInstall();
            }
        }
    }

    async end() {
        const { zip } = this.options;
        const isInitialized = this.config.get('isInitialized');

        if (!isInitialized && !zip) {
            this.config.set('isInitialized', true);
            if (!this.PACKAGE_MANAGER === 'yarn') {
                await this.spawnCommand('yarn', [ 'start' ]);
            } else {
                await this.spawnCommand('npm', [ 'run', 'start' ]);
            }
        }
    }

    _writeDotfiles() {
        this.fs.copy(
            this.templatePath('.gitignore'),
            this.destinationPath('.gitignore'),
        );
        this.fs.copy(
            this.templatePath('.editorconfig'),
            this.destinationPath('.editorconfig'),
        );
        this.fs.copy(
            this.templatePath('.eslintignore'),
            this.destinationPath('.eslintignore'),
        );
        this.fs.copy(
            this.templatePath('.eslintrc.yaml'),
            this.destinationPath('.eslintrc.yaml'),
        );
        this.fs.copy(this.templatePath('.czrc'), this.destinationPath('.czrc'));
        this.fs.copy(
            this.templatePath('.stylelintrc'),
            this.destinationPath('.stylelintrc'),
        );
        this.fs.copy(
            this.templatePath('.stylelintignore'),
            this.destinationPath('.stylelintignore'),
        );
        this.fs.copy(
            this.templatePath('.browserslistrc'),
            this.destinationPath('.browserslistrc'),
        );
        this.fs.copy(
            this.templatePath('.babelrc.js'),
            this.destinationPath('.babelrc.js'),
        );
    }

    _removeDotfiles() {
        rimraf('.gitignore', () => {
            this.log(`.gitignore ${chalk.red('deleted')}`);
        });
        rimraf('.editorconfig', () => {
            this.log(`.editorconfig ${chalk.red('deleted')}`);
        });
        rimraf('.eslintignore', () => {
            this.log(`.eslintignore ${chalk.red('deleted')}`);
        });
        rimraf('.eslintrc.yaml', () => {
            this.log(`.eslintrc.yaml ${chalk.red('deleted')}`);
        });
        rimraf('.czrc', () => {
            this.log(`.czrc ${chalk.red('deleted')}`);
        });
        rimraf('.stylelintrc', () => {
            this.log(`.stylelintrc ${chalk.red('deleted')}`);
        });
        rimraf('.stylelintignore', () => {
            this.log(`.stylelintignore ${chalk.red('deleted')}`);
        });
        rimraf('.browserslistrc', () => {
            this.log(`.browserslistrc ${chalk.red('deleted')}`);
        });
        rimraf('.babelrc.js', () => {
            this.log(`.babelrc.js ${chalk.red('deleted')}`);
        });
    }

    _writeRegularFiles() {
        this.fs.copy(
            this.templatePath('LICENSE'),
            this.destinationPath('LICENSE'),
        );
        this.fs.copy(
            this.templatePath('nodemon.json'),
            this.destinationPath('nodemon.json'),
        );
    }

    _removeRegularFiles() {
        rimraf('LICENSE', () => {
            this.log(`LICENSE ${chalk.red('deleted')}`);
        });
        rimraf('nodemon.json', () => {
            this.log(`nodemon.json ${chalk.red('deleted')}`);
        });
        rimraf('yarn.lock', () => {
            this.log(`yarn.lock ${chalk.red('deleted')}`);
        });
    }

    _writeDirectories() {
        this.fs.copy(
            this.templatePath('webpack'),
            this.destinationPath('webpack'),
        );
        this.fs.copy(this.templatePath('jest'), this.destinationPath('jest'));
    }

    _removeDirectories() {
        rimraf('webpack', () => {
            this.log(`webpack ${chalk.red('deleted')}`);
        });
        rimraf('jest', () => {
            this.log(`jest ${chalk.red('deleted')}`);
        });
        rimraf('node_modules', () => {
            this.log(`node_modules ${chalk.red('deleted')}`);
        });
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
        } else {
            this.fs.writeJSON('package.json', {
                name:            'my-app',
                version:         '0.0.0',
                private:         false,
                scripts:         packageJson.scripts,
                devDependencies: packageJson.devDependencies,
            });
        }
    }

    _zipPackageJson() {
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
            private: isPrivate,
            dependencies,
        });
        this.log(`package.json ${chalk.red('zipped')}`);
    }
}
