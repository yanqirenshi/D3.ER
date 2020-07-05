import D3Svg from '@yanqirenshi/d3.svg';

import Er from './Er.js';

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

        return this;
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
    draw (entities) {
        const state = {...entities};

        new Er().drawTables(this.getSvg(), state);
    }
    /* ******** */
    /*  Data    */
    /* ******** */
    entities (data) {
        let state = {};

        return new Er().responseNode2Data(data, state);
    }
    relationships (data, ports) {
        return new Er().responseEdge2Data(data, ports);
    }
    data (data) {
        if (arguments.length===0)
            return {
                entities: [],
                relationships: [],
            };

        let entities = this.entities(data.entities);
        let edges = this.relationships(entities.relashonships,
                                       entities.ports);

        entities.edges = edges;

        this.draw(entities);

        return this;
    }
    data_bk (data) {
        if (arguments.length===0)
            return this._nodes.list;

        this.importNodes(data.nodes);
        this.importEdges(data.edges);

        this.makePorts(this._edges.list);

        // fitting ports
        for (let port of this._ports.list)
            this.fittingPort(port);

        // fitting edges
        for (let edge of this._edges.list)
            this.fittingEdge(edge);

        this.draw();

        return this;
    }
}
