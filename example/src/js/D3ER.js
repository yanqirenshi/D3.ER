import D3Svg from '@yanqirenshi/d3.svg';

import DataManeger from './DataManeger.js';

import Table from './Table.js';
import Edge  from './Edge.js';

export default class D3ER {
    constructor () {
        this.selector = null;
        this.w = 0;
        this.h = 0;
        this.look = { at: { x:0, y:0 }, };
        this.scale = 1;

        this._d3svg = null;
        this._layerForeground = null;
        this._layerBackground = null;
    }
    init (params) {
        this.selector = params.svg.selector;
        this.w = params.svg.w || 0;
        this.h = params.svg.h || 0;
        this.look = params.svg.look || { at: { x:0, y:0 }, };
        this.scale = params.svg.scale || 1;

        // const svg = this.getSvgElement();

        this._table = null;

        this._values    = this.initValues(params);
        this._callbacks = this.initCallbacks(params);

        return this;
    }
    initValues (options) {
        let default_values = {
            table: {
                columns: {
                    column: {
                        value: 'logical_name', // 'physical_name'
                    }
                },
            },
        };

        if (!options || !options.values)
            return default_values;

        return Object.assign({}, options.values);
    }
    initCallbacks (options) {
        let default_callbacks = {
            table: {
                move: {
                    end: (d) => {}
                },
                resize: (table) => {},
                header: {
                    click: (d) => {}
                },
                columns: {
                    click: (d) => {}
                },
            }
        };

        if (!options || !options.callbacks)
            return default_callbacks;

        return options.callbacks;
    }
    /* ******** */
    /*  SVG     */
    /* ******** */
    makeSvg () {
        let d3svg = new D3Svg();

        d3svg.init({
            d3_element: this.selector,
            w:     this.w,
            h:     this.h,
            look:  this.look,
            scale: this.scale,
        });

        return d3svg;
    }
    getSvg () {
        if (this._d3svg)
            return this._d3svg;

        this._d3svg = this.makeSvg();

        this.makeLayers();

        return this._d3svg;
    }
    getSvgElement () {
        return this.getSvg().d3Element();
    }
    /* ******** */
    /*  Layers  */
    /* ******** */
    makeLayers () {
        const layers = [
            { id: 1, name: 'background' },
            { id: 2, name: 'foreground' },
        ];

        this.getSvgElement()
            .selectAll('g.layer')
            .data(layers, (d) => { return d.id; })
            .enter()
            .append('g')
            .attr('class', (d) => {
                return 'layer ' + d.name;
            });
    }
    getLayerForeground () {
        if (this._layerForeground)
            return this._layerForeground;

        let svg = this.getSvgElement();

        this._layerForeground = svg.select('g.layer.foreground');

        return this._layerForeground;
    }
    getLayerBackground () {
        if (this._layerBackground)
            return this._layerBackground;

        let svg = this.getSvgElement();

        this._layerBackground = svg.select('g.layer.background');

        return this._layerBackground;
    }
    /* ******** */
    /*  Draw    */
    /* ******** */
    drawEdges (state) {
        let svg = this.getSvgElement();

        this._Edge = new Edge();
        this._Edge.draw(svg, state.edges.list);
    }
    moveEdges (tables) {
        let svg = this.getSvgElement();

        this._Edge = new Edge();

        let x = ([[]].concat(tables)).reduce((a,b) => {
            return b._edges ? a.concat(b._edges) : a;
        });

        this._Edge.moveEdges(svg, x);
    }
    drawTables (d3svg, state) {
        if (!this._table)
            this._table = new Table({
                d3svg: this.getSvg(),
                values: this._values,
                callbacks: this._callbacks.table,
            });

        let tables = state.tables.list;
        this._table.draw(tables);

        return tables;
    }
    draw (entities) {
        let d3svg = this.getSvg();

        this.drawEdges(entities);

        let tables = this.drawTables(d3svg, entities);

        this.moveEdges(tables);

    }
    /* ******** */
    /*  Data    */
    /* ******** */
    data (data) {
        if (arguments.length===0)
            return {
                entities: [],
                relationships: [],
            };


        let erdm = new DataManeger();

        let entities = erdm.responseNode2Data(data, {});

        entities.edges = erdm.responseEdge2Data(entities.relashonships,
                                                entities.ports);

        this.draw(entities);

        return this;
    }
}
