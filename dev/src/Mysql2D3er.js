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
              <Sql value={schema}/>
            </S>
          </Box>

          <Box sx={{mt:6}}>
            <S variant="h6">
              テーブル
            </S>
            <Box sx={{display:'flex'}}>
              <Sql value={table1}/>
              <Sql value={table2}/>
              <Sql value={table3}/>
            </Box>
          </Box>

          <Box sx={{mt:6}}>
            <S variant="h6">
              カラム
            </S>
            <Box sx={{display:'flex'}}>
              <Sql value={column1}/>
              <Sql value={column2}/>
              <Sql value={column3}/>
            </Box>
          </Box>

          <Box sx={{mt:6}}>
            <S variant="h6">
              インデックス
            </S>
            <Box sx={{display:'flex'}}>
              <Sql value={index}/>
            </Box>
          </Box>

          <Box sx={{mt:6}}>
            <S variant="h6">
              外部キー
            </S>
            <Box sx={{display:'flex'}}>
              <Sql value={fk1}/>
              <Sql value={fk2}/>
            </Box>
          </Box>
        </Box>
    );
}

function Sql (props) {
    const data = props.value;

    return (
        <Box sx={{p:1}}>
          <S>
            {data.label}
          </S>
          <S>
            <pre>
              {data.sql.join('\n')}
            </pre>
          </S>
        </Box>
    );
}

// スキーマ一覧
const schema = {
    label: 'ALL',
    sql: [
        'SELECT CATALOG_NAME',
        '     , SCHEMA_NAME',
        '     , DEFAULT_CHARACTER_SET_NAME',
        '     , DEFAULT_COLLATION_NAME',
        '     , SQL_PATH',
        '     , DEFAULT_ENCRYPTION',
        '  FROM information_schema.schemata;',
    ]
};

// テーブル一覧
const table1 = {
    label: 'ALL',
    sql: [
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
    ]
};

const table2 = {
    label: '2 Entity',
    sql: [
        "SELECT TABLE_NAME as name_logical",
        "     , TABLE_NAME as name_physical",
        "     , TABLE_COMMENT as description",
        "     , 0 as position_x",
        "     , 0 as position_y",
        "     , 0 as position_z",
        "     , 0 as size_w",
        "     , 0 as size_h",
        "  FROM information_schema.tables",
        " WHERE table_schema = 'er';",
    ]
};

const table3 = {
    label: '2 Shcema-Entity',
    sql: [
        "SELECT TABLE_NAME",
        "     , TABLE_SCHEMA",
        "  FROM information_schema.tables",
        " WHERE table_schema = 'er'",
        "   AND TABLE_TYPE = 'BASE TABLE'",
    ]
};


// カラム一覧
const column1 = {
    label: 'ALL',
    sql: [
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
        "  FROM information_schema.columns;",
    ]
};

const column2 = {
    label: '2 Columns',
    sql: [
        " SELECT COLUMN_TYPE as name_logical",
        "       , COLUMN_TYPE as name_physical",
        "       , DATA_TYPE as value_type",
        "       , CASE WHEN CHARACTER_MAXIMUM_LENGTH IS NULL",
        "           THEN CONCAT(",
        "                  IFNULL(NUMERIC_PRECISION,0),",
        "                  '.',",
        "                  IFNULL(NUMERIC_SCALE,0)",
        "                )",
        "           ELSE CHARACTER_MAXIMUM_LENGTH",
        "         END as value_length",
        "       , '' as description",
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
    ]
};

const column3 = {
    label: '2 Attributes',
    sql: [
        "SELECT TABLE_SCHEMA",
        "     , TABLE_NAME as entity_id",
        "     , COLUMN_NAME as column_id",
        "     , COLUMN_NAME as name_logical",
        "     , COLUMN_NAME as name_physical",
        "     , '' as description",
        "     , ORDINAL_POSITION as `order`",
        "     , IS_NULLABLE='YES' as is_not_null",
        "     , EXTRA='auto_increment' as is_auto_increment",
        "     , COLUMN_DEFAULT as default_value",
        "  FROM information_schema.columns",
        " WHERE table_schema = 'er'",
    ]
};


// インデックス
const index = {
    label: 'ALL',
    sql: [
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
    ]
};

// forign key
const fk1 = {
    label: 'ALL',
    sql: [
        "SELECT t1.CONSTRAINT_CATALOG",
        "     , t1.CONSTRAINT_SCHEMA",
        "     , t1.CONSTRAINT_NAME",
        "     , t1.TABLE_CATALOG",
        "     , t1.TABLE_SCHEMA",
        "     , t1.TABLE_NAME",
        "     , t1.COLUMN_NAME",
        "     , t1.ORDINAL_POSITION",
        "     , t1.POSITION_IN_UNIQUE_CONSTRAINT",
        "     , t1.REFERENCED_TABLE_SCHEMA",
        "     , t1.REFERENCED_TABLE_NAME",
        "     , t1.REFERENCED_COLUMN_NAME",
        "  FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE AS t1",
        " WHERE t1.REFERENCED_TABLE_NAME IS NOT NULL",
        "   AND t1.TABLE_SCHEMA = 'er'",
    ]
};

const fk2 = {
    label: '???',
    sql: [
        "SELECT t1.CONSTRAINT_SCHEMA",
        "     , t1.CONSTRAINT_NAME",
        "     , t1.TABLE_SCHEMA",
        "     , t1.TABLE_NAME",
        "     , t1.COLUMN_NAME",
        "     , t1.ORDINAL_POSITION",
        "     , t1.REFERENCED_TABLE_SCHEMA",
        "     , t1.REFERENCED_TABLE_NAME",
        "     , t1.REFERENCED_COLUMN_NAME",
        "  FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE AS t1",
        " WHERE t1.REFERENCED_TABLE_NAME IS NOT NULL",
        "   AND t1.TABLE_SCHEMA = 'er'",
    ],
};
