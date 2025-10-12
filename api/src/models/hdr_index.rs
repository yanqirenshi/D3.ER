use serde::{Deserialize, Serialize};

/// hdr_index テーブルに対応するモデル
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize, sqlx::FromRow)]
pub struct HdrIndex {
    pub index_id: i32,         // INT AUTO_INCREMENT PRIMARY KEY
    pub entity_id: i32,        // INT NOT NULL
    pub index_type: String,    // VARCHAR(66) NOT NULL
    pub name_logical: String,  // VARCHAR(255) NOT NULL
    pub name_physical: String, // VARCHAR(255) NOT NULL DEFAULT '?'
}

/// 新規作成用（AUTO_INCREMENT 主キーは含めない）
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct NewHdrIndex {
    pub entity_id: i32,
    pub index_type: String,
    pub name_logical: String,
    pub name_physical: String,
}

