import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import S from '@mui/material/Typography';

import SectionObjectModel from './SectionObjectModel.js';
import SectionDataModel from './SectionDataModel.js';

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
    flexDirection: 'column',
    alignItems: 'center',
    pt: 3,
    graph_area: {
        width:  800 + (22*2),
        height: 300 + (22*2),
        background: '#eee',
        padding: 22,
        borderRadius: 5,
    },
};

function App() {
    const [graph_data] = useState(ER_DATA);

    useEffect(()=> rectum.data(graph_data), [graph_data]);

    return (
        <Box sx={style}>
          <Container maxWidth="lg" sx={{pb:22}}>
            <Box>
              <div style={style.graph_area}>
                <D3Er rectum={rectum} />
              </div>
            </Box>

            <Box sx={{mt:6}}>
              <SectionObjectModel/>
            </Box>

            <Box sx={{mt:6}}>
              <SectionDataModel/>
            </Box>
          </Container>
        </Box>
    );
}

export default App;
