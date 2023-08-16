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
    console.log("axios:",data)
    return axios.post('/user/signUp', data);
};
// get question from this week
const getQuestionFromThisWeek = () => {
    return  axios.get('/question/thisweek');
};
// get question from this month
const getQuestionFromThisMonth = () => {
    return axios.get('/question/thismonth');
};
// get question by user
const getQuestionByUser = (userID) => {
    console.log("axios:",userID);
    return axios.get('/question/user/'+userID);
}
// get user answers with question info
const getUserAnswersWithQuestionInfo = (userID) => {
    return axios.get('/answerGiven/questioninfo/user/'+userID);
}

// create question
const postQuestion = (data) => {
    return axios.post('/question', data);
};

export default {
    getQuestionFromThisWeek,
    getQuestionFromThisMonth,
    getUserAnswersWithQuestionInfo,
    getQuestionByUser,
    getUser,
    postUserLogin,
    postUserSignUp,
    postQuestion,
}