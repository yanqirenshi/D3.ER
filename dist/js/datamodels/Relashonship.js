"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _Pool = _interopRequireDefault(require("../Pool"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Relashonship = exports["default"] = /*#__PURE__*/function () {
  function Relashonship() {
    _classCallCheck(this, Relashonship);
    this.pool = new _Pool["default"]();
  }
  _createClass(Relashonship, [{
    key: "checkClassOfFromTo",
    value: function checkClassOfFromTo(r) {
      return (r.from_class === 'PORT-ER-OUT' || r.from_class === 'PORT-ER-IN') && (r.to_class === 'PORT-ER-OUT' || r.to_class === 'PORT-ER-IN');
    }
    /** *************************************************************** *
     *
     *  injectPortAndTable
     *
     * **************************************************************** */
  }, {
    key: "injectPortAndTable",
    value: function injectPortAndTable(r, ports) {
      // from
      var port_from = ports[r.from_id];
      r._port_from = port_from;
      var table_from = port_from._column_instance._table;
      if (!table_from._edges) table_from._edges = [];
      table_from._edges.push(r);

      // to
      var port_to = ports[r.to_id];
      r._port_to = port_to;
      var table_to = port_to._column_instance._table;
      if (!table_to._edges) table_to._edges = [];
      table_to._edges.push(r);
    }
    /* **************************************************************** *
     *  Data manegement
     * **************************************************************** */
  }, {
    key: "build",
    value: function build(list) {
      return this.pool.list2poolWithIndex(list);
    }
  }]);
  return Relashonship;
}();