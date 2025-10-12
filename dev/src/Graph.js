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
    fetch('http://127.0.0.1:55555/schemas')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTPエラー! ステータス: ${response.status}`);
            }
            return response.json(); // JSONとしてパース
        })
        .then(data => {
            console.log('取得したデータ:', data);
        })
        .catch(error => {
            console.error('エラーが発生しました:', error);
        });
}
