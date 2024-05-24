"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _Pool = _interopRequireDefault(require("../Pool"));
var _Geometry = _interopRequireDefault(require("../Geometry"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// data model
var Port = exports["default"] = /*#__PURE__*/function () {
  function Port() {
    _classCallCheck(this, Port);
    this.pool = new _Pool["default"]();
    this.geometry = new _Geometry["default"]();
  }
  /**
   * entity と port
   */
  _createClass(Port, [{
    key: "calLinePoints",
    value: function calLinePoints(port) {
      var entity = port._column_instance._table;
      var rect = {
        position: {
          x: entity.x,
          y: entity.y
        },
        size: {
          w: entity.w,
          h: entity.h
        }
      };
      var geometry = this.geometry;

      // entity の四辺
      var four_side_lines = geometry.getFourSideLines(rect);

      // port と entityの中心との直線。
      var line_port = geometry.getPortLine(port, rect);

      // port と entityの中心との直線 と entity の四辺の交点。
      // 交点 と どの辺 が返ってくる。
      var cross_point = geometry.getCrossPoint(four_side_lines, line_port);

      // entity と port との距離
      var len = 33 + 4; // 33: ?, 4: ?

      // point の位置を返す
      var to_point = cross_point.point;
      var from_point = function from_point() {
        switch (cross_point.target) {
          case 'top':
            return {
              x: to_point.x,
              y: to_point.y + len
            };
          case 'right':
            return {
              x: to_point.x - len,
              y: to_point.y
            };
          case 'bottom':
            return {
              x: to_point.x,
              y: to_point.y - len
            };
          case 'left':
            return {
              x: to_point.x + len,
              y: to_point.y
            };
          default:
            throw new Error('!!!');
        }
      };
      return {
        from: from_point(),
        to: to_point
      };
    }
    /** **************************************************************** *
     * port と entity の間の向きを返します。
     * **************************************************************** */
  }, {
    key: "portDirection",
    value: function portDirection(from, to) {
      // 縦
      if (from.x === to.x) {
        if (from.y < to.y) return 'UP';
        if (from.y > to.y) return 'DOWN';
      }

      // 横
      if (from.y === to.y) {
        if (from.x < to.x) return 'RIGHT';
        if (from.x > to.x) return 'LEFT';
      }

      // これはありえないはず。
      throw new Error('Can Not Found Direction.');
    }
    /** **************************************************************** *
     * 1 line (cardinaly: 1)
     * Cardinary： n ケースの座標を計算する。
     * Line の from, to で向きを決める。
     * d: port
     * distance: between port and entity
     * **************************************************************** */
  }, {
    key: "calOneLine",
    value: function calOneLine(from, to, distance) {
      var r = 11;
      switch (this.portDirection(from, to)) {
        case 'DOWN':
          return {
            from: {
              x: from.x + r,
              y: from.y + distance
            },
            to: {
              x: from.x - r,
              y: from.y + distance
            }
          };
        case 'DOWN':
          return {
            from: {
              x: from.x + r,
              y: from.y - distance
            },
            to: {
              x: from.x - r,
              y: from.y - distance
            }
          };
        case 'RIGHT':
          return {
            from: {
              x: from.x + distance,
              y: from.y + r
            },
            to: {
              x: from.x + distance,
              y: from.y - r
            }
          };
        case 'LEFT':
          return {
            from: {
              x: from.x - distance,
              y: from.y + r
            },
            to: {
              x: from.x - distance,
              y: from.y - r
            }
          };
        default:
          return {
            from: {
              x: 0,
              y: 0
            },
            to: {
              x: 0,
              y: 0
            }
          };
      }
    }
  }, {
    key: "calThreeLine",
    value:
    /**
     * 3 line (cardinaly: n)
     * Cardinary： n ケースの座標を計算する。
     * Line の from, to で向きを決める。
     * d: port
     * distance: between port and entity
     * **************************************************************** */
    function calThreeLine(from, to, distance) {
      switch (this.portDirection(from, to)) {
        case 'DOWN':
          return [[from.x - distance, from.y], [from.x, from.y + distance], [from.x + distance, from.y]];
        case 'DOWN':
          return [[from.x - distance, from.y], [from.x, from.y - distance], [from.x + distance, from.y]];
        case 'RIGHT':
          return [[from.x, from.y - distance], [from.x + distance, from.y], [from.x, from.y + distance]];
        case 'LEFT':
          return [[from.x, from.y - distance], [from.x - distance, from.y], [from.x, from.y + distance]];
        default:
          return [[0, 0], [0, 0], [0, 0]];
      }
    }
  }, {
    key: "calCircle",
    value:
    /** **************************************************************** *
     * null のための 丸
     * **************************************************************** */
    function calCircle(from, to) {
      var distance = 22;
      switch (this.portDirection(from, to)) {
        case 'DOWN':
          return {
            x: from.x,
            y: from.y + distance
          };
        case 'DOWN':
          return {
            x: from.x,
            y: from.y - distance
          };
        case 'RIGHT':
          return {
            x: from.x + distance,
            y: from.y
          };
        case 'LEFT':
          return {
            x: from.x - distance,
            y: from.y
          };
        default:
          return {
            x: 0,
            y: 0
          };
      }
    }
  }, {
    key: "build",
    value:
    /* **************************************************************** *
     *  Data manegement
     * **************************************************************** */
    function build(list) {
      return this.pool.list2pool(list, function (d) {
        if (!d.cardinality) d.cardinality = 1;else if (d.cardinality !== 1 && d.cardinality !== 3) throw new Error('Not supported yet. cardinality=' + d.cardinality);
        if (!d.optionality && d.optionality !== 0) d.optionality = 1;else if (d.optionality !== 1 && d.optionality !== 0) throw new Error('Not supported yet. optionality=' + d.optionality);
        return d;
      });
    }
  }]);
  return Port;
}();