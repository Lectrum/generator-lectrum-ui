"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _yeomanGenerator = _interopRequireDefault(require("yeoman-generator"));

var _chalk = _interopRequireDefault(require("chalk"));

var _yosay = _interopRequireDefault(require("yosay"));

var _updateNotifier = _interopRequireDefault(require("update-notifier"));

var _child_process = require("child_process");

var _rimraf = _interopRequireDefault(require("rimraf"));

var _package = _interopRequireDefault(require("../../package.json"));

var _package2 = _interopRequireDefault(require("./templates/package.json"));

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

    _defineProperty(this, "PACKAGE_MANAGER", 'yarn');

    this.log((0, _yosay.default)(`Команда ${_chalk.default.blueBright('Lectrum')} приветствует тебя!`));
    this.option('zip', {
      description: 'Returns repository to its initial state',
      type: Boolean,
      default: false
    });
  }

  initializing() {
    this.composeWith('@lectrum/ui:readme');
  }

  writing() {
    const {
      zip
    } = this.options;

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
        this.PACKAGE_MANAGER = 'npm';
        this.log(_chalk.default.bgBlack(`${_chalk.default.red('x ')}${yarn} ${_chalk.default.whiteBright('not found.\nInstalling dependencies with')} ${npm}.`));
        this.npmInstall();
      }
    }
  }

  async end() {
    const {
      zip
    } = this.options;
    const isInitialized = this.config.get('isInitialized');

    if (!isInitialized && !zip) {
      this.config.set('isInitialized', true);

      if (!this.PACKAGE_MANAGER === 'yarn') {
        await this.spawnCommand('yarn', ['start']);
      } else {
        await this.spawnCommand('npm', ['run', 'start']);
      }
    }
  }

  _writeDotfiles() {
    this.fs.copy(this.templatePath('.gitignore'), this.destinationPath('.gitignore'));
    this.fs.copy(this.templatePath('.editorconfig'), this.destinationPath('.editorconfig'));
    this.fs.copy(this.templatePath('.eslintignore'), this.destinationPath('.eslintignore'));
    this.fs.copy(this.templatePath('.eslintrc.yaml'), this.destinationPath('.eslintrc.yaml'));
    this.fs.copy(this.templatePath('.czrc'), this.destinationPath('.czrc'));
    this.fs.copy(this.templatePath('.stylelintrc'), this.destinationPath('.stylelintrc'));
    this.fs.copy(this.templatePath('.stylelintignore'), this.destinationPath('.stylelintignore'));
    this.fs.copy(this.templatePath('.browserslistrc'), this.destinationPath('.browserslistrc'));
    this.fs.copy(this.templatePath('.babelrc.js'), this.destinationPath('.babelrc.js'));
  }

  _removeDotfiles() {
    (0, _rimraf.default)('.gitignore', () => {
      this.log(`.gitignore ${_chalk.default.red('deleted')}`);
    });
    (0, _rimraf.default)('.editorconfig', () => {
      this.log(`.editorconfig ${_chalk.default.red('deleted')}`);
    });
    (0, _rimraf.default)('.eslintignore', () => {
      this.log(`.eslintignore ${_chalk.default.red('deleted')}`);
    });
    (0, _rimraf.default)('.eslintrc.yaml', () => {
      this.log(`.eslintrc.yaml ${_chalk.default.red('deleted')}`);
    });
    (0, _rimraf.default)('.czrc', () => {
      this.log(`.czrc ${_chalk.default.red('deleted')}`);
    });
    (0, _rimraf.default)('.stylelintrc', () => {
      this.log(`.stylelintrc ${_chalk.default.red('deleted')}`);
    });
    (0, _rimraf.default)('.stylelintignore', () => {
      this.log(`.stylelintignore ${_chalk.default.red('deleted')}`);
    });
    (0, _rimraf.default)('.browserslistrc', () => {
      this.log(`.browserslistrc ${_chalk.default.red('deleted')}`);
    });
    (0, _rimraf.default)('.babelrc.js', () => {
      this.log(`.babelrc.js ${_chalk.default.red('deleted')}`);
    });
  }

  _writeRegularFiles() {
    this.fs.copy(this.templatePath('LICENSE'), this.destinationPath('LICENSE'));
    this.fs.copy(this.templatePath('nodemon.json'), this.destinationPath('nodemon.json'));
  }

  _removeRegularFiles() {
    (0, _rimraf.default)('LICENSE', () => {
      this.log(`LICENSE ${_chalk.default.red('deleted')}`);
    });
    (0, _rimraf.default)('nodemon.json', () => {
      this.log(`nodemon.json ${_chalk.default.red('deleted')}`);
    });
    (0, _rimraf.default)('yarn.lock', () => {
      this.log(`yarn.lock ${_chalk.default.red('deleted')}`);
    });
  }

  _writeDirectories() {
    this.fs.copy(this.templatePath('webpack'), this.destinationPath('webpack'));
    this.fs.copy(this.templatePath('jest'), this.destinationPath('jest'));
  }

  _removeDirectories() {
    (0, _rimraf.default)('webpack', () => {
      this.log(`webpack ${_chalk.default.red('deleted')}`);
    });
    (0, _rimraf.default)('jest', () => {
      this.log(`jest ${_chalk.default.red('deleted')}`);
    });
    (0, _rimraf.default)('node_modules', () => {
      this.log(`node_modules ${_chalk.default.red('deleted')}`);
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
        dependencies
      } = JSON.parse(this.fs.read('package.json'));
      this.fs.delete('package.json');
      this.fs.writeJSON('package.json', {
        name,
        version,
        author,
        private: isPrivate,
        scripts: _package2.default.scripts,
        dependencies,
        devDependencies: _package2.default.devDependencies
      });
    } else {
      this.fs.writeJSON('package.json', {
        name: 'my-app',
        version: '0.0.0',
        private: false,
        scripts: _package2.default.scripts,
        devDependencies: _package2.default.devDependencies
      });
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
    this.fs.delete('package.json');
    this.fs.writeJSON('package.json', {
      name,
      version,
      author,
      private: isPrivate,
      dependencies
    });
    this.log(`package.json ${_chalk.default.red('zipped')}`);
  }

}

exports.default = Ui;
module.exports = exports["default"];
