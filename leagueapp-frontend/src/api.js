const axios = require("axios");

export async function getChampionBuild(name) {
    return axios.get(`/api/champion/${name}`)
}