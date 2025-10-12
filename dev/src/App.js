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


const style = {
    width: '100%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    pt: 1,
};

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

    return (
        <Box sx={style}>
          <Box>
            <Graph/>
          </Box>

          <Container maxWidth="md" sx={{pb:22}}>

            <Box sx={{mt:2}}>
              <Tabs tabs={tabs} onChange={onChange}/>
            </Box>
            {'overview'===tabs.selected && <Overview/>}
            {'mysql_2_d3.er'===tabs.selected && <Mysql2D3er/>}
            {'api'===tabs.selected && <API/>}
            {'classes'===tabs.selected && <Classes/>}
            {'models'===tabs.selected && <Models/>}
            {'views'===tabs.selected && <Views/>}
          </Container>
        </Box>
    );
}

export default App;
