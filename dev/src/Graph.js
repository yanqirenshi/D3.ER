import React from 'react';

import D3Er, { Rectum } from './lib/index.js';

import ER_DATA from './data/ER_DATA.js';

const rectum = new Rectum({
    grid: { draw: false },
    transform: {
        k: 1.0,
        x: 0.0,
        y: 0.0,
    },
    callbacks: {
        table: {
            header: {
                click: (d) => {
                    console.log('Click header.!!!');
                }
            },
            columns: {
                click: (d) => {
                    console.log('Click column.!!!');
                }
            },
        }
    }
});

export default function Graph () {
    const [graph_data] = React.useState(ER_DATA);

    React.useEffect(()=> rectum.data(graph_data), [graph_data]);

    fetchSchemas();

    const style = {
        width:  'calc(100% - 44px)',
        height: 444,
        background: '#eee',
        padding: 22,
        borderRadius: 5,
    };

    return (
        <div style={style}>
          <D3Er rectum={rectum} />
        </div>
    );
}

async function fetchSchemas () {
    const urls = [
        'http://127.0.0.1:55555/schemas',
        'http://127.0.0.1:55555/columns',
        'http://127.0.0.1:55555/entities',
        'http://127.0.0.1:55555/attributes',
        'http://127.0.0.1:55555/edges',
    ];

    Promise.all(urls.map(url => fetch(url).then(res => res.json())))
        .then(([_schemas, _columns, _entities, _attributes]) => {
            const list2ht = (key, list)=> {
                return list.reduce((ht, d)=> {
                    ht[d[key]] = d;
                    return ht;
                }, {});
            };

            // const schemas = list2ht('schema_id',_schemas);

            const columns = data2columns(_columns);
            const column_instances = data2columnInstances(_attributes, columns);
            const entities = data2entities(_entities);
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
}

function list2ht (key, list) {
    return list.reduce((ht, d)=> {
        ht[d[key]] = d;
        return ht;
    }, {});
};

function data2columns (data) {
    return data.map(d=> {
        return {
            _id: d.column_id,
            _class: 'COLUMN',
            code: d.column_id,
            name: d.name_physical || d.name_logical,
            name_physical: d.name_physical,
            name_logical: d.name_logical,
            data_type: d.value_type,
            _core: data,
        };
    });
}

function data2columnInstances (data, columns) {
    const ht = list2ht('_id',columns);

    return data.map(d=> {
        const item = ht[d.column_id];

        return {
            _id: d.attributer_id,
            _class: 'COLUMN_INSTANCE',
            code: d.attributer_id,
            physical_name: d.name_physical || item.name_physical,
            logical_name: d.name_logical || item.name_logical,
            data_type: item.data_type,
            column_type: 'ATTRIBUTE', // 'IDENTIFIER'
            description: d.description,
            _core: d,
        };
    });
}

function data2entities (data) {
    return data.map(d=> {
        return {
            _id: d.entity_id,
            _class: 'ENTITY',
            code: d.entity_id,
            name: d.name_logical || d.name_physical,
            description: d.description,
            position: { x: d.position_x, y: d.position_y, z: d.position_z },
            size: { w: d.size_h, h: d.size_w },
        };
    });
}
  // +------------------+      +------------------+     +------------------+     +------------------+
  // | COLUMNS          |      | COLUMN_INSTANCES |     | ENTITIES         |     | PORT             |
  // |==================|      |==================|     |==================|     |==================|
  // |- _id             |      |- _id             |     |- _id             |     | _id              |
  // |- _class          |      |- _class          |     |- _class          |     | _class           |
  // |+ code            |      |+ code            |     |+ code            |     | degree           |
  // |+ name            |      |+ physical_name   |     |+ name            |     | cardinality      |
  // |+ data_type       |      |+ logical_name    |     |+ description     |     | optionality      |
  // |------------------|      |+ data_type       |     |+ position        |     |------------------|
  // +------------------+      |+ column_type     |     |+ size            |     +------------------+
  //                           |+ description     |     |------------------|
  //                           |------------------|     +------------------+
  //                           +------------------+

  // +---------------+
  // | RELASHONSHIPS |
  // |===============|
  // |- _id          |           | COLUMN               from: PORT-ER-OUT,     to: PORT-ER-IN,      data_type: FK,
  // |- _class       |           | COLUMN-INSTANCE      from: COLUMN-INSTANCE, to: PORT-ER-IN,      data_type: HAVE,
  // |  from_id      |           | PORT-ER-IN           from: COLUMN-INSTANCE, to: PORT-ER-OUT,     data_type: HAVE,
  // |  from_class   |----+----> | PORT-ER-OUT          from: TABLE,           to: COLUMN-INSTANCE, data_type: HAVE,
  // |  to_id        |    |      | TABLE                from: COLUMN,          to: COLUMN-INSTANCE, data_type: INSTANCE-OF,
  // |  to_class     |----+
  // |  data_type    |---------> | FK
  // |  hide: false  |           | HAVE
  // |---------------|           | INSTANCE-OF
  // +---------------+

