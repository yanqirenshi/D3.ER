use serde::{Deserialize, Serialize};

/// rs_column テーブルに対応するモデル
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize, sqlx::FromRow)]
pub struct RsColumn {
    pub column_id: i32,        // INT AUTO_INCREMENT PRIMARY KEY
    pub name_logical: String,  // VARCHAR(255) NOT NULL
    pub name_physical: String, // VARCHAR(255) NOT NULL DEFAULT '?'
    pub value_type: String,    // VARCHAR(66) NOT NULL
    pub value_length: Option<String>, // VARCHAR(45) NULL
    pub description: String,   // TEXT NOT NULL
}

/// 新規作成用（AUTO_INCREMENT 主キーは含めない）
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct NewRsColumn {
    pub name_logical: String,
    pub name_physical: String,
    pub value_type: String,
    pub value_length: Option<String>,
    pub description: String,
}

