import React, { useState, useEffect } from 'react';

import D3ER from '../js/D3ER.js';

import ENTITIES      from '../data/ENTITIES.js';

let last_effect = null;

function ErGraph () {
    const [d3er] = useState(new D3ER());

    const style = {
        graph: {
            background: '#efefef',
        },
    };

    useEffect(() => {
        if(!last_effect)
            d3er.init({
                svg: {
                    selector: '#er-graph',
                    w: 1024,
                    h: 555,
                },
            });

        d3er.data(ENTITIES);

        last_effect = new Date();
    });


  return (
    <div>
      <svg id='er-graph'
           style={style.graph}
           width='1024px'
           height='555px' />
    </div>
  );
}

export default ErGraph;
