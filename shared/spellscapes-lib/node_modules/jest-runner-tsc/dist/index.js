"use strict";

var _createJestRunner = require("create-jest-runner");

var _cosmiconfig = _interopRequireDefault(require("cosmiconfig"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var explorer = (0, _cosmiconfig.default)('jest-runner-tsc');

var getExtraOptions = function getExtraOptions() {
  var searchedFor = explorer.searchSync();

  if (!searchedFor || typeof searchedFor.config === 'undefined') {
    return {};
  }

  return searchedFor.config;
};

module.exports = (0, _createJestRunner.createJestRunner)(require.resolve('./runTsc'), {
  getExtraOptions: getExtraOptions
});