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
