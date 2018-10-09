"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _yeomanGenerator = _interopRequireDefault(require("yeoman-generator"));

var _chalk = _interopRequireDefault(require("chalk"));

var _yosay = _interopRequireDefault(require("yosay"));

var _updateNotifier = _interopRequireDefault(require("update-notifier"));

var _rimraf = _interopRequireDefault(require("rimraf"));

var _child_process = require("child_process");

var _shelljs = _interopRequireDefault(require("shelljs"));

var _package = _interopRequireDefault(require("../../package.json"));

var _package2 = _interopRequireDefault(require("./templates/package.json"));

var _dependencies = _interopRequireDefault(require("./templates/dependencies.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const notifier = (0, _updateNotifier.default)({
  pkg: _package.default,
  updateCheckInterval: 1000 * 60 * 60 * 24 // 1 day

});

if (notifier.update) {
  notifier.notify({
    message: `Update available ${_chalk.default.grey(notifier.update.current)} → ${_chalk.default.green(notifier.update.latest)}
Run ${_chalk.default.blue(`npm i -g ${notifier.packageName}`)} to update`
  });
}

class Ui extends _yeomanGenerator.default {
  constructor(args, options) {
    super(args, options);

    _defineProperty(this, "preferredPackageManager", 'yarn');

    _defineProperty(this, "assets", [// dotfiles
    '.editorconfig', '.eslintignore', '.eslintrc.yaml', '.stylelintrc', '.stylelintignore', '.browserslistrc', '.babelrc.js', '.nvmrc', '.gitattributes', 'scripts/.babelrc', // regular files
    'LICENSE', // directories
    'scripts', '__mocks__', 'static']);

    _defineProperty(this, "trashFiles", ['yarn.lock', 'package-lock.json', 'node_modules', 'build']);

    this.log((0, _yosay.default)(`Команда ${_chalk.default.blueBright('Lectrum')} приветствует тебя!`));
    this.option('zip', {
      description: 'Returns repository to its initial state',
      type: Boolean,
      default: false
    });
  }

  initializing() {
    if (!this.config.get('educational')) {
      this.assets.push('source');
    }

    this.composeWith('@lectrum/ui:readme');
  }

  writing() {
    const {
      zip
    } = this.options;
    const educational = this.config.get('educational');
    const repositoryName = this.config.get('repositoryName');

    if (repositoryName === 'webpack-intensive') {
      _shelljs.default.mkdir('-p', './scripts/git');

      this.fs.copy(this.templatePath('gitignore'), this.destinationPath('.gitignore'));
      this.fs.copy(this.templatePath('scripts/git'), this.destinationPath('scripts/git/'));
      this.fs.copy(this.templatePath('scripts/.babelrc.js'), this.destinationPath('scripts/git/.babelrc.js'));
      return null;
    }

    if (zip && educational) {
      this.assets.filter(asset => asset !== 'static').forEach(dotfile => (0, _rimraf.default)(dotfile, () => this.log(`${dotfile} ${_chalk.default.red('deleted')}`)));
      this.trashFiles.forEach(trashFile => (0, _rimraf.default)(trashFile, () => this.log(`${trashFile} ${_chalk.default.red('deleted')}`)));

      this._zipPackageJson();

      (0, _rimraf.default)('.gitignore', () => this.log(`.gitignore ${_chalk.default.red('deleted')}`));
    } else {
      this.fs.copy(this.templatePath('gitignore'), this.destinationPath('.gitignore'));
      this.assets.forEach(asset => {
        this.fs.copy(this.templatePath(asset), this.destinationPath(asset));
      });

      this._unzipPackageJson();
    }
  }

  install() {
    const {
      zip
    } = this.options;

    const yarn = _chalk.default.blue('yarn');

    const npm = _chalk.default.red('npm');

    if (!zip) {
      try {
        (0, _child_process.execSync)('yarn bin');
        this.log(_chalk.default.bgBlack(`${_chalk.default.greenBright('✓ ')} ${yarn} ${_chalk.default.whiteBright('found.\nInstalling dependencies with')} ${yarn}.`));
        this.yarnInstall();
      } catch (_unused) {
        this.preferredPackageManager = 'npm';
        this.log(_chalk.default.bgBlack(`${_chalk.default.red('x ')}${yarn} ${_chalk.default.whiteBright('not found.\nInstalling dependencies with')} ${npm}.`));
        this.npmInstall();
      }
    }
  }

  async end() {
    const {
      zip
    } = this.options;
    const initialized = this.config.get('initialized');
    const educational = this.config.get('educational');
    const repositoryName = this.config.get('repositoryName');

    if (!initialized && !zip) {
      this.config.set('initialized', true);

      if (repositoryName !== 'webpack-intensive') {
        if (!this.preferredPackageManager === 'yarn') {
          await this.spawnCommand('yarn', ['start']);
        } else {
          await this.spawnCommand('npm', ['run', 'start']);
        }
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
        dependencies
      } = JSON.parse(this.fs.read('package.json'));
      (0, _rimraf.default)('package.json', () => {
        this.log(`package.json ${_chalk.default.red('deleted')}`);
      });
      this.fs.writeJSON('package.json', {
        name,
        version,
        author,
        private: isPrivate,
        scripts: _package2.default.scripts,
        dependencies,
        devDependencies: _package2.default.devDependencies
      }, null, 4);
    } else {
      const unzippedPackageJson = {
        name: 'my-app',
        version: '0.0.0',
        private: false,
        scripts: _package2.default.scripts,
        dependencies: _dependencies.default,
        devDependencies: _package2.default.devDependencies
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
      dependencies
    } = JSON.parse(this.fs.read('package.json'));
    (0, _rimraf.default)('package.json', () => {
      this.log(`package.json ${_chalk.default.red('deleted')}`);
    });
    this.fs.writeJSON('package.json', {
      name,
      version,
      author,
      private: isPrivate,
      dependencies
    }, null, 4);
    this.log(`package.json ${_chalk.default.red('zipped')}`);
  }

}

exports.default = Ui;
module.exports = exports.default;
