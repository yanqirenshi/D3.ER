import React from 'react';

import Box from '@mui/material/Box';
import S from '@mui/material/Typography';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function API () {
    const rows = api_list;

    return (
        <Box sx={{mt:3}}>
          <Box>
            <S variant="h5">
              今はまだ使いづらい。
            </S>
          </Box>

          <Box>
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Method</TableCell>
                    <TableCell>Path</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                      <TableRow key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell scope="row">{row.method.toUpperCase()}</TableCell>
                        <TableCell scope="row">{row.path}</TableCell>
                      </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          <Box sx={{mt:12}}>
            <pre>{tm.join('\n')}</pre>
          </Box>
        </Box>
    );
}

const api_list = [
    { method: 'get',  path: '/schemas' },
    { method: 'post', path: '/schemas' },
    { method: 'get',  path: '/schemas/{schema_id}' },
    { method: 'get',  path: '/entities' },
    { method: 'post', path: '/entities' },
    { method: 'get',  path: '/entities/{entity_id}' },
    { method: 'get',  path: '/columns' },
    { method: 'post', path: '/columns' },
    { method: 'get',  path: '/columns/{column_id}' },
    { method: 'get',  path: '/attributes' },
    { method: 'post', path: '/attributes' },
    { method: 'get',  path: '/attributes/{attribute_id}' },
    { method: 'get',  path: '/indexes' },
    { method: 'post', path: '/indexes' },
    { method: 'get',  path: '/indexes/{index_id}' },
    { method: 'get',  path: '/indexes/{index_id}details' },
    { method: 'post', path: '/indexes/{index_id}details' },
    { method: 'get',  path: '/indexes/{index_id}details/{index_detail_id}' },
    { method: 'get',  path: '/relationships' },
    { method: 'post', path: '/relationships' },
    { method: 'get',  path: '/relationships/{relationship_id}' },
    { method: 'get',  path: '/relationships/{relationship_id}details' },
    { method: 'post', path: '/relationships/{relationship_id}details' },
    { method: 'get',  path: '/relationships/{relationship_id}details/{relationship_detail_id}' },
    { method: 'get',  path: '/th/schema-entities' },
    { method: 'get',  path: '/th/schema-entities/{schema_id}.{entity_id}' },
    { method: 'post', path: '/th/schema-entities/{schema_id}.{entity_id}' },
];

const tm = [
'         +---------------------------+      +----------------------------+',
'         | schema               | RS |      | column                | RS |',
'         |===========================|      |============================|',
'         | schema_id | name_logical  |      | column_id | name_logical   |',
'         |           | name_physical |      |           | name_physical  |',
'         |           | description   |      |           | value_type     |',
'         +---------------------------+      |           | value_length   |',
'                       |                    |           | description    |',
'                       1                    +----------------------------+',
' +-----------------+   |                      |',
' | schema     | RS |---+                      1',
' |=================|   |                      |',
' | schema_id |     |   |                      |',
' | entity_id |     |   |                      |',
' +-----------------+   3                      |       +-------------------------------+',
'                       |                      |       | attribute                | EV |---------+',
'         +---------------------------+        |       |===============================|         |',
'         | entity               | RS |-1------|---3---| attributer_id | name_logical  |         |',
'         |===========================|----+   `---3---| entity_id     | name_physical |         |',
'         | entity_id | name_logical  |    |           | column_id     | description   |         |',
'         |           | name_physical |    |           |               | order         |         |',
'         |           | description   |    |           |               | description   |         |',
'         |           | position_x    |    |           |               | is_not_null   |         |',
'         |           | position_y    |    |           +-------------------------------+         |',
'         |           | position_z    |    |                                                     |',
'         |           | size_w        |    |           +---------------------------+             |    +-------------------------------+',
'         |           | size_h        |    |           | index               | HDR |-1-----------|--3-| index items             | DTL |',
'         +---------------------------+    |           |===========================|             |    |===============================|',
'                                          |           | index_id  | index_type    |             |    | index_id        | description |',
'                                          +---------->| entity_id | name_logical  |             +--->| attributer_id   |             |',
'                                          |           |           | name_physical |             |    +-------------------------------+',
'                                          |           +---------------------------+             |',
'                                          |            (port)                                   |',
'                                          |           +------------------------------------+    |    +----------------------------------+',
'                                          |           | relationship                 | HDR |-1-----3-| relationship items         | DTL |',
'                                          |           |====================================|    |    |==================================|',
'                                          |           | relationship_id | degree_from      |    |    | relationship_id    | description |',
'                                          `------|----| entity_id_from  | cardinality_from |    `----| attributer_id_from |             |',
'                                                  `---| entity_id_to    | optionality_from |         | attributer_id_to   |             |',
'                                                      |                 | degree_to        |         +----------------------------------+',
'                                                      |                 | cardinality_to   |',
'                                                      |                 | optionality_to   |',
'                                                      |                 | description      |',
'                                                      +------------------------------------+',
];
