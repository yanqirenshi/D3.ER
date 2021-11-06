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

var Column = /*#__PURE__*/function () {
  function Column(param) {
    _classCallCheck(this, Column);

    this._padding = param.padding ? param.padding : 0;
    this._values = param.values;
    this.pool = new _Pool["default"]();
  }
  /* **************************************************************** *
   *  Data manegement
   * **************************************************************** */


  _createClass(Column, [{
    key: "build",
    value: function build(list) {
      return new _Pool["default"]().list2poolWithIndex(list);
    }
    /* **************************************************************** *
     *  Draw
     * **************************************************************** */

  }, {
    key: "columnsWidth",
    value: function columnsWidth(d) {
      var padding = this._padding;
      return d.w - padding * 2;
    }
  }, {
    key: "columnHeight",
    value: function columnHeight() {
      return 22;
    }
  }, {
    key: "columnsContentsHeight",
    value: function columnsContentsHeight(d) {
      var column_height = this.columnHeight();
      var column_len = d._column_instances.length;
      var contents_h = column_height * (column_len === 0 ? 1 : column_len); // let padding = this._padding;

      return contents_h;
    }
  }, {
    key: "columnsHeight",
    value: function columnsHeight(d) {
      var padding_top = 3;
      var padding_bottm = this._padding;
      return this.columnsContentsHeight(d) + padding_top + padding_bottm;
    }
  }, {
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
  }, {
    key: "draw",
    value: function draw(g, table, callback) {
      var _this = this;

      var padding = this._padding;
      g.append('rect').attr('class', 'columns').attr('x', function (d) {
        return padding;
      }).attr('y', function (d) {
        return table.headerHight(d);
      }).attr('width', function (d) {
        return _this.columnsWidth(d);
      }).attr('height', function (d) {
        return _this.columnsContentsHeight(d);
      }).attr('fill', '#fefefe');
      var resize_tables = table.resize_tables;
      g.selectAll('text.column').data(function (d) {
        return _this.sortColumns(d._column_instances);
      }).enter().append('text').attr('class', 'column').attr('x', function (d) {
        d.x = padding + 6;
        return d.x;
      }).attr('y', function (d, i) {
        d.y = table.headerHight(d.table) + (i + 1) * 22;
        return d.y;
      }).attr('font-size', 16 + 'px').attr('height', function (d) {
        d.h = _this.columnHeight();
        return d.h;
      }).text(function (d) {
        var type = _this._values.table.columns.column;
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
}();

exports["default"] = Column;