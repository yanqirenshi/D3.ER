use actix_web::{web, HttpResponse, Responder};

use crate::models::dtl_relationship::{NewDtlRelationship, DtlRelationship};
use super::DbPool;

// POST /dtl_relationships
pub async fn create(
    pool: web::Data<DbPool>,
    payload: web::Json<NewDtlRelationship>,
) -> impl Responder {
    let body = payload.into_inner();

    // 複合キーのため last_insert_id は使わない
    let exec_res = sqlx::query(
        r#"INSERT INTO dtl_relationship (relationship_id, attributer_id_from, attributer_id_to, description)
           VALUES (?, ?, ?, ?)"#,
    )
    .bind(body.relationship_id)
    .bind(body.attributer_id_from)
    .bind(body.attributer_id_to)
    .bind(&body.description)
    .execute(pool.get_ref())
    .await;

    if let Err(e) = exec_res {
        eprintln!("insert dtl_relationship error: {e}");
        return HttpResponse::InternalServerError().finish();
    }

    let created = sqlx::query_as::<_, DtlRelationship>(
        r#"SELECT relationship_id, attributer_id_from, attributer_id_to, description
            FROM dtl_relationship
            WHERE relationship_id = ? AND attributer_id_from = ? AND attributer_id_to = ?"#,
    )
    .bind(body.relationship_id)
    .bind(body.attributer_id_from)
    .bind(body.attributer_id_to)
    .fetch_one(pool.get_ref())
    .await;

    match created {
        Ok(item) => HttpResponse::Created().json(item),
        Err(e) => {
            eprintln!("fetch created dtl_relationship error: {e}");
            HttpResponse::InternalServerError().finish()
        }
    }
}
