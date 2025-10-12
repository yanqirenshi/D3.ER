use actix_web::{web, HttpResponse, Responder};

use crate::models::ev_attribute::EvAttribute;
use super::DbPool;

// GET /ev_attributes
pub async fn list(pool: web::Data<DbPool>) -> impl Responder {
    let res = sqlx::query_as::<_, EvAttribute>(
        r#"SELECT attributer_id, entity_id, column_id,
                  name_logical, name_physical, description,
                  `order` as `order`, is_not_null
            FROM ev_attribute
            ORDER BY attributer_id"#,
    )
    .fetch_all(pool.get_ref())
    .await;

    match res {
        Ok(items) => HttpResponse::Ok().json(items),
        Err(e) => {
            eprintln!("list ev_attribute error: {e}");
            HttpResponse::InternalServerError().finish()
        }
    }
}

// GET /ev_attributes/{id}
pub async fn get_by_id(
    pool: web::Data<DbPool>,
    path: web::Path<i32>,
) -> impl Responder {
    let id = path.into_inner();
    let row = sqlx::query_as::<_, EvAttribute>(
        r#"SELECT attributer_id, entity_id, column_id,
                  name_logical, name_physical, description,
                  `order` as `order`, is_not_null
            FROM ev_attribute
            WHERE attributer_id = ?"#,
    )
    .bind(id)
    .fetch_optional(pool.get_ref())
    .await;

    match row {
        Ok(Some(item)) => HttpResponse::Ok().json(item),
        Ok(None) => HttpResponse::NotFound().finish(),
        Err(e) => {
            eprintln!("get ev_attribute by id error: {e}");
            HttpResponse::InternalServerError().finish()
        }
    }
}

