use actix_web::{web, HttpResponse, Responder};

use crate::models::dtl_relationship::DtlRelationship;
use super::DbPool;

// GET /dtl_relationships
pub async fn list(pool: web::Data<DbPool>) -> impl Responder {
    let res = sqlx::query_as::<_, DtlRelationship>(
        r#"
          SELECT relationship_id
               , attributer_id_from
               , attributer_id_to
               , description
            FROM dtl_relationship
        ORDER BY relationship_id
               , attributer_id_from
               , attributer_id_to
        "#,
    )
    .fetch_all(pool.get_ref())
    .await;

    match res {
        Ok(items) => HttpResponse::Ok().json(items),
        Err(e) => {
            eprintln!("list dtl_relationship error: {e}");
            HttpResponse::InternalServerError().finish()
        }
    }
}

// GET /dtl_relationships/{relationship_id}/{attributer_id_from}/{attributer_id_to}
pub async fn get_by_id(
    pool: web::Data<DbPool>,
    path: web::Path<(i32, i32, i32)>,
) -> impl Responder {
    let (relationship_id, attributer_id_from, attributer_id_to) = path.into_inner();
    let row = sqlx::query_as::<_, DtlRelationship>(
        r#"
          SELECT relationship_id
               , attributer_id_from
               , attributer_id_to
               , description
            FROM dtl_relationship
           WHERE relationship_id    = ?
             AND attributer_id_from = ?
             AND attributer_id_to   = ?
        "#,
    )
    .bind(relationship_id)
    .bind(attributer_id_from)
    .bind(attributer_id_to)
    .fetch_optional(pool.get_ref())
    .await;

    match row {
        Ok(Some(item)) => HttpResponse::Ok().json(item),
        Ok(None) => HttpResponse::NotFound().finish(),
        Err(e) => {
            eprintln!("get dtl_relationship by id error: {e}");
            HttpResponse::InternalServerError().finish()
        }
    }
}
