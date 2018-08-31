"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _yeomanGenerator = _interopRequireDefault(require("yeoman-generator"));

var _chalk = _interopRequireDefault(require("chalk"));

var _yosay = _interopRequireDefault(require("yosay"));

var _util = require("util");

var _child_process = require("child_process");

var _package = _interopRequireDefault(require("./templates/_package.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* @flow */
// Core
// Utils
const exec = (0, _util.promisify)(_child_process.exec); // Parts

class Main extends _yeomanGenerator.default {
  constructor(args, options) {
    super(args, options);
    this.log((0, _yosay.default)(`Команда ${_chalk.default.blueBright('Lectrum')} приветствует тебя!`));
  }

  _writeDotfiles() {
    this.fs.copy(this.templatePath('gitignore'), this.destinationPath('.gitignore'));
    this.fs.copy(this.templatePath('editorconfig'), this.destinationPath('.editorconfig'));
    this.fs.copy(this.templatePath('eslintignore'), this.destinationPath('.eslintignore'));
    this.fs.copy(this.templatePath('eslintrc.yaml'), this.destinationPath('.eslintrc.yaml'));
    this.fs.copy(this.templatePath('czrc'), this.destinationPath('.czrc'));
    this.fs.copy(this.templatePath('stylelintrc'), this.destinationPath('.stylelintrc'));
    this.fs.copy(this.templatePath('stylelintignore'), this.destinationPath('.stylelintignore'));
    this.fs.copy(this.templatePath('browserslistrc'), this.destinationPath('.browserslistrc'));
    this.fs.copy(this.templatePath('babelrc'), this.destinationPath('.babelrc'));
  }

  _writeRegularFiles() {
    this.fs.copy(this.templatePath('_LICENSE'), this.destinationPath('LICENSE'));
    this.fs.copy(this.templatePath('_README.md'), this.destinationPath('README.md'));
    this.fs.copy(this.templatePath('_nodemon.json'), this.destinationPath('nodemon.json'));
  }

  _writeDirectories() {
    this.fs.copy(this.templatePath('_webpack'), this.destinationPath('webpack'));
    this.fs.copy(this.templatePath('_static'), this.destinationPath('static'));
  }

  _writePackageJson() {
    this.fs.copy(this.templatePath('_package.json'), this.destinationPath('package.json'));
    this.fs.copy(this.templatePath('_package-lock.json'), this.destinationPath('package-lock.json'));
    this.fs.copy(this.templatePath('_yarn.lock'), this.destinationPath('yarn.lock'));
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
        scripts: _package.default.scripts,
        dependencies,
        devDependencies: _package.default.devDependencies
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
    const yarn = _chalk.default.blue('yarn');

    const npm = _chalk.default.red('npm');

    try {
      await exec('yarn');
      this.log(_chalk.default.bgBlack(`${_chalk.default.greenBright('✓ ')} ${yarn} ${_chalk.default.whiteBright('found.\nInstalling dependencies with')} ${yarn}.`));
      this.yarnInstall();
    } catch (error) {
      this.log(_chalk.default.bgBlack(`${_chalk.default.red('x ')}${yarn} ${_chalk.default.whiteBright('not found.\nInstalling dependencies with')} ${npm}.`));
      this.npmInstall();
      this.log(error.message);
    }
  }

  end() {
    this.config.save();
  }

}

exports.default = Main;
module.exports = exports["default"];
