import Pool from './Pool';

import Geometry from './Geometry';

export default class Port {
    constructor () {
        this.pool = new Pool();
        this.geometry = new Geometry();
    }
    /* **************************************************************** *
     *  Data manegement
     * **************************************************************** */
    build (list) {
        return this.pool.list2pool(list);
    }
    /* **************************************************************** *
     *  Draw
     * **************************************************************** */
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
    calX (d) {
        let column_instance = d._column_instance;

        if (d._class==='PORT-ER-OUT')
            d.x = column_instance.x + column_instance._table.w;
        else
            d.x = column_instance.x * -1;

        return d.x;
    }
    calY (d) {
        let column_instance = d._column_instance;

        d.y = column_instance.y + (column_instance.h/2) - 16;

        return d.y;
    }
    draw (g) {
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
}
