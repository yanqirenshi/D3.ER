use serde::{Deserialize, Serialize};

/// rs_schema テーブルに対応するモデル
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize, sqlx::FromRow)]
pub struct RsSchema {
    pub schema_id: i32,       // INT AUTO_INCREMENT PRIMARY KEY
    pub name_logical: String, // VARCHAR(255) NOT NULL
    pub name_physical: String, // VARCHAR(255) NOT NULL DEFAULT '?'
    pub description: String,  // TEXT NOT NULL
}

/// 新規作成時の入力用（AUTO_INCREMENTの主キーは含めない）
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct NewRsSchema {
    pub name_logical: String,
    pub name_physical: String,
    pub description: String,
}
