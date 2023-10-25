use axum::{Router, routing::{get}, ServiceExt};

#[tokio::main]
async fn main() {
    let app = Router::new()
        .route("/test", get(get_test));

    axum::Server::bind(&"0.0.0.0:3010".parse().unwrap())
        .serve(app.into_make_service())
        .await
        .unwrap();
}

async fn get_test() -> &'static str {
    "test"
}
