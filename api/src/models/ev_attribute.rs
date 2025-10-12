use serde::{Deserialize, Serialize};

/// ev_attribute テーブルに対応するモデル
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize, sqlx::FromRow)]
pub struct EvAttribute {
    pub attributer_id: i32,     // INT AUTO_INCREMENT PRIMARY KEY
    pub entity_id: i32,         // INT NOT NULL
    pub column_id: i32,         // INT NOT NULL
    pub name_logical: Option<String>,   // VARCHAR(255) NULL 可
    pub name_physical: Option<String>,  // VARCHAR(255) NULL 可
    pub description: String,    // TEXT NOT NULL
    pub order: i32,             // INT NOT NULL DEFAULT 0
    pub is_not_null: i8,        // TINYINT NOT NULL DEFAULT 0（bool相当）
    pub default_value: Option<String>, // VARCHAR(255) NULL 可（デフォルト値）
    pub is_auto_increment: i8,  // TINYINT NOT NULL DEFAULT 0（AUTO_INCREMENT フラグ）
}

/// 新規作成用（AUTO_INCREMENT 主キーは含めない）
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct NewEvAttribute {
    pub entity_id: i32,
    pub column_id: i32,
    pub name_logical: Option<String>,
    pub name_physical: Option<String>,
    pub description: String,
    pub order: i32,
    pub is_not_null: i8,
    pub default_value: Option<String>,
    #[serde(default)]
    pub is_auto_increment: i8,
}
