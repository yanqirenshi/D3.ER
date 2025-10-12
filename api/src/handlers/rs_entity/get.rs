use actix_web::{web, HttpResponse, Responder};

use crate::models::rs_entity::RsEntity;
use super::DbPool;

// GET /rs_entities
pub async fn list(pool: web::Data<DbPool>) -> impl Responder {
    let res = sqlx::query_as::<_, RsEntity>(
        r#"SELECT entity_id, name_logical, name_physical, description,
                  position_x, position_y, position_z, size_w, size_h
            FROM rs_entity
            ORDER BY entity_id"#,
    )
    .fetch_all(pool.get_ref())
    .await;

    match res {
        Ok(items) => HttpResponse::Ok().json(items),
        Err(e) => {
            eprintln!("list rs_entity error: {e}");
            HttpResponse::InternalServerError().finish()
        }
    }
}

// GET /rs_entities/{id}
pub async fn get_by_id(
    pool: web::Data<DbPool>,
    path: web::Path<i32>,
) -> impl Responder {
    let id = path.into_inner();
    let row = sqlx::query_as::<_, RsEntity>(
        r#"SELECT entity_id, name_logical, name_physical, description,
                  position_x, position_y, position_z, size_w, size_h
            FROM rs_entity
            WHERE entity_id = ?"#,
    )
    .bind(id)
    .fetch_optional(pool.get_ref())
    .await;

    match row {
        Ok(Some(item)) => HttpResponse::Ok().json(item),
        Ok(None) => HttpResponse::NotFound().finish(),
        Err(e) => {
            eprintln!("get rs_entity by id error: {e}");
            HttpResponse::InternalServerError().finish()
        }
    }
}

