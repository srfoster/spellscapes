"use strict";

var _path = _interopRequireDefault(require("path"));

var _codeFrame = require("@babel/code-frame");

var _typescript = _interopRequireDefault(require("typescript"));

var _fs = _interopRequireDefault(require("fs"));

var _createJestRunner = require("create-jest-runner");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var appendCodeFrame = function appendCodeFrame(_ref) {
  var filePath = _ref.filePath,
      errorMessage = _ref.errorMessage,
      location = _ref.location;

  if (typeof location === 'undefined') {
    return errorMessage;
  }

  var rawLines = _fs.default.readFileSync(filePath, 'utf8');

  return "".concat(errorMessage, "\n").concat((0, _codeFrame.codeFrameColumns)(rawLines, location, {
    highlightCode: true
  }));
};

var runTsc = function runTsc(_ref2) {
  var testPath = _ref2.testPath,
      jestConfig = _ref2.config,
      extraOptions = _ref2.extraOptions;
  var start = Date.now();
  var configPath = typeof extraOptions.tsconfigPath === 'string' ? _path.default.resolve(extraOptions.tsconfigPath) : _path.default.resolve(jestConfig.rootDir, 'tsconfig.json');

  if (!_fs.default.existsSync(configPath)) {
    throw new Error('Cannot find tsconfig file. Either create one in the root of your project or define a custom path via the `tsconfigPath` option.');
  }

  var configContents = _fs.default.readFileSync(configPath).toString();

  var _ts$parseConfigFileTe = _typescript.default.parseConfigFileTextToJson(configPath, configContents),
      config = _ts$parseConfigFileTe.config,
      error = _ts$parseConfigFileTe.error;

  var baseObj = {
    start: start,
    title: 'tsc',
    test: {
      path: testPath
    }
  };

  if (error) {
    return (0, _createJestRunner.fail)(_objectSpread({}, baseObj, {
      end: Date.now(),
      errorMessage: error
    }));
  }

  var settings = _typescript.default.convertCompilerOptionsFromJson(config['compilerOptions'] || {}, process.cwd());

  var options = Object.assign({}, {
    noEmit: true
  }, settings.options);

  var program = _typescript.default.createProgram([testPath], options);

  var emitResult = program.emit();

  var allDiagnostics = _typescript.default.getPreEmitDiagnostics(program).concat(emitResult.diagnostics).filter(function (diagnostic) {
    return diagnostic.file.fileName === testPath;
  });

  var errors = allDiagnostics.map(function (diagnostic) {
    if (diagnostic.file) {
      var _diagnostic$file$getL = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start),
          lineStart = _diagnostic$file$getL.line,
          characterStart = _diagnostic$file$getL.character;

      var _diagnostic$file$getL2 = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start + diagnostic.length),
          lineEnd = _diagnostic$file$getL2.line,
          characterEnd = _diagnostic$file$getL2.character;

      var location = {
        start: {
          line: lineStart + 1,
          column: characterStart + 1
        },
        end: {
          line: lineEnd + 1,
          column: characterEnd + 1
        }
      };

      var message = _typescript.default.flattenDiagnosticMessageText(diagnostic.messageText, '\n');

      return {
        location: location,
        errorMessage: message,
        filePath: diagnostic.file.fileName
      };
    } else {
      return {
        errorMessage: "".concat(_typescript.default.flattenDiagnosticMessageText(diagnostic.messageText, '\n')),
        filePath: testPath
      };
    }
  }).map(appendCodeFrame);
  var end = Date.now();

  if (errors.length === 0) {
    return (0, _createJestRunner.pass)(_objectSpread({}, baseObj, {
      end: end
    }));
  }

  return (0, _createJestRunner.fail)(_objectSpread({}, baseObj, {
    errorMessage: errors.join('\n\n'),
    end: end
  }));
};

module.exports = runTsc;