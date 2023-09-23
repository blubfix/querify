import axios from './axios';

// read user
const getUser = () => {
    return axios.get('/user');
};
const getUserById = (userId) => { 
    console.log("axios:", userId);
    return axios.get('/user/userbyid/' + userId);
}
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

// get all questions
const getAllQuestions = () => {
    return axios.get('/question');
}

const postAnswerGiven = (data) => {
    return axios.post('/answerGiven', data);
}
const postAnswerOption = (data) => {
    return axios.post('/answerOption', data);
}

// create question
const postQuestion = (data) => {
    return axios.post('/question', data);
};

const getActiveQuestions = (userID) => {
    console.log("axios AQ:",userID);
    return axios.get('/question/activequestion/'+userID);
};
const getExpiredQuestions = (userID) => {
    console.log("axios EQ:",userID);
    return axios.get('/question/expiredquestion/'+userID);
}

const deleteQuestionById = (questionId) => {
    return axios.get('/question/delete/' + questionId);
}

export default {
    getQuestionFromThisWeek,
    getQuestionFromThisMonth,
    getUserAnswersWithQuestionInfo,
    getExpiredQuestions,
    getQuestionByUser,
    getAllQuestions,
    getActiveQuestions,
    getUser,
    postAnswerGiven,
    postAnswerOption,
    getUserById,
    deleteQuestionById,
    postUserLogin,
    postUserSignUp,
    postQuestion,
}