use actix_web::{web, HttpResponse, Responder};

use crate::models::hdr_index::{NewHdrIndex, HdrIndex};
use super::DbPool;

// POST /hdr_indexes
pub async fn create(
    pool: web::Data<DbPool>,
    payload: web::Json<NewHdrIndex>,
) -> impl Responder {
    let body = payload.into_inner();

    let exec_res = sqlx::query(
        r#"INSERT INTO hdr_index (
                schema_id, entity_id, index_type, name_logical, name_physical
            ) VALUES (?, ?, ?, ?, ?)"#,
    )
    .bind(body.schema_id)
    .bind(body.entity_id)
    .bind(&body.index_type)
    .bind(&body.name_logical)
    .bind(&body.name_physical)
    .execute(pool.get_ref())
    .await;

    let last_id = match exec_res {
        Ok(r) => r.last_insert_id(),
        Err(e) => {
            eprintln!("insert hdr_index error: {e}");
            return HttpResponse::InternalServerError().finish();
        }
    };

    let id_i32: i32 = match i32::try_from(last_id) {
        Ok(v) => v,
        Err(_) => return HttpResponse::InternalServerError().finish(),
    };

    let created = sqlx::query_as::<_, HdrIndex>(
        r#"SELECT index_id, schema_id, entity_id, index_type, name_logical, name_physical
            FROM hdr_index WHERE index_id = ?"#,
    )
    .bind(id_i32)
    .fetch_one(pool.get_ref())
    .await;

    match created {
        Ok(item) => HttpResponse::Created().json(item),
        Err(e) => {
            eprintln!("fetch created hdr_index error: {e}");
            HttpResponse::InternalServerError().finish()
        }
    }
}
