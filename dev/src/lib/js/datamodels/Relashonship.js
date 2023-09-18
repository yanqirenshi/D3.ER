import Pool from '../Pool';

export default class Relashonship {
    constructor () {
        this.pool = new Pool();
    }
    checkClassOfFromTo (r) {
        return (r.from_class==='PORT-ER-OUT' || r.from_class==='PORT-ER-IN')
            && (r.to_class  ==='PORT-ER-OUT' || r.to_class  ==='PORT-ER-IN');
    }
    /** *************************************************************** *
     *
     *  injectPortAndTable
     *
     * **************************************************************** */
    injectPortAndTable (r, ports) {
        // from
        let port_from = ports[r.from_id];

        r._port_from = port_from;

        let table_from = port_from._column_instance._table;

        if (!table_from._edges)
            table_from._edges = [];

        table_from._edges.push(r);

        // to
        let port_to   = ports[r.to_id];

        r._port_to   = port_to;

        let table_to   = port_to._column_instance._table;

        if (!table_to._edges)
            table_to._edges   = [];

        table_to._edges.push(r);
    }
    /* **************************************************************** *
     *  Data manegement
     * **************************************************************** */
    build (list) {
        return this.pool.list2poolWithIndex(list);
    }
}
