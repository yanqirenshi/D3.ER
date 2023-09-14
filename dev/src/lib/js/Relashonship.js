import Pool from './Pool';

class DataModel {
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
}

export default class Relashonship extends DataModel {
    constructor () {
        super();

        this.pool = new Pool();
    }
    /* **************************************************************** *
     *  Data manegement
     * **************************************************************** */
    build (list) {
        return new Pool().list2poolWithIndex(list);
    }
    /* **************************************************************** *
     *  Draw
     * **************************************************************** */
    drawCore (selection) {
        let val = (port, name) => {
            try {
                let position = port.position;

                if (!position || !position[name])
                    return 0;

                return port._column_instance._table[name] + position[name];
            } catch (e) {
                return 0;
            }
        };

        selection
            .attr('x1', (d) => val(d._port_from, 'x'))
            .attr('y1', (d) => val(d._port_from, 'y'))
            .attr('x2', (d) => val(d._port_to,   'x'))
            .attr('y2', (d) => val(d._port_to,   'y'))
            .attr('id', (d) => d._id)
            .attr('stroke', (d) => {
                return d.hide ? '#e0e0e0' : '#a3a3a2';
            })
            .attr('stroke-width', 3);
    }
    draw (svg, edges, g) {
        svg.selectAll('line.er')
            .data(edges, (d) => { return d._id; })
            .exit()
            .remove();

        let selection = svg.selectAll('line.er')
            .data(edges, (d) => { return d._id; })
            .enter()
            .append('line')
            .attr('class', 'er');

        this.drawCore (selection);
    }
    removeEdgeAll (svg) {
        svg.selectAll('line.er')
            .data([], (d) => { return d._id; })
            .exit()
            .remove();
    }
    moveEdges(svg, edges) {
        let val = (port, name) => {
            try {
                let position = port.position;

                if (!position || !position[name])
                    return 0;

                return port._column_instance._table[name] + position[name];
            } catch (e) {
                return 0;
            }
        };

        svg.selectAll('line')
            .data(edges, (d) => { return d._id; })
            .attr('x1', (d) => { return val(d._port_from, 'x'); })
            .attr('y1', (d) => { return val(d._port_from, 'y'); })
            .attr('x2', (d) => { return val(d._port_to,   'x'); })
            .attr('y2', (d) => { return val(d._port_to,   'y'); });
    }
}
