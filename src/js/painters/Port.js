import * as d3 from 'd3';

import DataModel from '../datamodels/Port.js';

export default class Port extends DataModel {
    // constructor () {
    //     super();
    // }
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
    /* **************************************************************** *
     *  Draw
     * **************************************************************** */
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
            .each((d) => {
                const from = d.line.from;
                const to   = d.line.to;

                d.line_cardinality = this.calOneLine(from, to, 11);
            })
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
            .each((d) => {
                const from = d.line.from;
                const to   = d.line.to;

                d.line_cardinality_three = this.calThreeLine(from, to, 11);
            })
            .attr('d', d => line(d.line_cardinality_three))
            .attr("stroke-width",3)
            .attr("stroke","#a3a3a2");

        optionalities
            .enter()
            .each((d) => {
                const from = d.line.from;
                const to   = d.line.to;

                d.line_cardinality_three = this.calThreeLine(from, to, 11);
            })
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
            .each((d) => {
                const from = d.line.from;
                const to   = d.line.to;

                d.line_optionality = this.calOneLine(from, to, 22);
            })
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
            .each((d) => {
                const from = d.line.from;
                const to   = d.line.to;

                d.line_circle = this.calCircle(from, to);
            })
            .attr("cx", d => d.line_circle.x)
            .attr("cy", d => d.line_circle.y)
            .attr("r",5)
            .attr("fill","#fefefe")
            .attr("stroke-width",3)
            .attr("stroke","#a3a3a2");

        optionalities
            .enter()
            .each((d) => {
                const from = d.line.from;
                const to   = d.line.to;

                d.line_circle = this.calCircle(from, to);
            })
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
    /* **************************************************************** *
     *  draw
     * **************************************************************** */
    draw (g) {
        this.drawLine(g);
        this.drawCardinality(g);
        this.drawOptionality(g);
    }
}
