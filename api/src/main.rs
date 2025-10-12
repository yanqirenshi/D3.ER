mod models;
mod handlers;
use actix_web::{get, web, App, HttpResponse, HttpServer, Responder};
use actix_web::http::header;
use actix_cors::Cors;
use sqlx::{mysql::MySqlPoolOptions, MySql, Pool};


#[get("/health")]
async fn health(db: web::Data<Pool<MySql>>) -> impl Responder {
    // DBに簡易アクセスして疎通確認
    let ok = sqlx::query_scalar::<_, i64>("SELECT 1")
        .fetch_one(db.get_ref())
        .await
        .is_ok();

    if ok {
        HttpResponse::Ok().body("ok")
    } else {
        HttpResponse::InternalServerError().body("db:ng")
    }
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    // .envから環境変数を読み込み（任意）
    let _ = dotenvy::dotenv();

    // 設定（環境変数）：
    // - DATABASE_URL: Postgres接続文字列
    // - HOST, PORT: バインド先（任意）
    let database_url = std::env::var("DATABASE_URL")
        .expect("env DATABASE_URL が設定されていません");
    let host = std::env::var("HOST").unwrap_or_else(|_| "127.0.0.1".into());
    let port: u16 = std::env::var("PORT").ok().and_then(|v| v.parse().ok()).unwrap_or(8080);

    let pool = MySqlPoolOptions::new()
        .max_connections(5)
        .connect(&database_url)
        .await
        .expect("DB接続に失敗しました");

    println!("Listening on http://{}:{}", host, port);

    HttpServer::new(move || {
        App::new()
            .wrap(
                Cors::default()
                    .allowed_origin("http://localhost:3008")
                    .allowed_methods(vec!["GET", "PUT", "POST", "OPTIONS"])
                    .allowed_headers(vec![header::CONTENT_TYPE])
                    .supports_credentials()
            )
            .app_data(web::Data::new(pool.clone()))
            .service(health)
            .route("/schemas",             web::get().to(handlers::rs_schema::list))
            .route("/schemas",             web::post().to(handlers::rs_schema::create))
            .route("/schemas/{schema_id}", web::get().to(handlers::rs_schema::get_by_id))
            .route("/entities",             web::get().to(handlers::rs_entity::list))
            .route("/entities",             web::post().to(handlers::rs_entity::create))
            .route("/entities/{entity_id}", web::get().to(handlers::rs_entity::get_by_id))
            .route("/columns",             web::get().to(handlers::rs_column::list))
            .route("/columns",             web::post().to(handlers::rs_column::create))
            .route("/columns/{column_id}", web::get().to(handlers::rs_column::get_by_id))
            .route("/attributes",                web::get().to(handlers::ev_attribute::list))
            .route("/attributes",                web::post().to(handlers::ev_attribute::create))
            .route("/attributes/{attribute_id}", web::get().to(handlers::ev_attribute::get_by_id))
            .route("/indexes",            web::get().to(handlers::hdr_index::list))
            .route("/indexes",            web::post().to(handlers::hdr_index::create))
            .route("/indexes/{index_id}", web::get().to(handlers::hdr_index::get_by_id))
            .route("/indexes/{index_id}details",                   web::get().to(handlers::dtl_index::list))
            .route("/indexes/{index_id}details",                   web::post().to(handlers::dtl_index::create))
            .route("/indexes/{index_id}details/{index_detail_id}", web::get().to(handlers::dtl_index::get_by_id))
            .route("/relationships",                   web::get().to(handlers::hdr_relationship::list))
            .route("/relationships",                   web::post().to(handlers::hdr_relationship::create))
            .route("/relationships/{relationship_id}", web::get().to(handlers::hdr_relationship::get_by_id))
            .route("/relationships/{relationship_id}details",                          web::get().to(handlers::dtl_relationship::list))
            .route("/relationships/{relationship_id}details",                          web::post().to(handlers::dtl_relationship::create))
            .route("/relationships/{relationship_id}details/{relationship_detail_id}", web::get().to(handlers::dtl_relationship::get_by_id))
            .route("/th/schema-entities",                         web::get().to(handlers::th_schema_entity::list))
            .route("/th/schema-entities/{schema_id}.{entity_id}", web::get().to(handlers::th_schema_entity::get_by_id))
            .route("/th/schema-entities/{schema_id}.{entity_id}", web::post().to(handlers::th_schema_entity::create))
            .route("/edges",                                      web::get().to(handlers::edges::list))
    })
        .bind((host.as_str(), port))?
        .run()
        .await
}
