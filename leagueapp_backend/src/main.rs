#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use] extern crate rocket;
#[macro_use] extern crate rocket_contrib;

use rocket_contrib::databases::rusqlite;
use rocket_contrib::serve::StaticFiles;
use rocket_contrib::json::Json;

#[database("sqlite_champions")]
struct ChampDbConn(rusqlite::Connection);

use rocket::{
    http::RawStr,
    response::status::NotFound
};

mod model;
use model::{ChampionBuild};

#[get("/champion/full/<name>")]
fn champion_full(conn: ChampDbConn, name: &RawStr) -> Result<Json<ChampionBuild>, NotFound<String>> {
    Ok(Json(
        ChampionBuild::generate_build_from_champ_name(&conn.0, name.as_str())
            .map_err(|_e| NotFound("Champion not found".to_string()))?
    ))
}

fn main() {
    rocket::ignite()
        .attach(ChampDbConn::fairing())
        .mount("/api", routes![champion_full])
        .mount("/", StaticFiles::from(concat!(env!("CARGO_MANIFEST_DIR"), "/static")))
        .launch();
}