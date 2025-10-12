use actix_web::{web, HttpResponse, Responder};
use serde::Deserialize;

use crate::models::edges::Edge;
use super::DbPool;

#[derive(Debug, Deserialize)]
pub struct EdgesQuery {
    pub schema_id: Option<i32>,
}

// GET /edges?schema_id=1
pub async fn list(
    pool: web::Data<DbPool>,
    query: web::Query<EdgesQuery>,
) -> impl Responder {
    let schema_id = query.schema_id.unwrap_or(1);

    let sql = r#"
            SELECT t1.schema_id
                 , t3.column_id      AS from_id
                 , 'COLUMN'          AS from_class
                 , t3.attributer_id  AS to_id
                 , 'COLUMN-INSTANCE' AS to_class
                 , 'INSTANCE-OF'     AS data_type
                 , FALSE             AS hide
              FROM rs_schema t1
        INNER JOIN th_schema_entity t2 ON t1.schema_id = t2.schema_id
        INNER JOIN ev_attribute     t3 ON t2.entity_id = t3.entity_id
             WHERE t1.schema_id = ?

             UNION ALL

            SELECT t1.schema_id
                 , t3.entity_id      AS from_id
                 , 'TABLE'           AS from_class
                 , t3.attributer_id  AS to_id
                 , 'COLUMN-INSTANCE' AS to_class
                 , 'INSTANCE-OF'     AS data_type
                 , FALSE             AS hide
              FROM rs_schema t1
        INNER JOIN th_schema_entity t2 ON t1.schema_id = t2.schema_id
        INNER JOIN ev_attribute     t3 ON t2.entity_id = t3.entity_id
             WHERE t1.schema_id = ?
    "#;

    let res = sqlx::query_as::<_, Edge>(sql)
        .bind(schema_id)
        .bind(schema_id)
        .fetch_all(pool.get_ref())
        .await;

    match res {
        Ok(items) => HttpResponse::Ok().json(items),
        Err(e) => {
            eprintln!("list edges error: {e}");
            HttpResponse::InternalServerError().finish()
        }
    }
}
