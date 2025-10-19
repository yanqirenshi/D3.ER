use actix_web::{web, HttpResponse, Responder};

use crate::models::hdr_index::HdrIndex;
use super::DbPool;

// GET /hdr_indexes
pub async fn list(pool: web::Data<DbPool>) -> impl Responder {
    let res = sqlx::query_as::<_, HdrIndex>(
        r#"SELECT index_id, schema_id, entity_id, index_type, name_logical, name_physical
            FROM hdr_index
            ORDER BY index_id"#,
    )
    .fetch_all(pool.get_ref())
    .await;

    match res {
        Ok(items) => HttpResponse::Ok().json(items),
        Err(e) => {
            eprintln!("list hdr_index error: {e}");
            HttpResponse::InternalServerError().finish()
        }
    }
}

// GET /hdr_indexes/{id}
pub async fn get_by_id(
    pool: web::Data<DbPool>,
    path: web::Path<i32>,
) -> impl Responder {
    let id = path.into_inner();
    let row = sqlx::query_as::<_, HdrIndex>(
        r#"SELECT index_id, schema_id, entity_id, index_type, name_logical, name_physical
            FROM hdr_index
            WHERE index_id = ?"#,
    )
    .bind(id)
    .fetch_optional(pool.get_ref())
    .await;

    match row {
        Ok(Some(item)) => HttpResponse::Ok().json(item),
        Ok(None) => HttpResponse::NotFound().finish(),
        Err(e) => {
            eprintln!("get hdr_index by id error: {e}");
            HttpResponse::InternalServerError().finish()
        }
    }
}
