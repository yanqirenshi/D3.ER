"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Pool = _interopRequireDefault(require("./Pool"));

var d3 = _interopRequireWildcard(require("d3"));

var _Geometry = _interopRequireDefault(require("./Geometry"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Port = /*#__PURE__*/function () {
  function Port() {
    _classCallCheck(this, Port);

    this.pool = new _Pool["default"]();
    this.geometry = new _Geometry["default"]();
  }
  /* **************************************************************** *
   *  Data manegement
   * **************************************************************** */


  _createClass(Port, [{
    key: "build",
    value: function build(list) {
      return this.pool.list2pool(list, function (d) {
        if (!d.cardinality) d.cardinality = 1;else if (d.cardinality !== 1 && d.cardinality !== 3) throw new Error('Not supported yet. cardinality=' + d.cardinality);
        if (!d.optionality && d.optionality !== 0) d.optionality = 1;else if (d.optionality !== 1 && d.optionality !== 0) throw new Error('Not supported yet. optionality=' + d.optionality);
        return d;
      });
    }
    /* **************************************************************** *
     *  Draw
     * **************************************************************** */

  }, {
    key: "calLinePoints",
    value: function calLinePoints(port) {
      var table = port._column_instance._table;
      var rect = {
        position: {
          x: table.x,
          y: table.y
        },
        size: {
          w: table.w,
          h: table.h
        }
      };
      var geometry = this.geometry;
      var four_side_lines = geometry.getFourSideLines(rect);
      var line_port = geometry.getPortLine(port, rect);
      var cross_point = geometry.getCrossPoint(four_side_lines, line_port);
      var len = 33 + 4;
      var to_point = cross_point.point;
      var from_point;

      if (cross_point.target === 'top') {
        from_point = {
          x: to_point.x,
          y: to_point.y + len
        };
      } else if (cross_point.target === 'right') {
        from_point = {
          x: to_point.x - len,
          y: to_point.y
        };
      } else if (cross_point.target === 'bottom') {
        from_point = {
          x: to_point.x,
          y: to_point.y - len
        };
      } else if (cross_point.target === 'left') {
        from_point = {
          x: to_point.x + len,
          y: to_point.y
        };
      }

      return {
        from: from_point,
        to: to_point
      };
    }
  }, {
    key: "drawLine",
    value: function drawLine(g) {
      var _this = this;

      var lines = g.selectAll('line').data(function (d) {
        return d._ports ? d._ports : [];
      }, function (d) {
        return d._id;
      }); // delete

      lines.exit().remove(); // update

      lines.each(function (d, i) {
        var line = _this.calLinePoints(d);

        d.position = line.to;
        d.line = line;
      }).attr("x1", function (d) {
        return d.line.from.x;
      }).attr("y1", function (d) {
        return d.line.from.y;
      }).attr("x2", function (d) {
        return d.line.to.x;
      }).attr("y2", function (d) {
        return d.line.to.y;
      }).attr("stroke-width", 3).attr("stroke", "#a3a3a2"); // add

      lines.enter().each(function (d, i) {
        var line = _this.calLinePoints(d);

        d.position = line.to;
        d.line = line;
      }).append("line").attr("x1", function (d) {
        return d.line.from.x;
      }).attr("y1", function (d) {
        return d.line.from.y;
      }).attr("x2", function (d) {
        return d.line.to.x;
      }).attr("y2", function (d) {
        return d.line.to.y;
      }).attr("stroke-width", 3).attr("stroke", "#a3a3a2");
    }
  }, {
    key: "calOneLine",
    value: function calOneLine(d, distance) {
      var r = 11;

      if (d.line.from.x === d.line.to.x) {
        // 縦
        if (d.line.from.y < d.line.to.y) {
          // (2)
          return {
            from: {
              x: d.line.from.x + r,
              y: d.line.from.y + distance
            },
            to: {
              x: d.line.from.x - r,
              y: d.line.from.y + distance
            }
          };
        } else if (d.line.from.y > d.line.to.y) {
          // (1)
          return {
            from: {
              x: d.line.from.x + r,
              y: d.line.from.y - distance
            },
            to: {
              x: d.line.from.x - r,
              y: d.line.from.y - distance
            }
          };
        }
      } else if (d.line.from.y === d.line.to.y) {
        // 横
        if (d.line.from.x < d.line.to.x) {
          // (2)
          return {
            from: {
              x: d.line.from.x + distance,
              y: d.line.from.y + r
            },
            to: {
              x: d.line.from.x + distance,
              y: d.line.from.y - r
            }
          };
        } else if (d.line.from.x > d.line.to.x) {
          // (1)
          return {
            from: {
              x: d.line.from.x - distance,
              y: d.line.from.y + r
            },
            to: {
              x: d.line.from.x - distance,
              y: d.line.from.y - r
            }
          };
        }
      }

      return {
        from: {
          x: 0,
          y: 0
        },
        to: {
          x: 0,
          y: 0
        }
      };
    }
  }, {
    key: "calThreeLine",
    value: function calThreeLine(d, distance) {
      if (d.line.from.x === d.line.to.x) {
        // 縦
        if (d.line.from.y < d.line.to.y) {
          return [[d.line.from.x - distance, d.line.from.y], [d.line.from.x, d.line.from.y + distance], [d.line.from.x + distance, d.line.from.y]];
        } else if (d.line.from.y > d.line.to.y) {
          return [[d.line.from.x - distance, d.line.from.y], [d.line.from.x, d.line.from.y - distance], [d.line.from.x + distance, d.line.from.y]];
        }
      } else if (d.line.from.y === d.line.to.y) {
        // 横
        if (d.line.from.x < d.line.to.x) {
          return [[d.line.from.x, d.line.from.y - distance], [d.line.from.x + distance, d.line.from.y], [d.line.from.x, d.line.from.y + distance]];
        } else if (d.line.from.x > d.line.to.x) {
          return [[d.line.from.x, d.line.from.y - distance], [d.line.from.x - distance, d.line.from.y], [d.line.from.x, d.line.from.y + distance]];
        }
      }

      return {
        from: {
          x: 0,
          y: 0
        },
        to: {
          x: 0,
          y: 0
        }
      };
    }
  }, {
    key: "calCircle",
    value: function calCircle(d) {
      var distance = 22;

      if (d.line.from.x === d.line.to.x) {
        // 縦
        if (d.line.from.y < d.line.to.y) {
          // (2)
          return {
            x: d.line.from.x,
            y: d.line.from.y + distance
          };
        } else if (d.line.from.y > d.line.to.y) {
          // (1)
          return {
            x: d.line.from.x,
            y: d.line.from.y - distance
          };
        }
      } else if (d.line.from.y === d.line.to.y) {
        // 横
        if (d.line.from.x < d.line.to.x) {
          // (2)
          return {
            x: d.line.from.x + distance,
            y: d.line.from.y
          };
        } else if (d.line.from.x > d.line.to.x) {
          // (1)
          return {
            x: d.line.from.x - distance,
            y: d.line.from.y
          };
        }
      }

      return {
        x: 0,
        y: 0
      };
    }
  }, {
    key: "drawCardinalityOne",
    value: function drawCardinalityOne(g) {
      var _this2 = this;

      var filter = function filter() {
        var ports = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        return ports.filter(function (d) {
          return d.cardinality === 1;
        });
      };

      var optionalities = g.selectAll('line.cardinality').data(function (d) {
        return filter(d._ports);
      }, function (d) {
        return d._id;
      });
      optionalities.attr("x1", function (d) {
        return d.line_cardinality.from.x;
      }).attr("y1", function (d) {
        return d.line_cardinality.from.y;
      }).attr("x2", function (d) {
        return d.line_cardinality.to.x;
      }).attr("y2", function (d) {
        return d.line_cardinality.to.y;
      }).attr("stroke-width", 3).attr("stroke", "#a3a3a2");
      optionalities.enter().each(function (d) {
        return d.line_cardinality = _this2.calOneLine(d, 11);
      }).append('line').classed("cardinality", true).attr("x1", function (d) {
        return d.line_cardinality.from.x;
      }).attr("y1", function (d) {
        return d.line_cardinality.from.y;
      }).attr("x2", function (d) {
        return d.line_cardinality.to.x;
      }).attr("y2", function (d) {
        return d.line_cardinality.to.y;
      }).attr("stroke-width", 3).attr("stroke", "#a3a3a2");
    }
  }, {
    key: "drawCardinalityThree",
    value: function drawCardinalityThree(g) {
      var _this3 = this;

      var filter = function filter() {
        var ports = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        return ports.filter(function (d) {
          return d.cardinality === 3;
        });
      };

      var optionalities = g.selectAll('path.cardinality').data(function (d) {
        return filter(d._ports);
      }, function (d) {
        return d._id;
      });
      var line = d3.line().x(function (d) {
        return d[0];
      }).y(function (d) {
        return d[1];
      });
      optionalities.each(function (d) {
        return d.line_cardinality_three = _this3.calThreeLine(d, 11);
      }).attr('d', function (d) {
        return line(d.line_cardinality_three);
      }).attr("stroke-width", 3).attr("stroke", "#a3a3a2");
      optionalities.enter().each(function (d) {
        return d.line_cardinality_three = _this3.calThreeLine(d, 11);
      }).append('path').classed("cardinality", true).attr('d', function (d) {
        return line(d.line_cardinality_three);
      }).attr("fill", 'none').attr("stroke-width", 3).attr("stroke", "#a3a3a2");
    }
  }, {
    key: "drawCardinality",
    value: function drawCardinality(g) {
      // E1のインスタンス1つに対応する、E2のインスタンスの最大数
      this.drawCardinalityOne(g);
      this.drawCardinalityThree(g);
    }
  }, {
    key: "drawOptionalityOne",
    value: function drawOptionalityOne(g) {
      var _this4 = this;

      var filter = function filter() {
        var ports = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        return ports.filter(function (d) {
          return d.optionality === 1;
        });
      };

      var optionalities = g.selectAll('line.optionality').data(function (d) {
        return filter(d._ports);
      }, function (d) {
        return d._id;
      });
      optionalities.enter().each(function (d) {
        return d.line_optionality = _this4.calOneLine(d, 22);
      }).append('line').classed("optionality", true).attr("x1", function (d) {
        return d.line_optionality.from.x;
      }).attr("y1", function (d) {
        return d.line_optionality.from.y;
      }).attr("x2", function (d) {
        return d.line_optionality.to.x;
      }).attr("y2", function (d) {
        return d.line_optionality.to.y;
      }).attr("stroke-width", 3).attr("stroke", "#a3a3a2");
    }
  }, {
    key: "drawOptionalityZero",
    value: function drawOptionalityZero(g) {
      var _this5 = this;

      var filter = function filter() {
        var ports = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        return ports.filter(function (d) {
          return d.optionality === 0;
        });
      };

      var optionalities = g.selectAll('circle.optionality').data(function (d) {
        return filter(d._ports);
      }, function (d) {
        return d._id;
      });
      optionalities.each(function (d) {
        return d.line_circle = _this5.calCircle(d);
      }).attr("cx", function (d) {
        return d.line_circle.x;
      }).attr("cy", function (d) {
        return d.line_circle.y;
      }).attr("r", 5).attr("fill", "#fefefe").attr("stroke-width", 3).attr("stroke", "#a3a3a2");
      optionalities.enter().each(function (d) {
        return d.line_circle = _this5.calCircle(d);
      }).append("circle").classed("optionality", true).attr("cx", function (d) {
        return d.line_circle.x;
      }).attr("cy", function (d) {
        return d.line_circle.y;
      }).attr("r", 5).attr("fill", "#fefefe").attr("stroke-width", 3).attr("stroke", "#a3a3a2");
    }
  }, {
    key: "drawOptionality",
    value: function drawOptionality(g) {
      // E1のインスタンス1つに対応する、E2のインスタンスの最小数
      this.drawOptionalityOne(g);
      this.drawOptionalityZero(g);
    }
  }, {
    key: "draw",
    value: function draw(g) {
      this.drawLine(g);
      this.drawCardinality(g);
      this.drawOptionality(g);
    }
  }]);

  return Port;
}();

exports["default"] = Port;