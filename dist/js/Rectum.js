"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _assh0le = require("@yanqirenshi/assh0le");

var _DataManeger = _interopRequireDefault(require("./DataManeger.js"));

var _Entity = _interopRequireDefault(require("./Entity"));

var _Relashonship = _interopRequireDefault(require("./Relashonship"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Rectum = /*#__PURE__*/function (_Colon) {
  _inherits(Rectum, _Colon);

  var _super = _createSuper(Rectum);

  function Rectum(params) {
    var _this;

    _classCallCheck(this, Rectum);

    _this = _super.call(this, {
      layers: [{
        id: 1,
        code: 'background'
      }, {
        id: 2,
        code: 'relationships'
      }, {
        id: 3,
        code: 'entities'
      }, {
        id: 4,
        code: 'foreground'
      }]
    });
    _this.erdm = new _DataManeger["default"]();
    _this.relashonship = new _Relashonship["default"]();
    _this._table = null;
    _this._values = _this.initValues(params);
    _this._callbacks = _this.initCallbacks(params);
    return _this;
  }

  _createClass(Rectum, [{
    key: "initValues",
    value: function initValues(options) {
      var default_values = {
        table: {
          columns: {
            column: {
              value: 'logical_name' // 'physical_name'

            }
          }
        }
      };
      if (!options || !options.values) return default_values;
      return Object.assign({}, options.values);
    }
  }, {
    key: "initCallbacks",
    value: function initCallbacks(options) {
      var _this2 = this;

      var default_callbacks = {
        table: {
          move: function move(table) {
            var layer = _this2.layer('relationships');

            _this2.relashonship.moveEdges(layer, table._edges || []);
          },
          move_end: function move_end(d) {},
          resize: function resize(table) {},
          header: {
            click: function click(d) {
              console.log('Click header.');
            }
          },
          columns: {
            click: function click(d) {
              console.log('Click column.');
            }
          }
        }
      };
      if (!options || !options.callbacks) return default_callbacks;
      return options.callbacks;
    }
    /* ******** */

    /*  Getter  */

    /* ******** */

  }, {
    key: "entity",
    value: function entity(v) {
      if (arguments.length > 0) this._table = v;
      return this._table;
    }
    /* ******** */

    /*  Draw    */

    /* ******** */

  }, {
    key: "drawEdges",
    value: function drawEdges(state) {
      var layer = this.layer('relationships');
      var edges = state.edges.list;
      this.relashonship.draw(layer, edges);
    }
  }, {
    key: "moveEdges",
    value: function moveEdges(entities) {
      var layer = this.layer('relationships');
      var edges = [[]].concat(entities).reduce(function (a, b) {
        return b._edges ? a.concat(b._edges) : a;
      });
      this.relashonship.moveEdges(layer, edges);
    }
  }, {
    key: "drawEntities",
    value: function drawEntities(state) {
      var layer = this.layer('entities');
      var entity = this.entity();
      if (!entity) entity = this.entity(new _Entity["default"]({
        place: layer,
        values: this._values,
        callbacks: this._callbacks.table
      }));
      var tables = state.tables.list;
      entity.draw(layer, tables);
      return tables;
    } // TODO: 不要

  }, {
    key: "setting",
    value: function setting() {}
  }, {
    key: "draw",
    value: function draw() {
      var data = this.data();
      var entities = this.drawEntities(data);
      this.drawEdges(data);
      this.moveEdges(entities);
    }
    /* ******** */

    /*  Data    */

    /* ******** */

  }, {
    key: "data",
    value: function data(_data) {
      if (arguments.length === 0) return _get(_getPrototypeOf(Rectum.prototype), "data", this).call(this);
      return _get(_getPrototypeOf(Rectum.prototype), "data", this).call(this, this.erdm.buldData(_data));
    }
  }]);

  return Rectum;
}(_assh0le.Colon);

exports["default"] = Rectum;