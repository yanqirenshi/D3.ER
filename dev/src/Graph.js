import React from 'react';

import Box from '@mui/material/Box';

import D3Er, { Rectum } from './lib/index.js';

import ER_DATA from './data/ER_DATA.js';

import m from './maneger.js';

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
                    console.log(d);
                    console.log(`update er.rs_entity set position_x=${d.x}, position_y=${d.y}, size_w=${d.w}, size_h=${d.h} where entity_id=${d._id}`);
                    // console.log('Click header.!!!');
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
        width:  '100%',
        height: '100%',
        background: '#eee',
        padding: 22,
        borderRadius: 5,
        boxSizing: 'border-box',
    };

    if (!er_data) return null;

    return (
        <Box style={style}>
          <Contents value={er_data}/>
        </Box>
    );
}

function Contents (props) {
    const [graph_data] = React.useState(props.value);

    React.useEffect(()=> rectum.data(graph_data), [graph_data]);

    return (
        <D3Er rectum={rectum} />
    );
}
