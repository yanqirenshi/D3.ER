import Pool from './Pool';
import * as d3 from 'd3';

import Geometry from './Geometry';

class DataModel {
    calLinePoints (port) {
        const table = port._column_instance._table;
        const rect = {
            position: {
                x: table.x,
                y: table.y,
            },
            size: {
                w: table.w,
                h: table.h,
            }
        };

        const geometry = this.geometry;
        const four_side_lines = geometry.getFourSideLines(rect);
        const line_port = geometry.getPortLine(port, rect);

        const cross_point = geometry.getCrossPoint(four_side_lines, line_port);

        const len = 33 + 4;
        const to_point = cross_point.point;
        let from_point;
        if (cross_point.target==='top') {
            from_point = {
                x: to_point.x,
                y: to_point.y + len,
            };
        } else if (cross_point.target==='right') {
            from_point = {
                x: to_point.x - len,
                y: to_point.y,
            };
        } else if (cross_point.target==='bottom') {
            from_point = {
                x: to_point.x,
                y: to_point.y - len,
            };
        } else if (cross_point.target==='left') {
            from_point = {
                x: to_point.x + len,
                y: to_point.y,
            };
        }

        return {
            from: from_point,
            to: to_point,
        };
    }
    calOneLine (d, distance) {
        const r = 11;

        if (d.line.from.x===d.line.to.x) {
            // 縦
            if (d.line.from.y < d.line.to.y) { // (2)
                return {
                    from: { x:d.line.from.x + r, y:d.line.from.y + distance },
                    to:   { x:d.line.from.x - r, y:d.line.from.y + distance },
                };
            } else if (d.line.from.y > d.line.to.y) { // (1)
                return {
                    from: { x:d.line.from.x + r, y:d.line.from.y - distance },
                    to:   { x:d.line.from.x - r, y:d.line.from.y - distance },
                };
            }
        } else if (d.line.from.y===d.line.to.y) {
            // 横
            if (d.line.from.x < d.line.to.x) { // (2)
                return {
                    from: { x:d.line.from.x + distance, y:d.line.from.y + r },
                    to:   { x:d.line.from.x + distance, y:d.line.from.y - r },
                };
            } else if (d.line.from.x > d.line.to.x) { // (1)
                return {
                    from: { x:d.line.from.x - distance, y:d.line.from.y + r },
                    to:   { x:d.line.from.x - distance, y:d.line.from.y - r },
                };
            }
        }

        return {
            from: { x:0, y:0 },
            to:   { x:0, y:0 },
        };
    };
    calThreeLine (d, distance) {
        if (d.line.from.x===d.line.to.x) {
            // 縦
            if (d.line.from.y < d.line.to.y) {
                return [
                    [d.line.from.x - distance, d.line.from.y],
                    [d.line.from.x,            d.line.from.y + distance],
                    [d.line.from.x + distance, d.line.from.y],
                ];
            } else if (d.line.from.y > d.line.to.y) {
                return [
                    [d.line.from.x - distance, d.line.from.y],
                    [d.line.from.x,            d.line.from.y - distance],
                    [d.line.from.x + distance, d.line.from.y],
                ];
            }
        } else if (d.line.from.y===d.line.to.y) {
            // 横
            if (d.line.from.x < d.line.to.x) {
                return [
                    [d.line.from.x,            d.line.from.y - distance],
                    [d.line.from.x + distance, d.line.from.y],
                    [d.line.from.x,            d.line.from.y + distance],
                ];
            } else if (d.line.from.x > d.line.to.x) {
                return [
                    [d.line.from.x,            d.line.from.y - distance],
                    [d.line.from.x - distance, d.line.from.y],
                    [d.line.from.x,            d.line.from.y + distance],
                ];
            }
        }

        return {
            from: { x:0, y:0 },
            to:   { x:0, y:0 },
        };
    };
    calCircle (d) {
        const distance = 22;

        if (d.line.from.x===d.line.to.x) {
            // 縦
            if (d.line.from.y < d.line.to.y) { // (2)
                return {
                    x:d.line.from.x,
                    y:d.line.from.y + distance,
                };
            } else if (d.line.from.y > d.line.to.y) { // (1)
                return {
                    x:d.line.from.x,
                    y:d.line.from.y - distance,
                };
            }
        } else if (d.line.from.y===d.line.to.y) {
            // 横
            if (d.line.from.x < d.line.to.x) { // (2)
                return {
                    x:d.line.from.x + distance,
                    y:d.line.from.y
                };
            } else if (d.line.from.x > d.line.to.x) { // (1)
                return {
                    x:d.line.from.x - distance,
                    y:d.line.from.y
                };
            }
        }

        return { x:0, y:0 };
    };
}

