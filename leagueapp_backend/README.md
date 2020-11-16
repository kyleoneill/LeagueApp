# Backend

## Running

Build the frontend with `npm run build` and move everything from the build folder into a folder in the backend root named `static`.

Build a release version with `cargo build --release`. The built exe must be run from the context where the sqlite database is located. Ex, if the `champions.sqlite` file is located in root then run the backend with `sudo ./target/release/leagueapp_backend &`. The ampersand runs the program in the background so it is not tied to the terminal that runs it.