use serde::{Deserialize, Serialize};

/// hdr_relationship テーブルに対応するモデル
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize, sqlx::FromRow)]
pub struct HdrRelationship {
    pub relationship_id: i32,  // INT NOT NULL（PK）
    pub entity_id_from: i32,   // INT NOT NULL
    pub entity_id_to: i32,     // INT NOT NULL
    pub degree_from: f64,      // DOUBLE NOT NULL DEFAULT 0
    pub cardinality_from: i32, // INT NOT NULL DEFAULT 1
    pub optionality_from: i32, // INT NOT NULL DEFAULT 1
    pub degree_to: f64,        // DOUBLE NOT NULL DEFAULT 0
    pub cardinality_to: i32,   // INT NOT NULL DEFAULT 1
    pub optionality_to: i32,   // INT NOT NULL DEFAULT 1
    pub description: String,   // TEXT NOT NULL
}

/// 新規作成用（AUTO_INCREMENT 指定なしのためIDも受け取る）
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct NewHdrRelationship {
    pub relationship_id: i32,
    pub entity_id_from: i32,
    pub entity_id_to: i32,
    pub degree_from: f64,
    pub cardinality_from: i32,
    pub optionality_from: i32,
    pub degree_to: f64,
    pub cardinality_to: i32,
    pub optionality_to: i32,
    pub description: String,
}
