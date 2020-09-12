import * as d3 from 'd3';

import Pool from './Pool';

import Column from './Column.js';
import Port from './Port.js';

export default class Entity {
    constructor(options) {
        this._place = null;
        this._padding = 11;

        this._values    = {};
        this._callbacks = {};

        this._Column = null;

        this.port = new Port();

        this.pool = new Pool();

        if (options)
            this.init(options);
    }
    init (options) {
        this._place = options.place;

        this._values    = options.values;
        this._callbacks = options.callbacks;

        this.column = new Column({
            padding: this._padding,
            values:  this._values,
        });
    }
    /* **************************************************************** *
     *  util
     * **************************************************************** */
    getCallbak (keys_str) {
        if (!this._callbacks || !keys_str)
            return null;

        let keys = keys_str.split('.');
        let callbacks = this._callbacks;

        for (let key of keys) {
            let val = callbacks[key];
            if (typeof val == "function")
                return val;
            callbacks = val;
        }
        return null;
    }
    callCallbak (thisArg, keys_str) {
        let args_arr = Array.prototype.slice.call(arguments);
        let argsArray = args_arr.slice(2);

        let callback = this.getCallbak(keys_str);
        if (!callback)
            return;

        callback.apply(thisArg, argsArray);
    }
    /* **************************************************************** *
     *  Data manegement
     * **************************************************************** */
    build (list) {
        return this.pool.list2pool(list);
    }
    /* **************************************************************** *
     *  Sizing
     * **************************************************************** */
    headerWidth (d) {
        let padding = this._padding;
        return d.w - padding * 2;
    }
    headerContentsHight (d) {
        return 22;
    }
    headerHight (d) {
        let padding_top = this._padding;
        let padding_bottm = 3;
        return 22 + padding_top + padding_bottm;
    }
    /// base
    baseHeight (d) {
        return this.headerHight(d) + this.column.columnsHeight(d);
    }
    /* **************************************************************** *
     *  Positioning
     * **************************************************************** */
    ///
    /// 未実装
    ///
    /* **************************************************************** *
     *  Draw ※これはインスタンスメソッドより、クラスメソッド的な。
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

            }).on("click", (d) => {
                this.callCallbak(this, 'header.click', d);

                d3.event.stopPropagation();
            }).on("dblclick", (d) => {
                d3.event.stopPropagation();
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
                  .on("start", (d) => { this.moveEntityStart(d); })
                  .on("drag",  (d) => { this.moveEntity(d); })
                  .on("end",   (d) => { this.moveEntityEnd(d); }));
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
            click: (d) => {
                this.callCallbak(this, 'columns.click', d);
                d3.event.stopPropagation();
            },
            dblclick: (d) => {
                d3.event.stopPropagation();
            }
        });

        this.drawHeader(g);

        this.resize(g);

        this.port.draw(g);
    }
    /* **************************************************************** *
     *  Drag & Drop
     * **************************************************************** */
    moveEntityStart (table) {
        table.drag = {
            start: {x: table.x, y:table.y}
        };
    }
    moveEntity (table) {
        table.x = Math.floor(table.x + d3.event.dx);
        table.y = Math.floor(table.y + d3.event.dy);
        this.move([table]);
    }
    moveEntityEnd (table) {
        this.callCallbak(this, 'move.end', table);
        delete table.drag;
    }
}
