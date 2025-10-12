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

const style = {
    width:  'calc(100vw - 66px)',
    height: 444,
    background: '#eee',
    padding: 22,
    borderRadius: 5,
};

export default function Graph () {
    const [graph_data] = React.useState(ER_DATA);

    React.useEffect(()=> rectum.data(graph_data), [graph_data]);

    fetchSchemas();

    return (
        <div style={style}>
          <D3Er rectum={rectum} />
        </div>
    );
}

async function fetchSchemas () {
    const urls = [
        'http://127.0.0.1:55555/schemas',
        'http://127.0.0.1:55555/entities',
        'http://127.0.0.1:55555/columns',
        'http://127.0.0.1:55555/attributes',
    ];

    Promise.all(urls.map(url => fetch(url).then(res => res.json())))
        .then(([schemas, columns, entities, attributes]) => {
            console.log('schemas:', schemas);
            console.log('columns:', columns);
            console.log('entities:', entities);
            console.log('attributes:', attributes);
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
}
