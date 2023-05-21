
const url = 'http://192.168.178.161:3001';


const getUser = async () => {
    const apiroute = "/user";

    console.log(url+apiroute)

    try {
        const response = await fetch(url+apiroute);
        const json = await response.json();
        console.log(json)
    }
    catch (error) {
        console.error(error);
    }
    finally {
        const loading = false;
    }
}


export default {
    getUser
}