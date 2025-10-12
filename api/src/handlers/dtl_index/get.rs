use actix_web::{web, HttpResponse, Responder};

use crate::models::dtl_index::DtlIndex;
use super::DbPool;

// GET /dtl_indexes
pub async fn list(pool: web::Data<DbPool>) -> impl Responder {
    let res = sqlx::query_as::<_, DtlIndex>(
        r#"SELECT index_id, attributer_id, description
            FROM dtl_index
            ORDER BY index_id"#,
    )
    .fetch_all(pool.get_ref())
    .await;

    match res {
        Ok(items) => HttpResponse::Ok().json(items),
        Err(e) => {
            eprintln!("list dtl_index error: {e}");
            HttpResponse::InternalServerError().finish()
        }
    }
}

// GET /dtl_indexes/{id}
pub async fn get_by_id(
    pool: web::Data<DbPool>,
    path: web::Path<i32>,
) -> impl Responder {
    let id = path.into_inner();
    let row = sqlx::query_as::<_, DtlIndex>(
        r#"SELECT index_id, attributer_id, description
            FROM dtl_index
            WHERE index_id = ?"#,
    )
    .bind(id)
    .fetch_optional(pool.get_ref())
    .await;

    match row {
        Ok(Some(item)) => HttpResponse::Ok().json(item),
        Ok(None) => HttpResponse::NotFound().finish(),
        Err(e) => {
            eprintln!("get dtl_index by id error: {e}");
            HttpResponse::InternalServerError().finish()
        }
    }
}

