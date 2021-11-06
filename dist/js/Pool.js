"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Pool = /*#__PURE__*/function () {
  function Pool() {
    _classCallCheck(this, Pool);
  }

  _createClass(Pool, [{
    key: "list2pool",
    value: function list2pool(list, builder) {
      var ht = {};

      if (builder) {
        for (var i in list) {
          var data = builder(list[i]);
          ht[data._id] = data;
        }
      } else {
        for (var _i in list) {
          var _data = list[_i];
          ht[_data._id] = _data;
        }
      }

      return {
        ht: ht,
        list: list
      };
    }
  }, {
    key: "list2poolWithIndex",
    value: function list2poolWithIndex(list) {
      var ht = {};
      var ht_from = {};
      var ht_to = {};

      for (var i in list) {
        var data = list[i];
        var _id = data._id;
        var from_id = data.from_id;
        var to_id = data.to_id; // _id

        ht[_id] = data; // from_id

        if (!ht_from[from_id]) ht_from[from_id] = {};
        ht_from[from_id][to_id] = data; // to_id

        if (!ht_to[to_id]) ht_to[to_id] = {};
        ht_to[to_id][from_id] = data;
      }

      return {
        ht: ht,
        list: list,
        from: ht_from,
        to: ht_to
      };
    }
  }]);

  return Pool;
}();

exports["default"] = Pool;