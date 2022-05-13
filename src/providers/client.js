import axios from "axios";

// const apiURL = process.env.REACT_APP_API_URL
const apiURL = 'https://api.spaceflightnewsapi.net/v3'

const instance = axios.create({
    baseURL: apiURL
})

export default instance
