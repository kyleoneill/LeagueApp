const axios = require("axios");

export async function getChampionBuild(name) {
    return axios.get(`/api/champion/build/${name}`)
}

export async function getChampionCounter(name) {
    return axios.get(`/api/champion/counter/${name}`)
}