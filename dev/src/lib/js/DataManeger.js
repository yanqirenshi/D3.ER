import Pool from './Pool';

import Entity from './painters/Entity';
import Port from './painters/Port';
import ColumnInstance from './painters/ColumnInstance.js';
import Relashonship from './painters/Relashonship';

export default class DataManeger {
    constructor () {
        this.table = new Entity();
        this.port = new Port();
        this.column_instance = new ColumnInstance();
        this.relashonship = new Relashonship();
    }
    injectTable2ColumnInstances (tables, column_instances, relashonships) {
        let table_ht = tables.ht;
        for (var i in column_instances.list) {
            let column_instance = column_instances.list[i];
            let to_ht = relashonships.to[column_instance._id];

            for (var k in to_ht)
                if (to_ht[k].from_class === 'TABLE') {
                    column_instance._table = to_ht[k];

                    let from_id = to_ht[k].from_id;
                    column_instance._table = table_ht[from_id];


                    let table = table_ht[k];
                    if (!table._column_instances)
                        table._column_instances = [];

                    const position = table._column_instances.findIndex(d => {
                        return d._id===column_instance._id;
                    });

                    if (position===-1)
                        table._column_instances.push(column_instance);
                    else
                        table._column_instances.splice(position, 1, column_instance);
                }
        }
    }
    injectColumnInstances2Ports (column_instances, ports, relashonships) {
        let column_instances_ht = column_instances.ht;
        for (var i in ports.list) {
            let port = ports.list[i];
            let to_ht = relashonships.to[port._id];

            for (var k in to_ht)
                if (to_ht[k].from_class === 'COLUMN-INSTANCE') {
                    let from_id = to_ht[k].from_id;
                    port._column_instance = column_instances_ht[from_id];

                    if (!port._column_instance._table._ports)
                        port._column_instance._table._ports = [];
                    port._column_instance._table._ports.push(port);
                }
        }
    }
    /* **************************************************************** *
     *  Respons data 2 Graph data
     * **************************************************************** */
    buildEdges (relashonships, ports) {
        let ports_ht = ports.ht;

        let out = [];

        const edge = this.relashonship;

        for (let r of relashonships.list) {
            if (!edge.checkClassOfFromTo(r))
                continue;

            edge.injectPortAndTable(r, ports_ht);

            out.push(r);
        }

        return new Pool().list2pool(out);
    }
    buldData (response) {
        const relashonships    = this.relashonship.build(response.RELASHONSHIPS);
        const tables           = this.table.build(response.TABLES);
        const column_instances = this.column_instance.build(response.COLUMN_INSTANCES);
        const ports            = this.port.build(response.PORTS);

        this.injectTable2ColumnInstances(tables, column_instances, relashonships);
        this.injectColumnInstances2Ports (column_instances, ports, relashonships);

        const edges = this.buildEdges(relashonships, ports);

        const columns = new Pool().list2pool(response.COLUMNS);

        console.log({
            columns:          columns,
            tables:           tables,
            column_instances: column_instances,
            ports:            ports,
            relashonships:    relashonships,
            edges:            edges,
        });

        return {
            columns:          columns,
            tables:           tables,
            column_instances: column_instances,
            ports:            ports,
            relashonships:    relashonships,
            edges:            edges,
        };
    }
    /* **************************************************************** *
     *  Import Data (未実装)
     * **************************************************************** */
    import2Data (import_data) {
    }
}
