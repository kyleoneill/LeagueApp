use rusqlite::{Connection, Result};
use rocket::response::content;

#[derive(Debug)]
pub struct Counter {
    champion: String,
    strong_against: String,
    weak_against: String
}

impl Counter {
    pub fn convert_to_json(&self) -> content::Json<String> {
        content::Json(
            format!("
            {{ 
                \"champion\": \"{0}\",\n
                \"strong_against\": \"{1}\",\n
                \"weak_against\": \"{2}\"
            }}
            ",
                self.champion,
                self.strong_against,
                self.weak_against
            )
        )
    }
}

#[derive(Debug)]
pub struct Build {
    champion: String,
    items: String,
    rune_primary: String,
    rune_secondary: String,
    rune_tertiary: String
}

pub struct ChampionBuild {
    counters: Counter,
    build: Build
}

impl ChampionBuild {
    pub fn convert_to_json(&self) -> content::Json<String> {
        content::Json(
            format!("
            {{ 
                \"champion\": \"{0}\",\n
                \"items\": \"{1}\",\n
                \"runePrimary\": \"{2}\",\n
                \"runeSecondary\": \"{3}\",\n
                \"runeTertiary\": \"{4}\",\n
                \"strongAgainst\": \"{5}\",\n
                \"weakAgainst\": \"{6}\"
            }}
            ",
                self.build.champion,
                self.build.items,
                self.build.rune_primary,
                self.build.rune_secondary,
                self.build.rune_tertiary,
                self.counters.strong_against,
                self.counters.weak_against
            )
        )
    }
}

pub fn query_build(conn: &Connection, champ_name: &str) -> Result<Build> {
    let mut build_stmt = conn.prepare("SELECT * FROM builds WHERE champion = :champion")?;
    let mut build_rows = build_stmt.query_named(&[(":champion", &champ_name)])?;
    let build: Build;
    if let Some(Ok(build_row)) = build_rows.next() {
        build = Build {
            champion: build_row.get(0),
            items: build_row.get(1),
            rune_primary: build_row.get(2),
            rune_secondary: build_row.get(3),
            rune_tertiary: build_row.get(4)
        };
    }
    else {
        return Err(rusqlite::Error::QueryReturnedNoRows);
    }

    Ok(build)
}

pub fn query_counter(conn: &Connection, champ_name: &str) -> Result<Counter> {
    let mut counter_stmt = conn.prepare("SELECT * FROM counters WHERE champion = :champion")?;
    let mut counter_rows = counter_stmt.query_named(&[(":champion", &champ_name)])?;
    let counters: Counter;
    if let Some(Ok(counter_row)) = counter_rows.next() {
        counters = Counter {
            champion: counter_row.get(0),
            strong_against: counter_row.get(1),
            weak_against: counter_row.get(2)
        };
    }
    else {
        return Err(rusqlite::Error::QueryReturnedNoRows);
    }
    Ok(counters)
}

pub fn get_champion_build(conn: &Connection, champ_name: &str) -> Result<ChampionBuild> {
    let counters = query_counter(conn, champ_name)?;
    let build = query_build(conn, champ_name)?;
    let champ_build = ChampionBuild{
        counters,
        build
    };
    Ok(champ_build)
}