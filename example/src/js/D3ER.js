import D3Svg from '@yanqirenshi/d3.svg';

import DataManeger from './DataManeger.js';

import Entity from './Entity';
import Relashonship from './Relashonship';

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

        this.erdm = new DataManeger();
        this.relashonship = new Relashonship();
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
                move: (table) => {
                    const layer = this.getLayerRelationships();

                    this.relashonship.moveEdges(layer, (table._edges || []));
                },
                move_end: (d) => {
                },
                resize: (table) => {},
                header: {
                    click: (d) => {
                        console.log('Click header.');
                    }
                },
                columns: {
                    click: (d) => {
                        console.log('Click column.');
                    }
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
    svgSize (w, h) {
        this.getSvg().size(w, h);
    }
    focus () {
        this.getSvg().focus();
    }
    /* ******** */
    /*  Layers  */
    /* ******** */
    makeLayers () {
        const layers = [
            { id: 1, name: 'background' },
            { id: 2, name: 'relationships' },
            { id: 3, name: 'entities' },
            { id: 4, name: 'foreground' },
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
    getLayerEntities () {
        if (this._layerEntities)
            return this._layerEntities;

        let svg = this.getSvgElement();

        this._layerEntities = svg.select('g.layer.entities');

        return this._layerEntities;
    }
    getLayerRelationships () {
        if (this._layerRelationships)
            return this._layerRelationships;

        let svg = this.getSvgElement();

        this._layerRelationships = svg.select('g.layer.relationships');

        return this._layerRelationships;
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
        let layer = this.getLayerRelationships();

        this.relashonship.draw(layer, state.edges.list);
    }
    moveEdges (entities) {
        let svg = this.getSvgElement();

        let x = ([[]].concat(entities)).reduce((a,b) => {
            return b._edges ? a.concat(b._edges) : a;
        });

        this.relashonship.moveEdges(svg, x);
    }
    drawEntitiies (d3svg, state) {
        if (!this._table)
            this._table = new Entity({
                place: this.getLayerEntities(),
                values: this._values,
                callbacks: this._callbacks.table,
            });

        let layer = this.getLayerEntities();

        let tables = state.tables.list;
        this._table.draw(layer, tables);

        return tables;
    }
    draw (graph_data) {
        let d3svg = this.getSvg();

        let entities = this.drawEntitiies(d3svg, graph_data);

        this.drawEdges(graph_data);
        this.moveEdges(entities);
    }
    /* ******** */
    /*  Data    */
    /* ******** */
    data (data) {
        if (arguments.length===0)
            return this;

        const graph_data = this.erdm.buldData(data);

        this.draw(graph_data);

        return this;
    }
}
