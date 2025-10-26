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
              <Sql value={schema1}/>
              <Sql value={schema2}/>
            </S>
          </Box>

          <Box sx={{mt:6}}>
            <S variant="h6">
              テーブル
            </S>
            <Box sx={{display:'flex'}}>
              <Sql value={table1}/>
              <Sql value={table2}/>
            </Box>
          </Box>

          <Box sx={{mt:6}}>
            <S variant="h6">
              スキーマ・テーブル
            </S>
            <Box sx={{display:'flex'}}>
              <Sql value={schema_entity1}/>
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
              <Sql value={fk3}/>
            </Box>
          </Box>
        </Box>
    );
}

function Sql (props) {
    const data = props.value;

    return (
        <Box sx={{p:2}}>
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
const schema1 = {
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

const schema2 = {
    label: 'information_schema.schemata 2 er.rs_schema',
    sql: [
        "SELECT SCHEMA_NAME as name_logical",
        "     , SCHEMA_NAME as name_physical",
        "     , ''          as description",
        "  FROM information_schema.schemata",
        " WHERE SCHEMA_NAME not in ('information_schema', 'mysql', 'performance_schema', 'sys');",
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
    label: 'information_schema.tables 2 Entity',
    sql: [
        "SELECT TABLE_NAME                            as name_logical",
        "     , CONCAT(TABLE_SCHEMA, '.', TABLE_NAME) as name_physical",
        "     , TABLE_COMMENT                         as description",
        "     , 0                                     as position_x",
        "     , 0                                     as position_y",
        "     , 0                                     as position_z",
        "     , 0                                     as size_w",
        "     , 0                                     as size_h",
        "  FROM information_schema.tables",
        " WHERE table_schema not in ('information_schema', 'mysql', 'performance_schema', 'sys');",
    ]
};

const schema_entity1 = {
    label: 'information_schema.tables 2 er.th_schema_entity',
    sql: [
        "    SELECT t2.schema_id as schema_id",
        "         , t3.entity_id as entity_id",
        "      FROM information_schema.tables t1",
        "INNER JOIN er.rs_schema t2",
        "        ON t1.TABLE_SCHEMA = t2.name_physical",
        "INNER JOIN er.rs_entity t3",
        "        ON CONCAT(TABLE_SCHEMA, '.', TABLE_NAME) = t3.name_physical",
        "       AND t1.TABLE_TYPE = 'BASE TABLE'",
        "     WHERE t1.table_schema not in ('information_schema', 'mysql', 'performance_schema', 'sys');",
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
        "  SELECT COLUMN_TYPE as name_logical",
        "       , COLUMN_TYPE as name_physical",
        "       , DATA_TYPE   as value_type",
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
        "   WHERE table_schema not in ('information_schema', 'mysql', 'performance_schema', 'sys')",
        "GROUP BY name_logical",
        "       , name_physical",
        "       , value_type",
        "       , value_length",
        "ORDER BY name_logical",
        "       , name_physical",
        "       , value_type",
        "       , value_length;",

    ]
};

const column3 = {
    label: '2 Attributes',
    sql: [
        "    SELECT t2.schema_id",
        "         , t2.entity_id",
        "         , t3.column_id",
        "         , t1.COLUMN_NAME            as name_logical",
        "         , t1.COLUMN_NAME            as name_physical",
        "         , ''                        as description",
        "         , t1.ORDINAL_POSITION       as `order`",
        "         , t1.IS_NULLABLE='YES'      as is_not_null",
        "         , t1.EXTRA='auto_increment' as is_auto_increment",
        "         , t1.COLUMN_DEFAULT         as default_value",
        "      FROM information_schema.columns as t1",
        "INNER JOIN (",
        "               SELECT t100.schema_id",
        "                    , t100.name_physical as schema_name",
        "                    , t200.entity_id",
        "                    , t300.name_physical as entity_name",
        "                 FROM er.rs_schema t100",
        "           INNER JOIN er.th_schema_entity t200",
        "                   ON t100.schema_id = t200.schema_id",
        "           INNER JOIN er.rs_entity t300",
        "                   ON t200.entity_id = t300.entity_id",
        "           ) t2",
        "        ON t1.TABLE_SCHEMA = t2.schema_name",
        "       AND CONCAT(t1.TABLE_SCHEMA, '.', t1.TABLE_NAME) = t2.entity_name",
        "INNER JOIN er.rs_column t3",
        "        ON t1.data_type = t3.name_physical",
        "     WHERE table_schema not in ('information_schema', 'mysql', 'performance_schema', 'sys');",
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
    label: 'information_schema.key_column_usage 2 er.hdr_relationship',
    sql: [
        "    SELECT t2.schema_id               as schema_id",
        "         , t1.CONSTRAINT_NAME         as name",
        "         , t5.entity_id               as entity_id_from",
        "         , 9                          as degree_from",
        "         , 9                          as cardinality_from",
        "         , 9                          as optionality_from",
        "         , t6.entity_id               as entity_id_to",
        "         , 9                          as degree_to",
        "         , 9                          as cardinality_to",
        "         , 9                          as optionality_to",
        "         , ''                         as description",
        "      FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE AS t1",
        "INNER JOIN er.rs_schema t2",
        "        ON t1.CONSTRAINT_SCHEMA = t2.name_physical",
        "INNER JOIN er.rs_schema t3",
        "        ON t1.TABLE_SCHEMA = t3.name_physical",
        "INNER JOIN er.rs_schema t4",
        "        ON t1.REFERENCED_TABLE_SCHEMA = t4.name_physical",
        "INNER JOIN (",
        "               SELECT t100.schema_id",
        "                    , t100.name_physical as schema_name",
        "                    , t200.entity_id",
        "                    , t300.name_physical as entity_name",
        "                 FROM er.rs_schema t100",
        "           INNER JOIN er.th_schema_entity t200",
        "                   ON t100.schema_id = t200.schema_id",
        "           INNER JOIN er.rs_entity t300",
        "                   ON t200.entity_id = t300.entity_id",
        "           ) t5",
        "",
        "        ON t1.TABLE_SCHEMA = t5.schema_name",
        "       AND CONCAT(t1.TABLE_SCHEMA, '.', t1.TABLE_NAME) = t5.entity_name",
        "INNER JOIN (",
        "               SELECT t400.schema_id",
        "                    , t400.name_physical as schema_name",
        "                    , t500.entity_id",
        "                    , t600.name_physical as entity_name",
        "                 FROM er.rs_schema t400",
        "           INNER JOIN er.th_schema_entity t500",
        "                   ON t400.schema_id = t500.schema_id",
        "           INNER JOIN er.rs_entity t600",
        "                   ON t500.entity_id = t600.entity_id",
        "           ) t6",
        "        ON t1.REFERENCED_TABLE_SCHEMA = t6.schema_name",
        "       AND CONCAT(t1.REFERENCED_TABLE_SCHEMA, '.', t1.REFERENCED_TABLE_NAME) = t6.entity_name",
        "     WHERE t1.REFERENCED_TABLE_NAME IS NOT NULL",
        "       AND CONSTRAINT_SCHEMA not in ('information_schema', 'mysql', 'performance_schema', 'sys')",
        "  GROUP BY schema_id",
        "         , name",
        "         , entity_id_from",
        "         , entity_id_to;",
    ],
};

const fk3 = {
    label: 'INFORMATION_SCHEMA.KEY_COLUMN_USAGE 2 er.dtl_relationship',
    sql: [
        "    SELECT t2.relationship_id  as relationship_id",
        "         , t1.ORDINAL_POSITION as position",
        "         , t3.attributer_id    as attributer_id_from",
        "         , t4.attributer_id    as attributer_id_to",
        "      FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE t1",
        "INNER JOIN (",
        "                SELECT t2.name_physical as schema_name",
        "                     , t1.name          as relationship_name",
        "                     , t1.relationship_id",
        "                  FROM er.hdr_relationship t1",
        "            INNER JOIN er.rs_schema t2",
        "                    ON t1.schema_id = t2.schema_id",
        "           ) t2",
        "        ON t1.CONSTRAINT_SCHEMA = t2.schema_name",
        "       AND t1.CONSTRAINT_NAME   = t2.relationship_name",
        "INNER JOIN (",
        "                SELECT t300.name_physical as schema_name",
        "                     , t400.name_physical as entity_name",
        "                     , t100.name_physical as column_name",
        "                     , t100.attributer_id",
        "                  FROM er.ev_attribute t100",
        "            INNER JOIN er.th_schema_entity t200 ON t100.entity_id = t200.entity_id",
        "            INNER JOIN er.rs_schema        t300 ON t200.schema_id = t300.schema_id",
        "            INNER JOIN er.rs_entity        t400 ON t100.entity_id = t400.entity_id",
        "           ) t3",
        "        ON concat(t1.TABLE_SCHEMA, '.', t1.TABLE_NAME) = t3.entity_name",
        "       AND t1.COLUMN_NAME  = t3.column_name",
        "INNER JOIN (",
        "                SELECT t300.name_physical as schema_name",
        "                     , t400.name_physical as entity_name",
        "                     , t100.name_physical as column_name",
        "                     , t100.attributer_id",
        "                  FROM er.ev_attribute t100",
        "            INNER JOIN er.th_schema_entity t200 ON t100.entity_id = t200.entity_id",
        "            INNER JOIN er.rs_schema        t300 ON t200.schema_id = t300.schema_id",
        "            INNER JOIN er.rs_entity        t400 ON t100.entity_id = t400.entity_id",
        "           ) t4",
        "        ON concat(t1.REFERENCED_TABLE_SCHEMA, '.', t1.REFERENCED_TABLE_NAME) = t4.entity_name",
        "       AND t1.REFERENCED_COLUMN_NAME  = t4.column_name",
        "     WHERE t1.REFERENCED_TABLE_NAME IS NOT NULL",
        "       AND t1.CONSTRAINT_SCHEMA not in ('information_schema', 'mysql', 'performance_schema', 'sys')",
        "  ORDER BY t2.relationship_id",
        "         , position;",
    ],
};
