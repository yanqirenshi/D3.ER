use actix_web::{web, HttpResponse, Responder};

use crate::models::hdr_relationship::{NewHdrRelationship, HdrRelationship};
use super::DbPool;

// POST /hdr_relationships
pub async fn create(
    pool: web::Data<DbPool>,
    payload: web::Json<NewHdrRelationship>,
) -> impl Responder {
    let body = payload.into_inner();

    // relationship_id は AUTO_INCREMENT ではないため、明示指定でINSERT
    let exec_res = sqlx::query(
        r#"INSERT INTO hdr_relationship (
                relationship_id,
                schema_id,
                entity_id_from, entity_id_to,
                degree_from, cardinality_from, optionality_from,
                degree_to, cardinality_to, optionality_to,
                description
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"#,
    )
    .bind(body.relationship_id)
    .bind(body.schema_id)
    .bind(body.entity_id_from)
    .bind(body.entity_id_to)
    .bind(body.degree_from)
    .bind(body.cardinality_from)
    .bind(body.optionality_from)
    .bind(body.degree_to)
    .bind(body.cardinality_to)
    .bind(body.optionality_to)
    .bind(&body.description)
    .execute(pool.get_ref())
    .await;

    if let Err(e) = exec_res {
        eprintln!("insert hdr_relationship error: {e}");
        return HttpResponse::InternalServerError().finish();
    }

    let created = sqlx::query_as::<_, HdrRelationship>(
        r#"SELECT relationship_id,
                  schema_id,
                  entity_id_from, entity_id_to,
                  degree_from, cardinality_from, optionality_from,
                  degree_to, cardinality_to, optionality_to,
                  description
            FROM hdr_relationship WHERE relationship_id = ?"#,
    )
    .bind(body.relationship_id)
    .fetch_one(pool.get_ref())
    .await;

    match created {
        Ok(item) => HttpResponse::Created().json(item),
        Err(e) => {
            eprintln!("fetch created hdr_relationship error: {e}");
            HttpResponse::InternalServerError().finish()
        }
    }
}
