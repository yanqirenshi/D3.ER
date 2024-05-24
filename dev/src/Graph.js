import React, { useState, useEffect } from 'react';

import D3Er, { Rectum } from './lib/index.js';

import ER_DATA from './data/ER_DATA.js';

const rectum = new Rectum({
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

const style = {
    width:  800 + (22*2),
    height: 300 + (22*2),
    background: '#eee',
    padding: 22,
    borderRadius: 5,
};

export default function Graph () {
    const [graph_data] = useState(ER_DATA);

    useEffect(()=> rectum.data(graph_data), [graph_data]);

    return (
        <div style={style}>
          <D3Er rectum={rectum} />
        </div>
    );
}
