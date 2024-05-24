"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _Pool = _interopRequireDefault(require("../Pool"));
var _Column = _interopRequireDefault(require("../painters/Column.js"));
var _Port = _interopRequireDefault(require("../painters/Port.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Entity = exports["default"] = /*#__PURE__*/function () {
  function Entity(options) {
    _classCallCheck(this, Entity);
    this.pool = new _Pool["default"]();
    this._place = null;
    this._padding = 11;
    this._values = {};
    this._callbacks = {};
    this._Column = null;
    this.port = new _Port["default"]();
    if (options) this.init(options);
  }
  _createClass(Entity, [{
    key: "init",
    value: function init(options) {
      this._place = options.place;
      this._values = options.values;
      this._callbacks = options.callbacks;
      this.column = new _Column["default"]({
        padding: this._padding,
        values: this._values
      });
    }
    /* **************************************************************** *
     *  util
     * **************************************************************** */
  }, {
    key: "getCallbak",
    value: function getCallbak(keys_str) {
      if (!this._callbacks || !keys_str) return null;
      var keys = keys_str.split('.');
      var callbacks = this._callbacks;
      var _iterator = _createForOfIteratorHelper(keys),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var key = _step.value;
          var val = callbacks[key];
          if (typeof val == "function") return val;
          callbacks = val;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return null;
    }
  }, {
    key: "callCallbak",
    value: function callCallbak(thisArg, keys_str) {
      var args_arr = Array.prototype.slice.call(arguments);
      var argsArray = args_arr.slice(2);
      var callback = this.getCallbak(keys_str);
      if (!callback) return;
      callback.apply(thisArg, argsArray);
    }
    /* **************************************************************** *
     *  Sizing
     * **************************************************************** */
  }, {
    key: "headerWidth",
    value: function headerWidth(d) {
      var padding = this._padding;
      return d.w - padding * 2;
    }
  }, {
    key: "headerContentsHight",
    value: function headerContentsHight(d) {
      return 22;
    }
  }, {
    key: "headerHight",
    value: function headerHight(d) {
      var padding_top = this._padding;
      var padding_bottm = 3;
      return 22 + padding_top + padding_bottm;
    }
    /// base
  }, {
    key: "baseHeight",
    value: function baseHeight(d) {
      return this.headerHight(d) + this.column.columnsHeight(d);
    }
    /* **************************************************************** *
     *  Positioning
     * **************************************************************** */
    ///
    /// 未実装
    ///
    /* **************************************************************** *
     *  Data manegement
     * **************************************************************** */
  }, {
    key: "build",
    value: function build(list) {
      return this.pool.list2pool(list);
    }
  }]);
  return Entity;
}();