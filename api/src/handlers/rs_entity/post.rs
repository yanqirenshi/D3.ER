use actix_web::{web, HttpResponse, Responder};

use crate::models::rs_entity::{NewRsEntity, RsEntity};
use super::DbPool;

// POST /rs_entities
pub async fn create(
    pool: web::Data<DbPool>,
    payload: web::Json<NewRsEntity>,
) -> impl Responder {
    let body = payload.into_inner();

    let exec_res = sqlx::query(
        r#"INSERT INTO rs_entity (
                name_logical, name_physical, description,
                position_x, position_y, position_z, size_w, size_h
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"#,
    )
    .bind(&body.name_logical)
    .bind(&body.name_physical)
    .bind(&body.description)
    .bind(body.position_x)
    .bind(body.position_y)
    .bind(body.position_z)
    .bind(body.size_w)
    .bind(body.size_h)
    .execute(pool.get_ref())
    .await;

    let last_id = match exec_res {
        Ok(r) => r.last_insert_id(),
        Err(e) => {
            eprintln!("insert rs_entity error: {e}");
            return HttpResponse::InternalServerError().finish();
        }
    };

    let id_i32: i32 = match i32::try_from(last_id) {
        Ok(v) => v,
        Err(_) => return HttpResponse::InternalServerError().finish(),
    };

    let created = sqlx::query_as::<_, RsEntity>(
        r#"SELECT entity_id, name_logical, name_physical, description,
                  position_x, position_y, position_z, size_w, size_h
            FROM rs_entity WHERE entity_id = ?"#,
    )
    .bind(id_i32)
    .fetch_one(pool.get_ref())
    .await;

    match created {
        Ok(item) => HttpResponse::Created().json(item),
        Err(e) => {
            eprintln!("fetch created rs_entity error: {e}");
            HttpResponse::InternalServerError().finish()
        }
    }
}

