import axios from 'axios';

const url = 'http://localhost:8000';

export const authenticateLogin = async (user) => {
    try {
        return await axios.post(`${url}/login`, user)
    } catch (error) {
        console.log('error while calling login API: ', error);
    }
}

export const authenticateSignup = async (user) => {
    try {
        return await axios.post(`${url}/signup`, user)
    } catch (error) {
        console.log('error while calling Signup API: ', error);
    }
}


export const getProductById = async (id) => {
    try {
        console.log(1)
        let data  = await axios.get( `${url}/product/${id}`);
        console.log(data)
        return data.data;
    } catch (error) {
        console.log('Error while getting product by id response', error);
    }
}



export  const payUsingPaytm = async (data) => {
    try {
        let response = await axios.post(`${url}/payment`, data);
        return response.data;
    } catch (error) {
        console.log('error', error);
    }
}

export const postTokenID = async (data) => {
    try {
        console.log(data);
        return await axios.post(`${url}/postnft`, data)
    } catch (error) {
        console.log('error while calling login API: ', error);
    }
}
export const delTokenID = async (data) => {
    try {
        console.log(data);
        return await axios.post(`${url}/delnft`, data)
    } catch (error) {
        console.log('error while calling login API: ', error);
    }
}

export const postProductDetails = async (data) => {
    try {
        console.log(data);
        return await axios.post(`${url}/postproduct`, data)
    } catch (error) {
        console.log('error while calling login API: ', error);
    }
}



