import Edge from './Edge';

export default class DataManeger {
    constructor () {
        this.edge = new Edge();
    }
    list2pool (list) {
        let ht = {};
        for (var i in list) {
            let data = list[i];
            ht[data._id] = data;
        }
        return {ht: ht, list: list};
    }
    list2poolWithIndex (list) {
        let ht = {};
        let ht_from = {};
        let ht_to = {};

        for (var i in list) {
            let data = list[i];
            let _id = data._id;

            let from_id = data.from_id;
            let to_id = data.to_id;

            // _id
            ht[_id] = data;

            // from_id
            if (!ht_from[from_id])
                ht_from[from_id] = {};
            ht_from[from_id][to_id] = data;

            // to_id
            if (!ht_to[to_id])
                ht_to[to_id] = {};
            ht_to[to_id][from_id] = data;
        }

        return {
            ht: ht,
            list: list,
            from: ht_from,
            to: ht_to
        };
    }
    makeEdges (relashonships, ports) {
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


                    if (!table_ht[k]._column_instances)
                        table_ht[k]._column_instances = [];

                    table_ht[k]._column_instances.push(column_instance);
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
    buildNodes (response) {
        let relashonships    = this.list2poolWithIndex(response.RELASHONSHIPS);
        let tables           = this.list2pool(response.TABLES);
        let column_instances = this.list2pool(response.COLUMN_INSTANCES);
        let ports            = this.list2pool(response.PORTS);

        this.injectTable2ColumnInstances(tables, column_instances, relashonships);
        this.injectColumnInstances2Ports (column_instances, ports, relashonships);

        return {
            columns:          this.list2pool(response.COLUMNS),
            tables:           tables,
            column_instances: column_instances,
            ports:            ports,
            relashonships:    relashonships,
        };
    }
    buildEdges (relashonships, ports) {
        let ports_ht = ports.ht;

        let out = [];

        const edge = this.edge;

        for (let r of relashonships.list) {
            if (!edge.checkClassOfFromTo(r))
                continue;

            edge.injectPortAndTable(r, ports_ht);

            out.push(r);
        }

        return this.list2pool(out);
    }
    /* **************************************************************** *
     *  Import Data (未実装)
     * **************************************************************** */
    import2Data (import_data) {
    }
}
