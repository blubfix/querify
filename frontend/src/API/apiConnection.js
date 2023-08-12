import axios from './axios';

// read user
const getUser = () => {
    return axios.get('/user');
};
// login user
const postUserLogin = (data) => {
    return axios.post('/user/login', data);
};
// signup user
const postUserSignUp = (data) => {
    return axios.post('/user/signUp', data);
};


// read question
const getQuestion = () => {
    return  axios.get('/question');
};


export default {
    getQuestion,
    getUser,
    postUserLogin,
    postUserSignUp,
}