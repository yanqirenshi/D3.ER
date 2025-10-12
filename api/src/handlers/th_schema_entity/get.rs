use actix_web::{web, HttpResponse, Responder};

use crate::models::th_schema_entity::ThSchemaEntity;
use super::DbPool;

// GET /th_schema_entities
pub async fn list(pool: web::Data<DbPool>) -> impl Responder {
    let res = sqlx::query_as::<_, ThSchemaEntity>(
        r#"SELECT schema_id, entity_id
            FROM th_schema_entity
            ORDER BY schema_id, entity_id"#,
    )
    .fetch_all(pool.get_ref())
    .await;

    match res {
        Ok(items) => HttpResponse::Ok().json(items),
        Err(e) => {
            eprintln!("list th_schema_entity error: {e}");
            HttpResponse::InternalServerError().finish()
        }
    }
}

// GET /th_schema_entities/{schema_id}/{entity_id}
pub async fn get_by_id(
    pool: web::Data<DbPool>,
    path: web::Path<(i32, i32)>,
) -> impl Responder {
    let (schema_id, entity_id) = path.into_inner();
    let row = sqlx::query_as::<_, ThSchemaEntity>(
        r#"SELECT schema_id, entity_id
            FROM th_schema_entity
            WHERE schema_id = ? AND entity_id = ?"#,
    )
    .bind(schema_id)
    .bind(entity_id)
    .fetch_optional(pool.get_ref())
    .await;

    match row {
        Ok(Some(item)) => HttpResponse::Ok().json(item),
        Ok(None) => HttpResponse::NotFound().finish(),
        Err(e) => {
            eprintln!("get th_schema_entity by id error: {e}");
            HttpResponse::InternalServerError().finish()
        }
    }
}

