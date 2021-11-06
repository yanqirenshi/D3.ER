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

var Relashonship = /*#__PURE__*/function () {
  function Relashonship() {
    _classCallCheck(this, Relashonship);

    this.pool = new _Pool["default"]();
  }
  /* **************************************************************** *
   *  Data manegement
   * **************************************************************** */


  _createClass(Relashonship, [{
    key: "build",
    value: function build(list) {
      return new _Pool["default"]().list2poolWithIndex(list);
    }
  }, {
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

      table_from._edges.push(r); // to


      var port_to = ports[r.to_id];
      r._port_to = port_to;
      var table_to = port_to._column_instance._table;
      if (!table_to._edges) table_to._edges = [];

      table_to._edges.push(r);
    } ///// ////////////////////////////////////////////////////////////////
    /////
    /////  Draw
    /////
    ///// ////////////////////////////////////////////////////////////////

  }, {
    key: "drawCore",
    value: function drawCore(selection) {
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
}();

exports["default"] = Relashonship;