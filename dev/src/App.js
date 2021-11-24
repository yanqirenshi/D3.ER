import React, { useState, useEffect } from 'react';

import D3Er, { Rectum } from './lib/index.js';

import ER_DATA from './data/ER_DATA.js';

const rectum = new Rectum({
    transform: {
        k: 1.0,
        x: 0.0,
        y: 0.0,
    },
});

const style = {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    graph_area: {
        width:  800 + (22*2),
        height: 600 + (22*2),
        background: '#eee',
        padding: 22,
        borderRadius: 5,
    },
};

function App() {
    const [graph_data] = useState(ER_DATA);

    useEffect(()=> rectum.data(graph_data), [graph_data]);

    return (
        <div style={style}>
          <div style={style.graph_area}>
            <D3Er rectum={rectum} />
          </div>
        </div>
    );
}

export default App;
