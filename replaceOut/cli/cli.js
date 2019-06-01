#! /usr/bin/env node
"use strict";

function _builderUtil() {
  const data = require("builder-util");

  _builderUtil = function () {
    return data;
  };

  return data;
}

function _chalk() {
  const data = _interopRequireDefault(require("chalk"));

  _chalk = function () {
    return data;
  };

  return data;
}

function _electronVersion() {
  const data = require("app-builder-lib/out/electron/electronVersion");

  _electronVersion = function () {
    return data;
  };

  return data;
}

function _yarn() {
  const data = require("app-builder-lib/out/util/yarn");

  _yarn = function () {
    return data;
  };

  return data;
}

function _fsExtraP() {
  const data = require("fs-extra-p");

  _fsExtraP = function () {
    return data;
  };

  return data;
}

function _isCi() {
  const data = _interopRequireDefault(require("is-ci"));

  _isCi = function () {
    return data;
  };

  return data;
}

var path = _interopRequireWildcard(require("path"));

function _readConfigFile() {
  const data = require("read-config-file");

  _readConfigFile = function () {
    return data;
  };

  return data;
}

function _updateNotifier() {
  const data = _interopRequireDefault(require("update-notifier"));

  _updateNotifier = function () {
    return data;
  };

  return data;
}

function _yargs() {
  const data = _interopRequireDefault(require("yargs"));

  _yargs = function () {
    return data;
  };

  return data;
}

function _builder() {
  const data = require("../builder");

  _builder = function () {
    return data;
  };

  return data;
}

function _createSelfSignedCert() {
  const data = require("./create-self-signed-cert");

  _createSelfSignedCert = function () {
    return data;
  };

  return data;
}

function _installAppDeps() {
  const data = require("./install-app-deps");

  _installAppDeps = function () {
    return data;
  };

  return data;
}

function _start() {
  const data = require("./start");

  _start = function () {
    return data;
  };

  return data;
}

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// tslint:disable:no-unused-expression
_yargs().default.parserConfiguration({
  "camel-case-expansion": false
}).command(["build", "*"], "Build", _builder().configureBuildCommand, wrap(_builder().build)).command("install-app-deps", "Install app deps", _installAppDeps().configureInstallAppDepsCommand, wrap(_installAppDeps().installAppDeps)).command("node-gyp-rebuild", "Rebuild own native code", _installAppDeps().configureInstallAppDepsCommand
/* yes, args the same as for install app deps */
, wrap(rebuildAppNativeCode)).command("create-self-signed-cert", "Create self-signed code signing cert for Windows apps", yargs => yargs.option("publisher", {
  alias: ["p"],
  type: "string",
  requiresArg: true,
  description: "The publisher name"
}).demandOption("publisher"), wrap(argv => (0, _createSelfSignedCert().createSelfSignedCert)(argv.publisher))).command("start", "Run application in a development mode using electron-webpack", yargs => yargs, wrap(() => (0, _start().start)())).help().epilog(`See ${_chalk().default.underline("https://electron.build")} for more documentation.`).strict().recommendCommands().argv;

function wrap(task) {
  return args => {
    checkIsOutdated();
    (0, _readConfigFile().loadEnv)(path.join(process.cwd(), "electron-builder.env")).then(() => task(args)).catch(error => {
      process.exitCode = 1; // https://github.com/electron-userland/electron-builder/issues/2940

      process.on("exit", () => process.exitCode = 1);
      console.error(_chalk().default.red(error instanceof _builderUtil().InvalidConfigurationError ? error.message : (error.stack || error).toString()));
    });
  };
}

function checkIsOutdated() {
  if (_isCi().default || process.env.NO_UPDATE_NOTIFIER != null) {
    return;
  }

  (0, _fsExtraP().readJson)(path.join(__dirname, "..", "..", "package.json")).then(it => {
    if (it.version === "0.0.0-semantic-release") {
      return;
    }

    const notifier = (0, _updateNotifier().default)({
      pkg: it
    });

    if (notifier.update != null) {
      notifier.notify({
        message: `Update available ${_chalk().default.dim(notifier.update.current)}${_chalk().default.reset(" → ")}${_chalk().default.green(notifier.update.latest)} \nRun ${_chalk().default.cyan("yarn upgrade electron-builder")} to update`
      });
    }
  }).catch(e => _builderUtil().log.warn({
    error: e
  }, "cannot check updates"));
}

async function rebuildAppNativeCode(args) {
  const projectDir = process.cwd();

  _builderUtil().log.info({
    platform: args.platform,
    arch: args.arch
  }, "executing node-gyp rebuild"); // this script must be used only for electron


  await (0, _builderUtil().exec)(process.platform === "win32" ? "node-gyp.cmd" : "node-gyp", ["rebuild"], {
    env: (0, _yarn().getGypEnv)({
      version: await (0, _electronVersion().getElectronVersion)(projectDir),
      useCustomDist: true
    }, args.platform, args.arch, true)
  });
} 
// __ts-babel@6.0.4
//# sourceMappingURL=cli.js.map