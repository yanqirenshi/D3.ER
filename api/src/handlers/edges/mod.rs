use sqlx::{MySql, Pool};

type DbPool = Pool<MySql>;

pub mod get;
pub use get::list;

