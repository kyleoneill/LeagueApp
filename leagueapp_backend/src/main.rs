#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use] extern crate rocket;
#[macro_use] extern crate rocket_contrib;

use rocket_contrib::databases::rusqlite;
use rocket_contrib::serve::StaticFiles;

#[database("sqlite_champions")]
struct ChampDbConn(rusqlite::Connection);

use rocket::{
    http::RawStr,
    response::content,
    response::status::NotFound
};

mod model;
use model::{query_counter, get_champion_build};

#[get("/champion/build/<name>")]
fn champion_build(conn: ChampDbConn, name: &RawStr) -> Result<content::Json<String>, NotFound<String>> {
    Ok(
        get_champion_build(&conn.0, name.as_str())
            .map_err(|_e| NotFound("Champion not found".to_string()))?
            .convert_to_json()
    )
}

#[get("/champion/counter/<name>")]
fn champion_counter(conn: ChampDbConn, name: &RawStr) -> Result<content::Json<String>, NotFound<String>> {
    Ok(
        query_counter(&conn.0, name.as_str())
            .map_err(|_e| NotFound("Champion not found".to_string()))?
            .convert_to_json()
    )
}

fn main() {
    rocket::ignite()
        .attach(ChampDbConn::fairing())
        .mount("/api", routes![champion_build, champion_counter])
        .mount("/", StaticFiles::from(concat!(env!("CARGO_MANIFEST_DIR"), "/static")))
        .launch();
}