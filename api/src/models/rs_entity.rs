use serde::{Deserialize, Serialize};

/// rs_entity テーブルに対応するモデル
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize, sqlx::FromRow)]
pub struct RsEntity {
    pub entity_id: i32,        // INT AUTO_INCREMENT PRIMARY KEY
    pub name_logical: String,  // VARCHAR(255) NOT NULL
    pub name_physical: String, // VARCHAR(255) NOT NULL DEFAULT '?'
    pub description: String,   // TEXT NOT NULL
    pub position_x: f64,       // DOUBLE NOT NULL DEFAULT 0
    pub position_y: f64,       // DOUBLE NOT NULL DEFAULT 0
    pub position_z: f64,       // DOUBLE NOT NULL DEFAULT 0
    pub size_w: f64,           // DOUBLE NOT NULL DEFAULT 0
    pub size_h: f64,           // DOUBLE NOT NULL DEFAULT 0
}

/// 新規作成用（AUTO_INCREMENT 主キーは含めない）
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct NewRsEntity {
    pub name_logical: String,
    pub name_physical: String,
    pub description: String,
    pub position_x: f64,
    pub position_y: f64,
    pub position_z: f64,
    pub size_w: f64,
    pub size_h: f64,
}

