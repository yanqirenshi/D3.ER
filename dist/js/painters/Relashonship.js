"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _Relashonship = _interopRequireDefault(require("../datamodels/Relashonship.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
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
var Relashonship = exports["default"] = /*#__PURE__*/function (_DataModel) {
  _inherits(Relashonship, _DataModel);
  var _super = _createSuper(Relashonship);
  function Relashonship() {
    _classCallCheck(this, Relashonship);
    return _super.apply(this, arguments);
  }
  _createClass(Relashonship, [{
    key: "drawCore",
    value:
    // constructor () {
    //     super();
    // }
    /* **************************************************************** *
     *  Draw
     * **************************************************************** */
    function drawCore(selection) {
      var val = function val(port, name) {
        try {
          var position = port.position;
          if (!position || !position[name]) return 0;
          return port._column_instance._table[name] + position[name];
        } catch (e) {
          return 0;
        }
      };
      selection.attr('x1', function (d) {
        return val(d._port_from, 'x');
      }).attr('y1', function (d) {
        return val(d._port_from, 'y');
      }).attr('x2', function (d) {
        return val(d._port_to, 'x');
      }).attr('y2', function (d) {
        return val(d._port_to, 'y');
      }).attr('id', function (d) {
        return d._id;
      }).attr('stroke', function (d) {
        return d.hide ? '#e0e0e0' : '#a3a3a2';
      }).attr('stroke-width', 3);
    }
  }, {
    key: "draw",
    value: function draw(svg, edges, g) {
      svg.selectAll('line.er').data(edges, function (d) {
        return d._id;
      }).exit().remove();
      var selection = svg.selectAll('line.er').data(edges, function (d) {
        return d._id;
      }).enter().append('line').attr('class', 'er');
      this.drawCore(selection);
    }
  }, {
    key: "removeEdgeAll",
    value: function removeEdgeAll(svg) {
      svg.selectAll('line.er').data([], function (d) {
        return d._id;
      }).exit().remove();
    }
  }, {
    key: "moveEdges",
    value: function moveEdges(svg, edges) {
      var val = function val(port, name) {
        try {
          var position = port.position;
          if (!position || !position[name]) return 0;
          return port._column_instance._table[name] + position[name];
        } catch (e) {
          return 0;
        }
      };
      svg.selectAll('line').data(edges, function (d) {
        return d._id;
      }).attr('x1', function (d) {
        return val(d._port_from, 'x');
      }).attr('y1', function (d) {
        return val(d._port_from, 'y');
      }).attr('x2', function (d) {
        return val(d._port_to, 'x');
      }).attr('y2', function (d) {
        return val(d._port_to, 'y');
      });
    }
  }]);
  return Relashonship;
}(_Relashonship["default"]);