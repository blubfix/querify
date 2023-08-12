import axios from 'axios'

const baseURL = 'http://localhost:3001'

/** base url */
export default axios.create({
    baseURL: 'http://localhost:3001',
    headers: {
        "Content-type": "application/json",
    }
});