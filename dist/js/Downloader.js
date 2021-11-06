"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Downloader = /*#__PURE__*/function () {
  function Downloader() {
    _classCallCheck(this, Downloader);
  }

  _createClass(Downloader, [{
    key: "stateER2Json",
    value: function stateER2Json(state) {
      var out = {};
      out.tables = state.tables.list.map(function (obj) {
        var new_data = Object.assign({}, obj);
        delete new_data._column_instances;
        delete new_data._edges;
        delete new_data._ports;
        return new_data;
      });
      out.columns = state.columns.list.slice();
      out.cameras = state.cameras.slice();
      out.column_instances = state.column_instances.list.map(function (obj) {
        var new_data = Object.assign({}, obj);
        delete new_data._table;
        return new_data;
      });
      out.ports = state.ports.list.map(function (obj) {
        var new_data = Object.assign({}, obj);
        delete new_data._column_instance;
        return new_data;
      });
      out.relashonships = state.relashonships.list.map(function (obj) {
        var new_data = Object.assign({}, obj);
        delete new_data._port_from;
        delete new_data._port_to;
        return new_data;
      });
      out.edges = state.edges.list.map(function (obj) {
        var new_data = Object.assign({}, obj);
        delete new_data._port_from;
        delete new_data._port_to;
        return new_data;
      });
      return JSON.stringify(out, null, 3);
    }
  }, {
    key: "downloadJson",
    value: function downloadJson(name, json) {
      var blob = new Blob([json], {
        type: 'application/json'
      });
      var a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.target = '_blank';
      a.download = name + '.' + (0, _moment["default"])().format('YYYYMMDDHHmmssZZ') + '.json';
      a.click();
    }
  }]);

  return Downloader;
}();

exports["default"] = Downloader;