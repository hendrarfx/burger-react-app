import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://plasma-kit-138623.firebaseio.com/'
});

export default instance;