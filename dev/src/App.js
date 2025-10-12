import React from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import Graph from './Graph.js';
import Tabs from './Tabs.js';

import Overview from './Overview.js';
import Models from './Models.js';
import Views from './Views.js';
import Classes from './Classes.js';
import Mysql2D3er from './Mysql2D3er.js';
import API from './API.js';

function App() {
    const [tabs, setTabs] = React.useState({
        selected: 'overview',
        list: [
            { code: 'overview',      label: 'Overview' },
            { code: 'mysql_2_d3.er', label: 'MySQL 2 D3.ER' },
            { code: 'api',           label: 'API' },
            { code: 'classes',       label: 'Classes' },
            { code: 'models',        label: 'Models' },
            { code: 'views',         label: 'Views' },
        ],
    });

    const onChange = (new_tabs)=> setTabs(new_tabs);

    const style = {
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
    };

    return (
        <Box sx={style}>
          <Box>
            <Graph/>
          </Box>

          <Box sx={{mt:2}}>
            <Tabs tabs={tabs} onChange={onChange}/>
          </Box>

          <Box sx={{flexGrow:1, overflow:'auto', height:'100%'}}>
            <Container maxWidth="md" sx={{p:2, pb:22}}>
              {'overview'===tabs.selected && <Overview/>}
              {'mysql_2_d3.er'===tabs.selected && <Mysql2D3er/>}
              {'api'===tabs.selected && <API/>}
              {'classes'===tabs.selected && <Classes/>}
              {'models'===tabs.selected && <Models/>}
              {'views'===tabs.selected && <Views/>}
            </Container>
          </Box>
        </Box>
    );
}

export default App;
