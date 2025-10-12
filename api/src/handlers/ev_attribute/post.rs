use actix_web::{web, HttpResponse, Responder};

use crate::models::ev_attribute::{NewEvAttribute, EvAttribute};
use super::DbPool;

// POST /ev_attributes
pub async fn create(
    pool: web::Data<DbPool>,
    payload: web::Json<NewEvAttribute>,
) -> impl Responder {
    let body = payload.into_inner();

    let exec_res = sqlx::query(
        r#"INSERT INTO ev_attribute (
                entity_id, column_id,
                name_logical, name_physical, description,
                `order`, is_not_null
            ) VALUES (?, ?, ?, ?, ?, ?, ?)"#,
    )
    .bind(body.entity_id)
    .bind(body.column_id)
    .bind(&body.name_logical)
    .bind(&body.name_physical)
    .bind(&body.description)
    .bind(body.order)
    .bind(body.is_not_null)
    .execute(pool.get_ref())
    .await;

    let last_id = match exec_res {
        Ok(r) => r.last_insert_id(),
        Err(e) => {
            eprintln!("insert ev_attribute error: {e}");
            return HttpResponse::InternalServerError().finish();
        }
    };

    let id_i32: i32 = match i32::try_from(last_id) {
        Ok(v) => v,
        Err(_) => return HttpResponse::InternalServerError().finish(),
    };

    let created = sqlx::query_as::<_, EvAttribute>(
        r#"SELECT attributer_id, entity_id, column_id,
                  name_logical, name_physical, description,
                  `order` as `order`, is_not_null
            FROM ev_attribute WHERE attributer_id = ?"#,
    )
    .bind(id_i32)
    .fetch_one(pool.get_ref())
    .await;

    match created {
        Ok(item) => HttpResponse::Created().json(item),
        Err(e) => {
            eprintln!("fetch created ev_attribute error: {e}");
            HttpResponse::InternalServerError().finish()
        }
    }
}

