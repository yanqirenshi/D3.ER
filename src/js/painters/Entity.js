import * as d3 from 'd3';

import DataModel from '../datamodels/Entity.js';

export default class Entity extends DataModel {
    // constructor(options) {
    //     super(options);
    // }
    /* **************************************************************** *
     *  Draw
     * **************************************************************** */
    removeGAll (svg) {
        svg.selectAll('g.table')
            .data([], (d) => { return d._id; })
            .exit()
            .remove();
    }
    drawHeader (g) {
        let padding = this._padding;

        g.append('rect')
            .attr('class', 'header')
            .attr('x', function (d) { return padding; })
            .attr('y', function (d) { return padding; })
            .attr('width',  (d) => { return this.headerWidth(d); })
            .attr('height', (d) => { return this.headerContentsHight(d); })
            .attr('fill', '#fefefe');

        let resize_tables = this.resize_tables;

        g.append('text')
            .attr('class', 'header')
            .attr('x', function (d) { return padding + 6; })
            .attr('y', function (d) { return padding + 16; })
            .attr('font-size', 16 + 'px')
            .text((d) => { return d.name; })
            .each(function (d) {
                let w = Math.ceil(this.getBBox().width) + padding * 4;
                let table = d;

                if (!resize_tables[table._id])
                    resize_tables[table._id] = {
                        table: table,
                        max_w: 0
                    };

                if (resize_tables[table._id].max_w < w)
                    resize_tables[table._id].max_w = w;

            }).on("click", (event, d) => {
                this.callCallbak(this, 'header.click', d);

                event.stopPropagation();
            }).on("dblclick", (event, d) => {
                event.stopPropagation();
            });
    }
    drawBase (g) {
        g.append('rect')
            .attr('class', 'base')
            .attr('width', (d) => {
                return d.w;
            })
            .attr('height', (d) => {
                const h = this.baseHeight(d);

                d.h = h;

                return h;
            })
            .attr('fill', '#f8f8f8');
    }
    removeG (svg, data) {
        svg.selectAll('g.table')
            .data(data, (d) => { return d._id; })
            .exit()
            .remove();
    }
    drawG (svg, data) {
        return svg.selectAll('g.table')
            .data(data, (d) => { return d._id; })
            .enter()
            .append('g')
            .attr('class', 'table')
            .attr('transform', (d)=>{ return 'translate('+d.x+','+d.y+')'; })
            .attr('x', (d) => { return d.x; })
            .attr('y', (d) => { return d.y; })
            .call(d3.drag()
                  .on("start", (event, d) => { this.moveEntityStart(event, d); })
                  .on("drag",  (event, d) => { this.moveEntity(event, d); })
                  .on("end",   (event, d) => { this.moveEntityEnd(event, d); }));
    }
    move(tables) {
        let svg = this._place;

        svg.selectAll('g.table')
            .data(tables, (d)=>{ return d._id; })
            .attr('transform', (d)=>{
                return 'translate('+d.x+','+d.y+')';
            });

        this._callbacks.move(tables[0]);
    }
    resize (g) {
        for (var k in this.resize_tables) {
            let data = this.resize_tables[k];
            let table = data.table;
            if (table.w === data.max_w)
                continue;

            table.w = data.max_w;

            let table_selection =
                g.select('rect.base')
                .filter((d) => { return d._id===table._id; });

            this.column.resize(g, table);

            g.select('rect.header')
                .filter((d) => { return d._id===table._id; })
                .attr('width',  (d) => { return d.w - 22; });

            table_selection.attr('width', (d) => { return d.w; });

            this.callCallbak(this, 'resize', table);
        }
    }
    draw (place, data) {
        this.resize_tables = {};

        let svg = this._place;

        this.removeG(svg, data);
        let g = this.drawG(svg, data);

        this.port.draw(g);

        this.drawBase(g);

        this.column.draw(g, this, {
            click: (event, d) => {
                this.callCallbak(this, 'columns.click', d);
                event.stopPropagation();
            },
            dblclick: (event, d) => {
                event.stopPropagation();
            }
        });

        this.drawHeader(g);

        this.resize(g);

        this.port.draw(g);
    }
    /* **************************************************************** *
     *  Drag & Drop
     * **************************************************************** */
    moveEntityStart (event, table) {
        table.drag = {
            start: {x: table.x, y:table.y}
        };
    }
    moveEntity (event, table) {
        table.x = Math.floor(table.x + event.dx);
        table.y = Math.floor(table.y + event.dy);
        this.move([table]);
    }
    moveEntityEnd (event, table) {
        this.callCallbak(this, 'move.end', table);
        delete table.drag;
    }
}
