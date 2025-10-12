use serde::{Deserialize, Serialize};

/// dtl_relationship テーブルに対応するモデル
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize, sqlx::FromRow)]
pub struct DtlRelationship {
    pub relationship_id: i32, // INT NOT NULL
    pub attributer_id: i32,   // INT NOT NULL
    pub description: String,  // TEXT NOT NULL
}

/// 新規作成用
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct NewDtlRelationship {
    pub relationship_id: i32,
    pub attributer_id: i32,
    pub description: String,
}

