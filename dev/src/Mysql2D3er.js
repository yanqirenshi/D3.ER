import React from 'react';

import Box from '@mui/material/Box';
import S from '@mui/material/Typography';

export default function Mysql2D3er () {

    return (
        <Box sx={{mt:3}}>
          <Box>
            <S variant="h5">
              Mysql → API → D3.er/dev というのを今やっている。
            </S>
          </Box>

          <Box sx={{mt:6}}>
            <S variant="h6">
              スキーマ
            </S>
            <S>
              <pre>{schema.join('\n')}</pre>
            </S>
          </Box>

          <Box sx={{mt:6}}>
            <S variant="h6">
              テーブル
            </S>
            <Box sx={{display:'flex'}}>
              <S><pre>{table1.join('\n')}</pre></S>
              <S><pre>{table2.join('\n')}</pre></S>
            </Box>
          </Box>

          <Box sx={{mt:6}}>
            <S variant="h6">
              カラム
            </S>
            <Box sx={{display:'flex'}}>
              <S><pre>{column1.join('\n')}</pre></S>
              <S><pre>{column2.join('\n')}</pre></S>
              <S><pre>{column3.join('\n')}</pre></S>
            </Box>
          </Box>

          <Box sx={{mt:6}}>
            <S variant="h6">
              インデックス
            </S>
            <Box sx={{display:'flex'}}>
              <S><pre>{index.join('\n')}</pre></S>
            </Box>
          </Box>
        </Box>
    );
}

// スキーマ一覧
const schema = [
    'SELECT CATALOG_NAME',
    '     , SCHEMA_NAME',
    '     , DEFAULT_CHARACTER_SET_NAME',
    '     , DEFAULT_COLLATION_NAME',
    '     , SQL_PATH',
    '     , DEFAULT_ENCRYPTION',
    '  FROM information_schema.schemata;',
];

// テーブル一覧
const table1 = [
    "SELECT TABLE_CATALOG",
    "     , TABLE_SCHEMA",
    "     , TABLE_NAME",
    "     , TABLE_TYPE",
    "     , ENGINE",
    "     , VERSION",
    "     , ROW_FORMAT",
    "     , TABLE_ROWS",
    "     , AVG_ROW_LENGTH",
    "     , DATA_LENGTH",
    "     , MAX_DATA_LENGTH",
    "     , INDEX_LENGTH",
    "     , DATA_FREE",
    "     , AUTO_INCREMENT",
    "     , CREATE_TIME",
    "     , UPDATE_TIME",
    "     , CHECK_TIME",
    "     , TABLE_COLLATION",
    "     , CHECKSUM",
    "     , CREATE_OPTIONS",
    "     , TABLE_COMMENT",
    "  FROM information_schema.tables",
];

const table2 = [
    "SELECT TABLE_NAME",
    "     , TABLE_SCHEMA",
    "  FROM information_schema.tables",
    " WHERE table_schema = 'er'",
    "   AND TABLE_TYPE = 'BASE TABLE'",
];


// カラム一覧
const column1 = [
    "SELECT TABLE_CATALOG",
    "     , TABLE_SCHEMA",
    "     , TABLE_NAME",
    "     , COLUMN_NAME",
    "     , ORDINAL_POSITION",
    "     , COLUMN_DEFAULT",
    "     , IS_NULLABLE",
    "     , DATA_TYPE",
    "     , CHARACTER_MAXIMUM_LENGTH",
    "     , CHARACTER_OCTET_LENGTH",
    "     , NUMERIC_PRECISION",
    "     , NUMERIC_SCALE",
    "     , DATETIME_PRECISION",
    "     , CHARACTER_SET_NAME",
    "     , COLLATION_NAME",
    "     , COLUMN_TYPE",
    "     , COLUMN_KEY",
    "     , EXTRA",
    "     , PRIVILEGES",
    "     , COLUMN_COMMENT",
    "     , GENERATION_EXPRESSION",
    "     , SRS_ID",
    "  FROM information_schema.columns;",];

const column2 = [
    "  SELECT COLUMN_TYPE",
    "       , DATA_TYPE",
    "       , CHARACTER_MAXIMUM_LENGTH",
    "       , NUMERIC_PRECISION",
    "       , NUMERIC_SCALE",
    "    FROM information_schema.columns",
    "   WHERE table_schema = 'er'",
    "GROUP BY COLUMN_TYPE",
    "       , DATA_TYPE",
    "       , CHARACTER_MAXIMUM_LENGTH",
    "       , NUMERIC_PRECISION",
    "       , NUMERIC_SCALE",
    "       , EXTRA",
    "ORDER BY COLUMN_TYPE",
    "       , DATA_TYPE",
    "       , CHARACTER_MAXIMUM_LENGTH",
    "       , NUMERIC_PRECISION",
    "       , NUMERIC_SCALE",
    "       , EXTRA",
];

const column3 = [
    "SELECT TABLE_SCHEMA",
    "     , TABLE_NAME",
    "     , COLUMN_DEFAULT",
    "     , IS_NULLABLE",
    "     , EXTRA",
    "  FROM information_schema.columns",
    " WHERE table_schema = 'er';",
];


// インデックス
const index = [
    "SELECT TABLE_CATALOG",
    "     , TABLE_SCHEMA",
    "     , TABLE_NAME",
    "     , NON_UNIQUE",
    "     , INDEX_SCHEMA",
    "     , INDEX_NAME",
    "     , SEQ_IN_INDEX",
    "     , COLUMN_NAME",
    "     , COLLATION",
    "     , CARDINALITY",
    "     , SUB_PART",
    "     , PACKED",
    "     , NULLABLE",
    "     , INDEX_TYPE",
    "     , COMMENT",
    "     , INDEX_COMMENT",
    "     , IS_VISIBLE",
    "     , EXPRESSION",
    "  FROM information_schema.statistics",
];
