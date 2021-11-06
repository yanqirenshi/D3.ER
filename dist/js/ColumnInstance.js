"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Pool = _interopRequireDefault(require("./Pool"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ColumnInstance = /*#__PURE__*/function () {
  function ColumnInstance() {
    _classCallCheck(this, ColumnInstance);

    this.pool = new _Pool["default"]();
  }
  /* **************************************************************** *
   *  Data manegement
   * **************************************************************** */


  _createClass(ColumnInstance, [{
    key: "build",
    value: function build(list) {
      return new _Pool["default"]().list2poolWithIndex(list);
    }
  }]);

  return ColumnInstance;
}();

exports["default"] = ColumnInstance;