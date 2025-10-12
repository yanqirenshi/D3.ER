use actix_web::{web, HttpResponse, Responder};

use crate::models::dtl_index::{NewDtlIndex, DtlIndex};
use super::DbPool;

// POST /dtl_indexes
pub async fn create(
    pool: web::Data<DbPool>,
    payload: web::Json<NewDtlIndex>,
) -> impl Responder {
    let body = payload.into_inner();

    // index_id は AUTO_INCREMENT ではない前提
    let exec_res = sqlx::query(
        r#"INSERT INTO dtl_index (
                index_id, attributer_id, description
            ) VALUES (?, ?, ?)"#,
    )
    .bind(body.index_id)
    .bind(body.attributer_id)
    .bind(&body.description)
    .execute(pool.get_ref())
    .await;

    if let Err(e) = exec_res {
        eprintln!("insert dtl_index error: {e}");
        return HttpResponse::InternalServerError().finish();
    }

    let created = sqlx::query_as::<_, DtlIndex>(
        r#"SELECT index_id, attributer_id, description
            FROM dtl_index WHERE index_id = ?"#,
    )
    .bind(body.index_id)
    .fetch_one(pool.get_ref())
    .await;

    match created {
        Ok(item) => HttpResponse::Created().json(item),
        Err(e) => {
            eprintln!("fetch created dtl_index error: {e}");
            HttpResponse::InternalServerError().finish()
        }
    }
}

