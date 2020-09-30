import React, { useState, useEffect } from 'react';

import D3ER from '../js/D3ER.js';

import ER_DATA from '../data/ER_DATA.js';

let last_effect = null;

const initD3er = (d3er) => {
    const container = document.getElementById('er-graph-container');

    d3er.init({
        svg: {
            selector: '#er-graph',
            w: container.clientWidth,
            h: container.clientHeight,
        },
    });
};

const resizeSvg = (d3er) => {
    const container = document.getElementById('er-graph-container');

    d3er.svgSize(container.clientWidth,
                 container.clientHeight);
};

function ErGraph () {
    const [d3er] = useState(new D3ER());

    const style = {
        root: {
            position: 'fixed',
            left: 0,
            top: 0,
            width: '100vw',
            height: '100vh',
        },
        graph: {
            background: '#efefef',
        },
    };

    useEffect(() => {

        if(!last_effect)
            initD3er(d3er);

        d3er.focus();
        d3er.data(ER_DATA);

        window.addEventListener('resize', () => {
            resizeSvg(d3er);
        });

        last_effect = new Date();
    });


    return (
        <div id='er-graph-container' style={style.root}>
          <svg id='er-graph' style={style.graph} />
        </div>
    );
}

export default ErGraph;
