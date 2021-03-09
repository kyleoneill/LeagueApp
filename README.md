# LeagueApp

A webapp that displays build and counter information for each champion in League of Legends.

The frontend is React (Node.Js) and the backend is Rocket (Rust). The database is built using [this repository](https://github.com/kyleoneill/leaguebuilder).

<br />

## Running

### Build the frontend
```sh
$ npm run build
```

- Move everything from the build folder into a folder in the backend root named `static`

<br />

### Build the backend 
```sh
$ cargo build --release
```

The built exe must be run from the context where the sqlite database is located. The example here assumes that the `champions.sqlite` file is in the crate root

```sh
$ sudo ./target/release/leagueapp_backend &
```