use rusqlite::{Connection, Result};
use serde::{Serialize, Deserialize};

//champion, counter, items, runes

#[derive(Debug)]
#[derive(Serialize, Deserialize)]
pub struct Champion {
    name: String,
    win_rate: f64,
    pick_rate: f64,
    ban_rate: f64,
    human_readable_name: String,
    title: String
}

impl Champion {
    fn query_one_row(conn: &Connection, champ_name: &str) -> Result<Self> {
        let mut stmt = conn.prepare("SELECT * FROM Champions WHERE champName = :champion")?;
        let mut rows = stmt.query_named(&[(":champion", &champ_name)])?;
        let champion: Self;
        if let Some(Ok(row)) = rows.next() {
            champion = Self {
                name: row.get(1),
                win_rate: row.get(2),
                pick_rate: row.get(3),
                ban_rate: row.get(4),
                human_readable_name: row.get(5),
                title: row.get(6)
            };
        }
        else {
            return Err(rusqlite::Error::QueryReturnedNoRows);
        }
    
        Ok(champion)
    }
}

#[derive(Debug)]
#[derive(Serialize, Deserialize)]
pub struct Counter {
    name: String,
    strong_against: String,
    weak_against: String
}

impl Counter {
    fn query_one_row(conn: &Connection, champ_name: &str) -> Result<Self> {
        let mut stmt = conn.prepare("SELECT * FROM Counters WHERE counterChampionName = :champion")?;
        let mut rows = stmt.query_named(&[(":champion", &champ_name)])?;
        let counter: Self;
        if let Some(Ok(row)) = rows.next() {
            counter = Self {
                name: row.get(1),
                strong_against: row.get(2),
                weak_against: row.get(3),
            };
        }
        else {
            return Err(rusqlite::Error::QueryReturnedNoRows);
        }
    
        Ok(counter)
    }
}

#[derive(Debug)]
#[derive(Serialize, Deserialize)]
pub struct Items {
    name: String,
    starting: String,
    mythic_core: String,
    fourth: String,
    fifth: String,
    sixth: String
}

impl Items {
    fn query_one_row(conn: &Connection, champ_name: &str) -> Result<Self> {
        let mut stmt = conn.prepare("SELECT * FROM Items WHERE itemChampionName = :champion")?;
        let mut rows = stmt.query_named(&[(":champion", &champ_name)])?;
        let items: Self;
        if let Some(Ok(row)) = rows.next() {
            items = Self {
                name: row.get(1),
                starting: row.get(2),
                mythic_core: row.get(3),
                fourth: row.get(4),
                fifth: row.get(5),
                sixth: row.get(6),
            };
        }
        else {
            return Err(rusqlite::Error::QueryReturnedNoRows);
        }
    
        Ok(items)
    }
}

#[derive(Debug)]
#[derive(Serialize, Deserialize)]
pub struct Runes {
    name: String,
    rune_primary: String,
    rune_secondary: String,
    rune_tertiary: String
}

impl Runes {
    fn query_one_row(conn: &Connection, champ_name: &str) -> Result<Self> {
        let mut stmt = conn.prepare("SELECT * FROM Runes WHERE runeChampionName = :champion")?;
        let mut rows = stmt.query_named(&[(":champion", &champ_name)])?;
        let runes: Self;
        if let Some(Ok(row)) = rows.next() {
            runes = Self {
                name: row.get(1),
                rune_primary: row.get(2),
                rune_secondary: row.get(3),
                rune_tertiary: row.get(4),
            };
        }
        else {
            return Err(rusqlite::Error::QueryReturnedNoRows);
        }
    
        Ok(runes)
    }
}

#[derive(Serialize, Deserialize)]
pub struct ChampionBuild {
    champ_stats: Champion,
    counters: Counter,
    items: Items,
    runes: Runes
}

impl ChampionBuild {
    pub fn generate_build_from_champ_name(conn: &Connection, champ_name: &str) -> Result<Self> {
        let champ_stats = Champion::query_one_row(conn, champ_name).unwrap();
        let counters = Counter::query_one_row(conn, champ_name).unwrap();
        let items = Items::query_one_row(conn, champ_name).unwrap();
        let runes = Runes::query_one_row(conn, champ_name).unwrap();
        Ok(Self {
            champ_stats,
            counters,
            items,
            runes
        })
    }
}