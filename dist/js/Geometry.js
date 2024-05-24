"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// https://yanqirenshi.github.io/D3.Sketch/dist/edge/Drawer.js
/**
 * 幾何学計算するための Drawer です。
 *
 * @example
 * let drawer = new DrawerHierarchy();
 */
var Geometry = exports["default"] = /*#__PURE__*/function () {
  function Geometry() {
    _classCallCheck(this, Geometry);
  }
  _createClass(Geometry, [{
    key: "deg2rad",
    value:
    ///// ////////////////////////////////////////////////////////////////
    /////   Utilities
    ///// ////////////////////////////////////////////////////////////////
    function deg2rad(degree) {
      return degree * (Math.PI / 180);
    }
    ///// ////////////////////////////////////////////////////////////////
    /////   Rect
    ///// ////////////////////////////////////////////////////////////////
  }, {
    key: "getFourSideLines",
    value: function getFourSideLines(rect) {
      var x = 0; //rect.position.x;
      var y = 0; //rect.position.y;

      var w = rect.size.w;
      var h = rect.size.h;
      var port_r = 4;
      var margin = 33 + port_r;
      var top_left = {
        x: x - margin,
        y: y - margin
      };
      var top_right = {
        x: x + w + margin,
        y: y - margin
      };
      var bottom_rigth = {
        x: x + w + margin,
        y: y + h + margin
      };
      var bottom_left = {
        x: x - margin,
        y: y + h + margin
      };
      return [{
        code: 'top',
        from: top_left,
        to: top_right
      }, {
        code: 'right',
        from: top_right,
        to: bottom_rigth
      }, {
        code: 'bottom',
        from: bottom_rigth,
        to: bottom_left
      }, {
        code: 'left',
        from: bottom_left,
        to: top_left
      }];
    }
    ///// ////////////////////////////////////////////////////////////////
    /////   Rect
    ///// ////////////////////////////////////////////////////////////////
  }, {
    key: "getPortLineFrom",
    value: function getPortLineFrom(rect) {
      return {
        x: Math.floor(rect.size.w / 2),
        y: Math.floor(rect.size.h / 2)
      };
    }
  }, {
    key: "getPortLineToPoint",
    value: function getPortLineToPoint(node) {
      var w = node.size.w;
      var h = node.size.h;
      return {
        x: 0,
        y: Math.floor(Math.sqrt(w * w + h * h))
      };
    }
  }, {
    key: "getPortLineTo",
    value: function getPortLineTo(degree, node) {
      var point = this.getPortLineToPoint(node);
      var x = point.x;
      var y = point.y;
      var degree_tmp;
      if (degree === 0) degree_tmp = degree;else if (!degree) degree_tmp = 90;else degree_tmp = degree % 360;
      var radian = this.deg2rad(degree_tmp);
      var cos = Math.cos(radian);
      var sin = Math.sin(radian);
      return {
        x: Math.floor(x * cos - y * sin),
        y: Math.floor(x * sin + y * cos)
      };
    }
  }, {
    key: "getPortLine",
    value: function getPortLine(port, rect) {
      // degree,
      var from = this.getPortLineFrom(rect);
      var to = this.getPortLineTo(port.degree, rect);
      return {
        from: {
          x: from.x,
          y: from.y
        },
        to: {
          x: to.x + from.x,
          y: to.y + from.y
        }
      };
    }
    ///// ////////////////////////////////////////////////////////////////
    /////   Cross Point of two lines
    ///// ////////////////////////////////////////////////////////////////
  }, {
    key: "isCorss",
    value: function isCorss(A, B, C, D) {
      // 二つの線分の交差チェック
      // https://www.hiramine.com/programming/graphics/2d_segmentintersection.html
      var ACx = C.x - A.x;
      var ACy = C.y - A.y;
      var BUNBO = (B.x - A.x) * (D.y - C.y) - (B.y - A.y) * (D.x - C.x);
      if (BUNBO === 0) return false;
      var r = ((D.y - C.y) * ACx - (D.x - C.x) * ACy) / BUNBO;
      var s = ((B.y - A.y) * ACx - (B.x - A.x) * ACy) / BUNBO;
      return 0 <= r && r <= 1 && 0 <= s && s <= 1;
    }
    // 2直線の交点を求める。(具)
  }, {
    key: "getCrossPointCore",
    value: function getCrossPointCore(line, line_port) {
      var out = {
        x: 0,
        y: 0
      };
      var A = line.from;
      var B = line.to;
      var C = line_port.from;
      var D = line_port.to;
      var bunbo = (B.y - A.y) * (D.x - C.x) - (B.x - A.x) * (D.y - C.y);
      if (!this.isCorss(A, B, C, D)) return null;

      // 二つの線分の交点を算出する。
      // http://mf-atelier.sakura.ne.jp/mf-atelier/modules/tips/program/algorithm/a1.html
      var d1, d2;
      d1 = C.y * D.x - C.x * D.y;
      d2 = A.y * B.x - A.x * B.y;
      out.x = (d1 * (B.x - A.x) - d2 * (D.x - C.x)) / bunbo;
      out.y = (d1 * (B.y - A.y) - d2 * (D.y - C.y)) / bunbo;
      return out;
    }
    // 2直線の交点を求める。
  }, {
    key: "getCrossPoint",
    value: function getCrossPoint(lines, line_port) {
      var _iterator = _createForOfIteratorHelper(lines),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var line = _step.value;
          var point = this.getCrossPointCore(line, line_port);
          if (point) return {
            point: point,
            target: line.code
          };
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return null;
    }
  }]);
  return Geometry;
}();