export default class Port extends DataModel {
    constructor () {
        super();

        this.pool = new Pool();
        this.geometry = new Geometry();
    }
    /* **************************************************************** *
     *  Data manegement
     * **************************************************************** */
    build (list) {
        return this.pool.list2pool(list, (d) => {
            if (!d.cardinality)
                d.cardinality = 1;
            else if (d.cardinality!==1 && d.cardinality!==3)
                throw new Error('Not supported yet. cardinality='+d.cardinality);

            if (!d.optionality && d.optionality!==0)
                d.optionality = 1;
            else if (d.optionality!==1 && d.optionality!==0)
                throw new Error('Not supported yet. optionality='+d.optionality);

            return d;
        });
    }
    /* **************************************************************** *
     *  Draw
     * **************************************************************** */
    drawLine (g) {
        const lines = g.selectAll('line')
              .data((d) => { return d._ports ? d._ports : []; },
                    (d) => { return d._id; });

        // delete
        lines.exit().remove();

        // update
        lines
            .each((d, i) => {
                const line = this.calLinePoints(d);

                d.position = line.to;
                d.line = line;
            })
            .attr("x1", d => d.line.from.x)
            .attr("y1", d => d.line.from.y)
            .attr("x2", d => d.line.to.x)
            .attr("y2", d => d.line.to.y)
            .attr("stroke-width",3)
            .attr("stroke","#a3a3a2");

        // add
        lines
            .enter()
            .each((d, i) => {
                const line = this.calLinePoints(d);

                d.position = line.to;
                d.line = line;
            })
            .append("line")
            .attr("x1", d => d.line.from.x)
            .attr("y1", d => d.line.from.y)
            .attr("x2", d => d.line.to.x)
            .attr("y2", d => d.line.to.y)
            .attr("stroke-width",3)
            .attr("stroke","#a3a3a2");
    }
    drawCardinalityOne (g) {
        const filter = (ports=[]) => {
            return ports.filter(d => {
                return d.cardinality===1;
            });
        };

        const optionalities = g.selectAll('line.cardinality')
              .data((d) => { return filter(d._ports); },
                    (d) => { return d._id; });

        optionalities
            .attr("x1", d => d.line_cardinality.from.x)
            .attr("y1", d => d.line_cardinality.from.y)
            .attr("x2", d => d.line_cardinality.to.x)
            .attr("y2", d => d.line_cardinality.to.y)
            .attr("stroke-width",3)
            .attr("stroke","#a3a3a2");

        optionalities
            .enter()
            .each((d) => d.line_cardinality = this.calOneLine(d, 11))
            .append('line')
            .classed( "cardinality", true )
            .attr("x1", d => d.line_cardinality.from.x)
            .attr("y1", d => d.line_cardinality.from.y)
            .attr("x2", d => d.line_cardinality.to.x)
            .attr("y2", d => d.line_cardinality.to.y)
            .attr("stroke-width",3)
            .attr("stroke","#a3a3a2");
    }
    drawCardinalityThree (g) {
        const filter = (ports=[]) => {
            return ports.filter(d => {
                return d.cardinality===3;
            });
        };

        const optionalities = g.selectAll('path.cardinality')
              .data((d) => { return filter(d._ports); },
                    (d) => { return d._id; });

        const line = d3.line()
              .x(function(d) {return d[0];})
              .y(function(d) {return d[1];});

        optionalities
            .each((d) => d.line_cardinality_three = this.calThreeLine(d, 11))
            .attr('d', d => line(d.line_cardinality_three))
            .attr("stroke-width",3)
            .attr("stroke","#a3a3a2");

        optionalities
            .enter()
            .each((d) => d.line_cardinality_three = this.calThreeLine(d, 11))
            .append('path')
            .classed( "cardinality", true )
            .attr('d', d => line(d.line_cardinality_three))
            .attr("fill", 'none')
            .attr("stroke-width",3)
            .attr("stroke","#a3a3a2");
    }
    drawCardinality (g) {
        // E1のインスタンス1つに対応する、E2のインスタンスの最大数
        this.drawCardinalityOne(g);
        this.drawCardinalityThree(g);
    }
    drawOptionalityOne (g) {
        const filter = (ports=[]) => {
            return ports.filter(d => d.optionality===1);
        };

        const optionalities = g.selectAll('line.optionality')
              .data((d) => { return filter(d._ports); },
                    (d) => { return d._id; });

        optionalities
            .enter()
            .each((d) => d.line_optionality = this.calOneLine(d, 22))
            .append('line')
            .classed( "optionality", true )
            .attr("x1", d => d.line_optionality.from.x)
            .attr("y1", d => d.line_optionality.from.y)
            .attr("x2", d => d.line_optionality.to.x)
            .attr("y2", d => d.line_optionality.to.y)
            .attr("stroke-width",3)
            .attr("stroke","#a3a3a2");
    }
    drawOptionalityZero (g) {
        const filter = (ports=[]) => {
            return ports.filter(d => d.optionality===0);
        };

        const optionalities = g.selectAll('circle.optionality')
              .data((d) => { return filter(d._ports); },
                    (d) => { return d._id; });

        optionalities
            .each((d) => d.line_circle = this.calCircle(d))
            .attr("cx", d => d.line_circle.x)
            .attr("cy", d => d.line_circle.y)
            .attr("r",5)
            .attr("fill","#fefefe")
            .attr("stroke-width",3)
            .attr("stroke","#a3a3a2");

        optionalities
            .enter()
            .each((d) => d.line_circle = this.calCircle(d))
            .append("circle")
            .classed( "optionality", true )
            .attr("cx", d => d.line_circle.x)
            .attr("cy", d => d.line_circle.y)
            .attr("r",5)
            .attr("fill","#fefefe")
            .attr("stroke-width",3)
            .attr("stroke","#a3a3a2");
    }
    drawOptionality (g) {
        // E1のインスタンス1つに対応する、E2のインスタンスの最小数
        this.drawOptionalityOne(g);
        this.drawOptionalityZero(g);
    }
    draw (g) {
        this.drawLine(g);
        this.drawCardinality(g);
        this.drawOptionality(g);
    }
}
