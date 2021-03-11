const axios = require("axios");

export async function getChampionInfo(name) {
    return axios.get(`/api/champion/full/${name}`)
}