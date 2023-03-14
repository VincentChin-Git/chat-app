import axios from "axios";
import { serverPath } from "./globalConst";

const regexPositive = /^[\d,.]*$/;
const regexNumber = /^[-]?[\d,.]*$/;
const regexPureNumber = /^[+]?[\d]*$/;

const validateInput = (type, value) => {
    switch (type) {
        case 'text':
            return true;
        case 'positive':
            return regexPositive.test(value);
        case 'number':
            return regexNumber.test(value);
        case 'pureNumber':
            return regexPureNumber.test(value);
        default:
            return false;
    }
}

export const handleInputChange = (setState, statename, value, type = 'text') => {
    if (validateInput(type, value)) {
        setState(prev => { return { ...prev, [statename]: value } })
    }
}

export const handleStateChange = (setState, state) => {
    setState(prev => { return { ...prev, ...state } })
}

export const toggleState = (setState, statename) => {
    setState(prev => { return { ...prev, [statename]: !prev[statename] } })
}

export const alertObj = (obj) => {
    alert(JSON.stringify(obj))
}

export async function axiosPost(url, req) {
    let res = await axios.post(serverPath + url, req);
    alertObj(res.data);
    // return res.data;
}

export async function axiosPostImage(url, req) {
    let res = await axios.post(serverPath + url, req, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    return res.data;
}

export async function axiosGet(url) {
    let res = await axios.get(serverPath + url);
    return res.data;
}