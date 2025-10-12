use actix_web::{web, HttpResponse, Responder};

use crate::models::rs_schema::RsSchema;
use super::DbPool;

// GET /rs_schemas
pub async fn list(pool: web::Data<DbPool>) -> impl Responder {
    let res = sqlx::query_as::<_, RsSchema>(
        r#"SELECT schema_id, name_logical, name_physical, description
            FROM rs_schema"#,
    )
    .fetch_all(pool.get_ref())
    .await;

    match res {
        Ok(items) => HttpResponse::Ok().json(items),
        Err(e) => {
            eprintln!("list rs_schema error: {e}");
            HttpResponse::InternalServerError().finish()
        }
    }
}

// GET /rs_schemas/{id}
pub async fn get_by_id(
    pool: web::Data<DbPool>,
    path: web::Path<i32>,
) -> impl Responder {
    let id = path.into_inner();
    let row = sqlx::query_as::<_, RsSchema>(
        r#"
           SELECT schema_id
                , name_logical
                , name_physical
                , description
             FROM rs_schema
            WHERE schema_id = ?
        "#,
    )
    .bind(id)
    .fetch_optional(pool.get_ref())
    .await;

    match row {
        Ok(Some(item)) => HttpResponse::Ok().json(item),
        Ok(None) => HttpResponse::NotFound().finish(),
        Err(e) => {
            eprintln!("get rs_schema by id error: {e}");
            HttpResponse::InternalServerError().finish()
        }
    }
}
