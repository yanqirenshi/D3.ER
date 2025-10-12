use actix_web::{web, HttpResponse, Responder};

use crate::models::th_schema_entity::{NewThSchemaEntity, ThSchemaEntity};
use super::DbPool;

// POST /th_schema_entities
pub async fn create(
    pool: web::Data<DbPool>,
    payload: web::Json<NewThSchemaEntity>,
) -> impl Responder {
    let body = payload.into_inner();

    // INSERT（複合主キーのため last_insert_id は使わない）
    let exec_res = sqlx::query(
        r#"INSERT INTO th_schema_entity (schema_id, entity_id)
           VALUES (?, ?)"#,
    )
    .bind(body.schema_id)
    .bind(body.entity_id)
    .execute(pool.get_ref())
    .await;

    if let Err(e) = exec_res {
        eprintln!("insert th_schema_entity error: {e}");
        return HttpResponse::InternalServerError().finish();
    }

    // 挿入したレコードを返す
    let created = sqlx::query_as::<_, ThSchemaEntity>(
        r#"SELECT schema_id, entity_id
            FROM th_schema_entity
            WHERE schema_id = ? AND entity_id = ?"#,
    )
    .bind(body.schema_id)
    .bind(body.entity_id)
    .fetch_one(pool.get_ref())
    .await;

    match created {
        Ok(item) => HttpResponse::Created().json(item),
        Err(e) => {
            eprintln!("fetch created th_schema_entity error: {e}");
            HttpResponse::InternalServerError().finish()
        }
    }
}

