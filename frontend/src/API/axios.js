import axios from 'axios'

const baseURL = 'http://localhost:3001'

/** base url */
export default axios.create({
    baseURL: 'http://172.20.10.7:3001',    //baseURL: 'http://localhost:3001', change this to localhost or your personal ip from the device you are hosting your network on
    headers: {
        "Content-type": "application/json",
    }
});