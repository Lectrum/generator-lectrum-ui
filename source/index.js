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

        // regular files
        'LICENSE',

        // directories
        'jest',
        'scripts',
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
        this.composeWith('@lectrum/ui:readme');
    }

    writing() {
        const { zip } = this.options;
        if (zip) {
            this.assets.forEach((dotfile) => rimraf(dotfile, () => this.log(`${dotfile} ${chalk.red('deleted')}`)));
            this.trashFiles.forEach((trashFile) => rimraf(trashFile, () => this.log(`${trashFile} ${chalk.red('deleted')}`)));
            this._zipPackageJson();
            rimraf('.gitignore', () => this.log(`.gitignore ${chalk.red('deleted')}`));

            this.config.set('isInitialized', false);
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
        const isInitialized = this.config.get('isInitialized');

        if (!isInitialized && !zip) {
            this.config.set('isInitialized', true);
            if (!this.preferredPackageManager === 'yarn') {
                await this.spawnCommand('yarn', [ 'start' ]);
            } else {
                await this.spawnCommand('npm', [ 'run', 'start' ]);
            }
        }
    }

    _unzipPackageJson() {
        const isPackageJsonExists = this.fs.exists('package.json');

        if (isPackageJsonExists) {
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
            this.fs.writeJSON(
                'package.json',
                {
                    name:            'my-app',
                    version:         '0.0.0',
                    private:         false,
                    scripts:         packageJson.scripts,
                    devDependencies: packageJson.devDependencies,
                },
                null,
                4,
            );
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
