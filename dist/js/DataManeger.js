"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Relashonship = _interopRequireDefault(require("./Relashonship"));

var _Pool = _interopRequireDefault(require("./Pool"));

var _Entity = _interopRequireDefault(require("./Entity"));

var _Port = _interopRequireDefault(require("./Port"));

var _ColumnInstance = _interopRequireDefault(require("./ColumnInstance.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DataManeger = /*#__PURE__*/function () {
  function DataManeger() {
    _classCallCheck(this, DataManeger);

    this.table = new _Entity["default"]();
    this.port = new _Port["default"]();
    this.column_instance = new _ColumnInstance["default"]();
    this.relashonship = new _Relashonship["default"]();
  }

  _createClass(DataManeger, [{
    key: "injectTable2ColumnInstances",
    value: function injectTable2ColumnInstances(tables, column_instances, relashonships) {
      var table_ht = tables.ht;

      var _loop = function _loop() {
        var column_instance = column_instances.list[i];
        var to_ht = relashonships.to[column_instance._id];

        for (k in to_ht) {
          if (to_ht[k].from_class === 'TABLE') {
            column_instance._table = to_ht[k];
            var from_id = to_ht[k].from_id;
            column_instance._table = table_ht[from_id];
            var table = table_ht[k];
            if (!table._column_instances) table._column_instances = [];

            var position = table._column_instances.findIndex(function (d) {
              return d._id === column_instance._id;
            });

            if (position === -1) table._column_instances.push(column_instance);else table._column_instances.splice(position, 1, column_instance);
          }
        }
      };

      for (var i in column_instances.list) {
        var k;

        _loop();
      }
    }
  }, {
    key: "injectColumnInstances2Ports",
    value: function injectColumnInstances2Ports(column_instances, ports, relashonships) {
      var column_instances_ht = column_instances.ht;

      for (var i in ports.list) {
        var port = ports.list[i];
        var to_ht = relashonships.to[port._id];

        for (var k in to_ht) {
          if (to_ht[k].from_class === 'COLUMN-INSTANCE') {
            var from_id = to_ht[k].from_id;
            port._column_instance = column_instances_ht[from_id];
            if (!port._column_instance._table._ports) port._column_instance._table._ports = [];

            port._column_instance._table._ports.push(port);
          }
        }
      }
    }
    /* **************************************************************** *
     *  Respons data 2 Graph data
     * **************************************************************** */

  }, {
    key: "buildEdges",
    value: function buildEdges(relashonships, ports) {
      var ports_ht = ports.ht;
      var out = [];
      var edge = this.relashonship;

      var _iterator = _createForOfIteratorHelper(relashonships.list),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var r = _step.value;
          if (!edge.checkClassOfFromTo(r)) continue;
          edge.injectPortAndTable(r, ports_ht);
          out.push(r);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return new _Pool["default"]().list2pool(out);
    }
  }, {
    key: "buldData",
    value: function buldData(response) {
      var relashonships = this.relashonship.build(response.RELASHONSHIPS);
      var tables = this.table.build(response.TABLES);
      var column_instances = this.column_instance.build(response.COLUMN_INSTANCES);
      var ports = this.port.build(response.PORTS);
      this.injectTable2ColumnInstances(tables, column_instances, relashonships);
      this.injectColumnInstances2Ports(column_instances, ports, relashonships);
      var edges = this.buildEdges(relashonships, ports);
      return {
        columns: new _Pool["default"]().list2pool(response.COLUMNS),
        tables: tables,
        column_instances: column_instances,
        ports: ports,
        relashonships: relashonships,
        edges: edges
      };
    }
    /* **************************************************************** *
     *  Import Data (未実装)
     * **************************************************************** */

  }, {
    key: "import2Data",
    value: function import2Data(import_data) {}
  }]);

  return DataManeger;
}();

exports["default"] = DataManeger;