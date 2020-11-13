#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use] extern crate rocket;
#[macro_use] extern crate rocket_contrib;

use rocket_contrib::databases::rusqlite;

#[database("sqlite_champions")]
struct ChampDbConn(rusqlite::Connection);

use rocket::{
    http::RawStr,
    response::content,
    response::status::NotFound
};

mod model;
use model::query_build;

#[get("/")]
fn index() -> &'static str {
    "Hello, world!"
}

#[get("/api/champion/<name>")]
fn champion(conn: ChampDbConn, name: &RawStr) -> Result<content::Json<String>, NotFound<String>> {
    Ok(
        query_build(&conn.0, name.as_str())
            .map_err(|_e| NotFound("Champion not found".to_string()))?
            .convert_to_json()
    )
}

fn main() {
    rocket::ignite()
        .attach(ChampDbConn::fairing())
        .mount("/", routes![index, champion])
        .launch();
}