import {Colon} from '@yanqirenshi/assh0le';

import DataManeger from './DataManeger.js';

import Entity from './Entity';
import Relashonship from './Relashonship';

export default class Rectum extends Colon {
    constructor (params) {
        super({
            layers: [
                { id: 1, code: 'background' },
                { id: 2, code: 'relationships' },
                { id: 3, code: 'entities' },
                { id: 4, code: 'foreground' },
            ]
        });

        this.erdm = new DataManeger();
        this.relashonship = new Relashonship();

        this._table = null;

        this._values    = this.initValues(params);
        this._callbacks = this.initCallbacks(params);
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
                    const layer = this.layer('relationships');

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
    /*  Getter  */
    /* ******** */
    entity (v) {
        if (arguments.length>0)
            this._table = v;

        return this._table;
    }
    /* ******** */
    /*  Draw    */
    /* ******** */
    drawEdges (state) {
        const layer = this.layer('relationships');

        const edges = state.edges.list;

        this.relashonship.draw(layer, edges);
    }
    moveEdges (entities) {
        const layer = this.layer('relationships');

        const edges = ([[]].concat(entities)).reduce((a,b) => {
            return b._edges ? a.concat(b._edges) : a;
        });

        this.relashonship.moveEdges(layer, edges);
    }
    drawEntities (state) {
        let layer = this.layer('entities');

        let entity = this.entity();

        if (!entity)
            entity = this.entity(
                new Entity({
                    place: layer,
                    values: this._values,
                    callbacks: this._callbacks.table,
                }));

        let tables = state.tables.list;

        entity.draw(layer, tables);

        return tables;
    }
    // TODO: 不要
    setting () {}
    draw () {
        const data = this.data();

        const entities = this.drawEntities(data);

        this.drawEdges(data);
        this.moveEdges(entities);
    }
    /* ******** */
    /*  Data    */
    /* ******** */
    data (data) {
        if (arguments.length===0)
            return super.data();

        return super.data(this.erdm.buldData(data));
    }
}
