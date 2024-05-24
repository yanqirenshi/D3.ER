"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var d3 = _interopRequireWildcard(require("d3"));
var _Port = _interopRequireDefault(require("../datamodels/Port.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var Port = exports["default"] = /*#__PURE__*/function (_DataModel) {
  _inherits(Port, _DataModel);
  var _super = _createSuper(Port);
  function Port() {
    _classCallCheck(this, Port);
    return _super.apply(this, arguments);
  }
  _createClass(Port, [{
    key: "drawLine",
    value:
    // constructor () {
    //     super();
    // }
    /* **************************************************************** *
     *  Draw
     * **************************************************************** */
    function drawLine(g) {
      var _this = this;
      var lines = g.selectAll('line').data(function (d) {
        return d._ports ? d._ports : [];
      }, function (d) {
        return d._id;
      });

      // delete
      lines.exit().remove();

      // update
      lines.each(function (d, i) {
        var line = _this.calLinePoints(d);
        d.position = line.to;
        d.line = line;
      }).attr("x1", function (d) {
        return d.line.from.x;
      }).attr("y1", function (d) {
        return d.line.from.y;
      }).attr("x2", function (d) {
        return d.line.to.x;
      }).attr("y2", function (d) {
        return d.line.to.y;
      }).attr("stroke-width", 3).attr("stroke", "#a3a3a2");

      // add
      lines.enter().each(function (d, i) {
        var line = _this.calLinePoints(d);
        d.position = line.to;
        d.line = line;
      }).append("line").attr("x1", function (d) {
        return d.line.from.x;
      }).attr("y1", function (d) {
        return d.line.from.y;
      }).attr("x2", function (d) {
        return d.line.to.x;
      }).attr("y2", function (d) {
        return d.line.to.y;
      }).attr("stroke-width", 3).attr("stroke", "#a3a3a2");
    }
    /* **************************************************************** *
     *  Draw
     * **************************************************************** */
  }, {
    key: "drawCardinalityOne",
    value: function drawCardinalityOne(g) {
      var _this2 = this;
      var filter = function filter() {
        var ports = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        return ports.filter(function (d) {
          return d.cardinality === 1;
        });
      };
      var optionalities = g.selectAll('line.cardinality').data(function (d) {
        return filter(d._ports);
      }, function (d) {
        return d._id;
      });
      optionalities.attr("x1", function (d) {
        return d.line_cardinality.from.x;
      }).attr("y1", function (d) {
        return d.line_cardinality.from.y;
      }).attr("x2", function (d) {
        return d.line_cardinality.to.x;
      }).attr("y2", function (d) {
        return d.line_cardinality.to.y;
      }).attr("stroke-width", 3).attr("stroke", "#a3a3a2");
      optionalities.enter().each(function (d) {
        var from = d.line.from;
        var to = d.line.to;
        d.line_cardinality = _this2.calOneLine(from, to, 11);
      }).append('line').classed("cardinality", true).attr("x1", function (d) {
        return d.line_cardinality.from.x;
      }).attr("y1", function (d) {
        return d.line_cardinality.from.y;
      }).attr("x2", function (d) {
        return d.line_cardinality.to.x;
      }).attr("y2", function (d) {
        return d.line_cardinality.to.y;
      }).attr("stroke-width", 3).attr("stroke", "#a3a3a2");
    }
  }, {
    key: "drawCardinalityThree",
    value: function drawCardinalityThree(g) {
      var _this3 = this;
      var filter = function filter() {
        var ports = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        return ports.filter(function (d) {
          return d.cardinality === 3;
        });
      };
      var optionalities = g.selectAll('path.cardinality').data(function (d) {
        return filter(d._ports);
      }, function (d) {
        return d._id;
      });
      var line = d3.line().x(function (d) {
        return d[0];
      }).y(function (d) {
        return d[1];
      });
      optionalities.each(function (d) {
        var from = d.line.from;
        var to = d.line.to;
        d.line_cardinality_three = _this3.calThreeLine(from, to, 11);
      }).attr('d', function (d) {
        return line(d.line_cardinality_three);
      }).attr("stroke-width", 3).attr("stroke", "#a3a3a2");
      optionalities.enter().each(function (d) {
        var from = d.line.from;
        var to = d.line.to;
        d.line_cardinality_three = _this3.calThreeLine(from, to, 11);
      }).append('path').classed("cardinality", true).attr('d', function (d) {
        return line(d.line_cardinality_three);
      }).attr("fill", 'none').attr("stroke-width", 3).attr("stroke", "#a3a3a2");
    }
  }, {
    key: "drawCardinality",
    value: function drawCardinality(g) {
      // E1のインスタンス1つに対応する、E2のインスタンスの最大数
      this.drawCardinalityOne(g);
      this.drawCardinalityThree(g);
    }
  }, {
    key: "drawOptionalityOne",
    value: function drawOptionalityOne(g) {
      var _this4 = this;
      var filter = function filter() {
        var ports = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        return ports.filter(function (d) {
          return d.optionality === 1;
        });
      };
      var optionalities = g.selectAll('line.optionality').data(function (d) {
        return filter(d._ports);
      }, function (d) {
        return d._id;
      });
      optionalities.enter().each(function (d) {
        var from = d.line.from;
        var to = d.line.to;
        d.line_optionality = _this4.calOneLine(from, to, 22);
      }).append('line').classed("optionality", true).attr("x1", function (d) {
        return d.line_optionality.from.x;
      }).attr("y1", function (d) {
        return d.line_optionality.from.y;
      }).attr("x2", function (d) {
        return d.line_optionality.to.x;
      }).attr("y2", function (d) {
        return d.line_optionality.to.y;
      }).attr("stroke-width", 3).attr("stroke", "#a3a3a2");
    }
  }, {
    key: "drawOptionalityZero",
    value: function drawOptionalityZero(g) {
      var _this5 = this;
      var filter = function filter() {
        var ports = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        return ports.filter(function (d) {
          return d.optionality === 0;
        });
      };
      var optionalities = g.selectAll('circle.optionality').data(function (d) {
        return filter(d._ports);
      }, function (d) {
        return d._id;
      });
      optionalities.each(function (d) {
        var from = d.line.from;
        var to = d.line.to;
        d.line_circle = _this5.calCircle(from, to);
      }).attr("cx", function (d) {
        return d.line_circle.x;
      }).attr("cy", function (d) {
        return d.line_circle.y;
      }).attr("r", 5).attr("fill", "#fefefe").attr("stroke-width", 3).attr("stroke", "#a3a3a2");
      optionalities.enter().each(function (d) {
        var from = d.line.from;
        var to = d.line.to;
        d.line_circle = _this5.calCircle(from, to);
      }).append("circle").classed("optionality", true).attr("cx", function (d) {
        return d.line_circle.x;
      }).attr("cy", function (d) {
        return d.line_circle.y;
      }).attr("r", 5).attr("fill", "#fefefe").attr("stroke-width", 3).attr("stroke", "#a3a3a2");
    }
  }, {
    key: "drawOptionality",
    value: function drawOptionality(g) {
      // E1のインスタンス1つに対応する、E2のインスタンスの最小数
      this.drawOptionalityOne(g);
      this.drawOptionalityZero(g);
    }
    /* **************************************************************** *
     *  draw
     * **************************************************************** */
  }, {
    key: "draw",
    value: function draw(g) {
      this.drawLine(g);
      this.drawCardinality(g);
      this.drawOptionality(g);
    }
  }]);
  return Port;
}(_Port["default"]);