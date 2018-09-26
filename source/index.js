/* @flow */

// Core
import Generator from 'yeoman-generator';
import chalk from 'chalk';
import yosay from 'yosay';
import updateNotifier from 'update-notifier';
import rimraf from 'rimraf';
import { execSync } from 'child_process';

// Parts
import pkg from '../../package.json';
import packageJson from './templates/package.json';
import cleanInstallDependencies from './templates/dependencies.json';

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
    preferredPackageManager = 'yarn';
    assets = [
        // dotfiles
        '.editorconfig',
        '.eslintignore',
        '.eslintrc.yaml',
        '.czrc',
        '.stylelintrc',
        '.stylelintignore',
        '.browserslistrc',
        '.babelrc.js',
        '.nvmrc',

        // regular files
        'LICENSE',

        // directories
        'scripts',
        '__mocks__',
        'static',
    ];

    trashFiles = [ 'yarn.lock', 'package-lock.json', 'node_modules', 'build' ];

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
        if (!this.config.get('educational')) {
            this.assets.push('source');
        }

        this.composeWith('@lectrum/ui:readme');
    }

    writing() {
        const { zip } = this.options;
        const educational = this.config.get('educational');

        if (zip && educational) {
            this.assets
                .filter((asset) => asset !== 'static')
                .forEach((dotfile) => rimraf(dotfile, () => this.log(`${dotfile} ${chalk.red('deleted')}`)));
            this.trashFiles.forEach((trashFile) => rimraf(trashFile, () => this.log(`${trashFile} ${chalk.red('deleted')}`)));
            this._zipPackageJson();
            rimraf('.gitignore', () => this.log(`.gitignore ${chalk.red('deleted')}`));
        } else {
            this.fs.copy(
                this.templatePath('gitignore'),
                this.destinationPath('.gitignore'),
            );

            this.assets.forEach((asset) => {
                this.fs.copy(
                    this.templatePath(asset),
                    this.destinationPath(asset),
                );
            });

            this._unzipPackageJson();
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
                this.preferredPackageManager = 'npm';

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
        const initialized = this.config.get('initialized');
        const educational = this.config.get('educational');

        if (!initialized && !zip) {
            this.config.set('initialized', true);
            if (!this.preferredPackageManager === 'yarn') {
                await this.spawnCommand('yarn', [ 'start' ]);
            } else {
                await this.spawnCommand('npm', [ 'run', 'start' ]);
            }
        } else if (initialized && zip && educational) {
            this.config.set('initialized', false);
        }
    }

    _unzipPackageJson() {
        const isPackageJsonExists = this.fs.exists('package.json');
        const educational = this.config.get('educational');

        if (isPackageJsonExists && educational) {
            const {
                name,
                version,
                author,
                private: isPrivate,
                dependencies,
            } = JSON.parse(this.fs.read('package.json'));

            rimraf('package.json', () => {
                this.log(`package.json ${chalk.red('deleted')}`);
            });

            this.fs.writeJSON(
                'package.json',
                {
                    name,
                    version,
                    author,
                    private:         isPrivate,
                    scripts:         packageJson.scripts,
                    dependencies,
                    devDependencies: packageJson.devDependencies,
                },
                null,
                4,
            );
        } else {
            const unzippedPackageJson = {
                name:            'my-app',
                version:         '0.0.0',
                private:         false,
                scripts:         packageJson.scripts,
                dependencies:    cleanInstallDependencies,
                devDependencies: packageJson.devDependencies,
            };

            this.fs.writeJSON('package.json', unzippedPackageJson, null, 4);
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

        rimraf('package.json', () => {
            this.log(`package.json ${chalk.red('deleted')}`);
        });

        this.fs.writeJSON(
            'package.json',
            {
                name,
                version,
                author,
                private: isPrivate,
                dependencies,
            },
            null,
            4,
        );
        this.log(`package.json ${chalk.red('zipped')}`);
    }
}
