use serde::{Deserialize, Serialize};

/// dtl_index テーブルに対応するモデル
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize, sqlx::FromRow)]
pub struct DtlIndex {
    pub index_id: i32,       // INT NOT NULL（PK）
    pub attributer_id: i32,  // INT NOT NULL
    pub description: String, // TEXT NOT NULL
}

/// 新規作成用
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct NewDtlIndex {
    pub index_id: i32,
    pub attributer_id: i32,
    pub description: String,
}

