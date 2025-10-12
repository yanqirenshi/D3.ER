use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize, sqlx::FromRow)]
pub struct Edge {
    pub schema_id: i32,
    pub from_id: i32,
    pub from_class: String,
    pub to_id: i32,
    pub to_class: String,
    pub data_type: String,
    pub hide: bool,
}
