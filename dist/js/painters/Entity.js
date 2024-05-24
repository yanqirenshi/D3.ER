"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var d3 = _interopRequireWildcard(require("d3"));
var _Entity = _interopRequireDefault(require("../datamodels/Entity.js"));
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
var Entity = exports["default"] = /*#__PURE__*/function (_DataModel) {
  _inherits(Entity, _DataModel);
  var _super = _createSuper(Entity);
  function Entity() {
    _classCallCheck(this, Entity);
    return _super.apply(this, arguments);
  }
  _createClass(Entity, [{
    key: "removeGAll",
    value:
    // constructor(options) {
    //     super(options);
    // }
    /* **************************************************************** *
     *  Draw
     * **************************************************************** */
    function removeGAll(svg) {
      svg.selectAll('g.table').data([], function (d) {
        return d._id;
      }).exit().remove();
    }
  }, {
    key: "drawHeader",
    value: function drawHeader(g) {
      var _this = this;
      var padding = this._padding;
      g.append('rect').attr('class', 'header').attr('x', function (d) {
        return padding;
      }).attr('y', function (d) {
        return padding;
      }).attr('width', function (d) {
        return _this.headerWidth(d);
      }).attr('height', function (d) {
        return _this.headerContentsHight(d);
      }).attr('fill', '#fefefe');
      var resize_tables = this.resize_tables;
      g.append('text').attr('class', 'header').attr('x', function (d) {
        return padding + 6;
      }).attr('y', function (d) {
        return padding + 16;
      }).attr('font-size', 16 + 'px').text(function (d) {
        return d.name;
      }).each(function (d) {
        var w = Math.ceil(this.getBBox().width) + padding * 4;
        var table = d;
        if (!resize_tables[table._id]) resize_tables[table._id] = {
          table: table,
          max_w: 0
        };
        if (resize_tables[table._id].max_w < w) resize_tables[table._id].max_w = w;
      }).on("click", function (event, d) {
        _this.callCallbak(_this, 'header.click', d);
        event.stopPropagation();
      }).on("dblclick", function (event, d) {
        event.stopPropagation();
      });
    }
  }, {
    key: "drawBase",
    value: function drawBase(g) {
      var _this2 = this;
      g.append('rect').attr('class', 'base').attr('width', function (d) {
        return d.w;
      }).attr('height', function (d) {
        var h = _this2.baseHeight(d);
        d.h = h;
        return h;
      }).attr('fill', '#f8f8f8');
    }
  }, {
    key: "removeG",
    value: function removeG(svg, data) {
      svg.selectAll('g.table').data(data, function (d) {
        return d._id;
      }).exit().remove();
    }
  }, {
    key: "drawG",
    value: function drawG(svg, data) {
      var _this3 = this;
      return svg.selectAll('g.table').data(data, function (d) {
        return d._id;
      }).enter().append('g').attr('class', 'table').attr('transform', function (d) {
        return 'translate(' + d.x + ',' + d.y + ')';
      }).attr('x', function (d) {
        return d.x;
      }).attr('y', function (d) {
        return d.y;
      }).call(d3.drag().on("start", function (event, d) {
        _this3.moveEntityStart(event, d);
      }).on("drag", function (event, d) {
        _this3.moveEntity(event, d);
      }).on("end", function (event, d) {
        _this3.moveEntityEnd(event, d);
      }));
    }
  }, {
    key: "move",
    value: function move(tables) {
      var svg = this._place;
      svg.selectAll('g.table').data(tables, function (d) {
        return d._id;
      }).attr('transform', function (d) {
        return 'translate(' + d.x + ',' + d.y + ')';
      });
      this._callbacks.move(tables[0]);
    }
  }, {
    key: "resize",
    value: function resize(g) {
      var _this4 = this;
      var _loop = function _loop() {
        var data = _this4.resize_tables[k];
        var table = data.table;
        if (table.w === data.max_w) return "continue";
        table.w = data.max_w;
        var table_selection = g.select('rect.base').filter(function (d) {
          return d._id === table._id;
        });
        _this4.column.resize(g, table);
        g.select('rect.header').filter(function (d) {
          return d._id === table._id;
        }).attr('width', function (d) {
          return d.w - 22;
        });
        table_selection.attr('width', function (d) {
          return d.w;
        });
        _this4.callCallbak(_this4, 'resize', table);
      };
      for (var k in this.resize_tables) {
        var _ret = _loop();
        if (_ret === "continue") continue;
      }
    }
  }, {
    key: "draw",
    value: function draw(place, data) {
      var _this5 = this;
      this.resize_tables = {};
      var svg = this._place;
      this.removeG(svg, data);
      var g = this.drawG(svg, data);
      this.port.draw(g);
      this.drawBase(g);
      this.column.draw(g, this, {
        click: function click(event, d) {
          _this5.callCallbak(_this5, 'columns.click', d);
          event.stopPropagation();
        },
        dblclick: function dblclick(event, d) {
          event.stopPropagation();
        }
      });
      this.drawHeader(g);
      this.resize(g);
      this.port.draw(g);
    }
    /* **************************************************************** *
     *  Drag & Drop
     * **************************************************************** */
  }, {
    key: "moveEntityStart",
    value: function moveEntityStart(event, table) {
      table.drag = {
        start: {
          x: table.x,
          y: table.y
        }
      };
    }
  }, {
    key: "moveEntity",
    value: function moveEntity(event, table) {
      table.x = Math.floor(table.x + event.dx);
      table.y = Math.floor(table.y + event.dy);
      this.move([table]);
    }
  }, {
    key: "moveEntityEnd",
    value: function moveEntityEnd(event, table) {
      this.callCallbak(this, 'move.end', table);
      delete table.drag;
    }
  }]);
  return Entity;
}(_Entity["default"]);