use actix_web::{web, HttpResponse, Responder};

use crate::models::rs_column::{NewRsColumn, RsColumn};
use super::DbPool;

// POST /rs_columns
pub async fn create(
    pool: web::Data<DbPool>,
    payload: web::Json<NewRsColumn>,
) -> impl Responder {
    let body = payload.into_inner();

    let exec_res = sqlx::query(
        r#"INSERT INTO rs_column (
                name_logical, name_physical, value_type, value_length, description
            ) VALUES (?, ?, ?, ?, ?)"#,
    )
    .bind(&body.name_logical)
    .bind(&body.name_physical)
    .bind(&body.value_type)
    .bind(&body.value_length)
    .bind(&body.description)
    .execute(pool.get_ref())
    .await;

    let last_id = match exec_res {
        Ok(r) => r.last_insert_id(),
        Err(e) => {
            eprintln!("insert rs_column error: {e}");
            return HttpResponse::InternalServerError().finish();
        }
    };

    let id_i32: i32 = match i32::try_from(last_id) {
        Ok(v) => v,
        Err(_) => return HttpResponse::InternalServerError().finish(),
    };

    let created = sqlx::query_as::<_, RsColumn>(
        r#"SELECT column_id, name_logical, name_physical, value_type, value_length, description
            FROM rs_column WHERE column_id = ?"#,
    )
    .bind(id_i32)
    .fetch_one(pool.get_ref())
    .await;

    match created {
        Ok(item) => HttpResponse::Created().json(item),
        Err(e) => {
            eprintln!("fetch created rs_column error: {e}");
            HttpResponse::InternalServerError().finish()
        }
    }
}

