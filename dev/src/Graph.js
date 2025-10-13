import React from 'react';

import D3Er, { Rectum } from './lib/index.js';

import ER_DATA from './data/ER_DATA.js';

import m from './maneger.js';
console.log(ER_DATA);
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
    const [er_data, setErData] = React.useState(null);

    React.useEffect(()=> {
        if (er_data) return;

        m.fetchGraphData((x)=> {
            setErData(x);
        });
    }, [er_data]);

    const style = {
        width:  'calc(100% - 44px)',
        height: 444,
        background: '#eee',
        padding: 22,
        borderRadius: 5,
    };

    if (!er_data) return null;

    return (
        <div style={style}>
          <Contents value={er_data}/>
        </div>
    );
}

function Contents (props) {
    const [graph_data] = React.useState(props.value);

    React.useEffect(()=> rectum.data(graph_data), [graph_data]);

    return (
        <D3Er rectum={rectum} />
    );
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
