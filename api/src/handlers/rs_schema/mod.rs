use sqlx::{MySql, Pool};

type DbPool = Pool<MySql>;

pub mod get;
pub use get::{list, get_by_id};
pub mod post;
pub use post::create;
