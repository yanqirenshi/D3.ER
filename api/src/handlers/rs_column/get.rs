use actix_web::{web, HttpResponse, Responder};

use crate::models::rs_column::RsColumn;
use super::DbPool;

// GET /rs_columns
pub async fn list(pool: web::Data<DbPool>) -> impl Responder {
    let res = sqlx::query_as::<_, RsColumn>(
        r#"SELECT column_id, name_logical, name_physical, value_type, value_length, description
            FROM rs_column
            ORDER BY column_id"#,
    )
    .fetch_all(pool.get_ref())
    .await;

    match res {
        Ok(items) => HttpResponse::Ok().json(items),
        Err(e) => {
            eprintln!("list rs_column error: {e}");
            HttpResponse::InternalServerError().finish()
        }
    }
}

// GET /rs_columns/{id}
pub async fn get_by_id(
    pool: web::Data<DbPool>,
    path: web::Path<i32>,
) -> impl Responder {
    let id = path.into_inner();
    let row = sqlx::query_as::<_, RsColumn>(
        r#"SELECT column_id, name_logical, name_physical, value_type, value_length, description
            FROM rs_column
            WHERE column_id = ?"#,
    )
    .bind(id)
    .fetch_optional(pool.get_ref())
    .await;

    match row {
        Ok(Some(item)) => HttpResponse::Ok().json(item),
        Ok(None) => HttpResponse::NotFound().finish(),
        Err(e) => {
            eprintln!("get rs_column by id error: {e}");
            HttpResponse::InternalServerError().finish()
        }
    }
}

