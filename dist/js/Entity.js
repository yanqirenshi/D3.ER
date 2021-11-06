"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var d3 = _interopRequireWildcard(require("d3"));

var _Pool = _interopRequireDefault(require("./Pool"));

var _Column = _interopRequireDefault(require("./Column.js"));

var _Port = _interopRequireDefault(require("./Port.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Entity = /*#__PURE__*/function () {
  function Entity(options) {
    _classCallCheck(this, Entity);

    this._place = null;
    this._padding = 11;
    this._values = {};
    this._callbacks = {};
    this._Column = null;
    this.port = new _Port["default"]();
    this.pool = new _Pool["default"]();
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
     *  Data manegement
     * **************************************************************** */

  }, {
    key: "build",
    value: function build(list) {
      return this.pool.list2pool(list);
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
    } /// base

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
     *  Draw ※これはインスタンスメソッドより、クラスメソッド的な。
     * **************************************************************** */

  }, {
    key: "removeGAll",
    value: function removeGAll(svg) {
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
}();

exports["default"] = Entity;