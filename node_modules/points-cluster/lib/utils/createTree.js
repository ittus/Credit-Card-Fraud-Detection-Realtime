'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _rbush = require('rbush');

var _rbush2 = _interopRequireDefault(_rbush);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toBBox = function toBBox(p) {
  return [p.x, p.y, p.x, p.y];
};
var compareMinX = function compareMinX(a, b) {
  return a.x - b.x;
};
var compareMinY = function compareMinY(a, b) {
  return a.y - b.y;
};

exports.default = function (nodeSize) {
  var tree = (0, _rbush2.default)(nodeSize);
  tree.toBBox = toBBox;
  tree.compareMinX = compareMinX;
  tree.compareMinY = compareMinY;
  return tree;
};