use serde::{Deserialize, Serialize};

/// th_schema_entity テーブルに対応するモデル（複合主キー）
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize, sqlx::FromRow)]
pub struct ThSchemaEntity {
    pub schema_id: i32, // INT NOT NULL (PK part)
    pub entity_id: i32, // INT NOT NULL (PK part)
}

/// 新規作成用
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct NewThSchemaEntity {
    pub schema_id: i32,
    pub entity_id: i32,
}

