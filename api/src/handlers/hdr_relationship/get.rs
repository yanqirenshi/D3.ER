use actix_web::{web, HttpResponse, Responder};

use crate::models::hdr_relationship::HdrRelationship;
use super::DbPool;

// GET /hdr_relationships
pub async fn list(pool: web::Data<DbPool>) -> impl Responder {
    let res = sqlx::query_as::<_, HdrRelationship>(
        r#"SELECT relationship_id,
                  entity_id_from, entity_id_to,
                  degree_from, cardinality_from, optionality_from,
                  degree_to, cardinality_to, optionality_to,
                  description
            FROM hdr_relationship
            ORDER BY relationship_id"#,
    )
    .fetch_all(pool.get_ref())
    .await;

    match res {
        Ok(items) => HttpResponse::Ok().json(items),
        Err(e) => {
            eprintln!("list hdr_relationship error: {e}");
            HttpResponse::InternalServerError().finish()
        }
    }
}

// GET /hdr_relationships/{id}
pub async fn get_by_id(
    pool: web::Data<DbPool>,
    path: web::Path<i32>,
) -> impl Responder {
    let id = path.into_inner();
    let row = sqlx::query_as::<_, HdrRelationship>(
        r#"SELECT relationship_id,
                  entity_id_from, entity_id_to,
                  degree_from, cardinality_from, optionality_from,
                  degree_to, cardinality_to, optionality_to,
                  description
            FROM hdr_relationship
            WHERE relationship_id = ?"#,
    )
    .bind(id)
    .fetch_optional(pool.get_ref())
    .await;

    match row {
        Ok(Some(item)) => HttpResponse::Ok().json(item),
        Ok(None) => HttpResponse::NotFound().finish(),
        Err(e) => {
            eprintln!("get hdr_relationship by id error: {e}");
            HttpResponse::InternalServerError().finish()
        }
    }
}

