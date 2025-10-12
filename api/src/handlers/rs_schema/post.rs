use actix_web::{web, HttpResponse, Responder};

use crate::models::rs_schema::{NewRsSchema, RsSchema};
use super::DbPool;

// POST /rs_schemas
pub async fn create(
    pool: web::Data<DbPool>,
    payload: web::Json<NewRsSchema>,
) -> impl Responder {
    let body = payload.into_inner();

    // INSERT 実行
    let exec_res = sqlx::query(
        r#"
          INSERT
            INTO rs_schema
               (
                 name_logical
               , name_physical
               , description
               )
          VALUES (?, ?, ?)
        "#,
    )
    .bind(&body.name_logical)
    .bind(&body.name_physical)
    .bind(&body.description)
    .execute(pool.get_ref())
    .await;

    let last_id = match exec_res {
        Ok(r) => r.last_insert_id(),
        Err(e) => {
            eprintln!("insert rs_schema error: {e}");
            return HttpResponse::InternalServerError().finish();
        }
    };

    // 生成したレコードを取得して返す
    let id_i32: i32 = match i32::try_from(last_id) {
        Ok(v) => v,
        Err(_) => return HttpResponse::InternalServerError().finish(),
    };

    let created = sqlx::query_as::<_, RsSchema>(
        r#"SELECT schema_id, name_logical, name_physical, description
            FROM rs_schema WHERE schema_id = ?"#,
    )
    .bind(id_i32)
    .fetch_one(pool.get_ref())
    .await;

    match created {
        Ok(item) => HttpResponse::Created().json(item),
        Err(e) => {
            eprintln!("fetch created rs_schema error: {e}");
            HttpResponse::InternalServerError().finish()
        }
    }
}
