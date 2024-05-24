"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _Column = _interopRequireDefault(require("../datamodels/Column.js"));
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
var Column = exports["default"] = /*#__PURE__*/function (_DataModel) {
  _inherits(Column, _DataModel);
  var _super = _createSuper(Column);
  function Column(param) {
    var _this;
    _classCallCheck(this, Column);
    _this = _super.call(this, param);
    _this._values = param.values;
    return _this;
  }
  /**
   * @scope protected
   * */
  _createClass(Column, [{
    key: "sortColumns",
    value: function sortColumns(data) {
      var ids = [];
      var attributes = [];
      var timestamps = [];
      var others = [];
      for (var i in data) {
        if (data[i].column_type === 'ID') ids.push(data[i]);else if (data[i].column_type === 'ATTRIBUTE') attributes.push(data[i]);else if (data[i].column_type === 'TIMESTAMP') timestamps.push(data[i]);else others.push(data[i]);
      }
      var sorter = function sorter(a, b) {
        return a._id - b._id;
      };
      ids = ids.sort(sorter);
      attributes = attributes.sort(sorter);
      timestamps = timestamps.sort(sorter);
      others = others.sort(sorter);
      return [].concat(ids, attributes, timestamps, others);
    }
    /**
     * @scope public
     * */
  }, {
    key: "draw",
    value: function draw(g, table, callback) {
      var _this2 = this;
      var padding = this._padding;
      g.append('rect').attr('class', 'columns').attr('x', function (d) {
        return padding;
      }).attr('y', function (d) {
        return table.headerHight(d);
      }).attr('width', function (d) {
        return _this2.columnsWidth(d);
      }).attr('height', function (d) {
        return _this2.columnsContentsHeight(d);
      }).attr('fill', '#fefefe');
      var resize_tables = table.resize_tables;
      g.selectAll('text.column').data(function (d) {
        return _this2.sortColumns(d._column_instances);
      }).enter().append('text').attr('class', 'column').attr('x', function (d) {
        d.x = padding + 6;
        return d.x;
      }).attr('y', function (d, i) {
        d.y = table.headerHight(d.table) + (i + 1) * 22;
        return d.y;
      }).attr('font-size', 16 + 'px').attr('height', function (d) {
        d.h = _this2.columnHeight();
        return d.h;
      }).text(function (d) {
        var type = _this2._values.table.columns.column;
        if (type === 'physical_name' && d.physical_name) return d.physical_name;
        return d.logical_name;
      }).each(function (d) {
        // table ごとの max を算出
        var w = Math.ceil(this.getBBox().width) + padding * 4;
        var table = d._table;
        if (!resize_tables[table._id]) resize_tables[table._id] = {
          table: table,
          max_w: 0
        };
        if (resize_tables[table._id].max_w < w) resize_tables[table._id].max_w = w;
      }).on("click", function (d) {
        if (callback.click) callback.click(d);
      }).on("dblclick", function (d) {
        if (callback.dblclick) callback.dblclick(d);
      });
    }
    /**
     * @scope public
     * */
  }, {
    key: "resize",
    value: function resize(g, table) {
      g.selectAll('rect.columns').filter(function (d) {
        return d._id === table._id;
      }).attr('width', function (d) {
        return d.w - 22;
      });
    }
  }]);
  return Column;
}(_Column["default"]);