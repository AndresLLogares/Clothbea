import axios from 'axios';
import jwt_decode from "jwt-decode";
import setAuthToken from '../Utils/SethAuthToken.js';
export const GET_PRODUCTS = 'GETPRODUCTS';
export const GET_CATEGORIES = 'GETCATEGORIES';
export const PRODUCTS_ID = 'PRODUCTSID';
export const SIGN_UP = 'SIGNUP';
export const LOG_IN = 'LOGIN';
export const RESET_USER = 'RESETUSER';
export const SET_CURRENT_USER = 'SETCURRENTUSER';
export const ADD_CART = 'ADDCART';
export const REMOVE_CART = 'REMOVECART';
export const GET_CART = 'GETCART';
export const EDIT_PRODUCT = 'EDITPRODUCT';

let URL = 'http://localhost:5000'

export const GETPRODUCTS = () => {
    return async (dispatch) => {
        return await axios.get(URL + '/Products/all')
            .then((response) => response.data)
            .then(data => {
                dispatch({ type: GET_PRODUCTS, payload: data })
            })
    }
}

export const GETCATEGORIES = () => {
    return async (dispatch) => {
        return await axios.get(URL + '/Products/subcategories')
            .then((response) => response.data)
            .then(data => {
                dispatch({ type: GET_CATEGORIES, payload: data })
            })
    }
}

export const PRODUCTSBYID = (info) => {
    return async (dispatch) => {
        return await axios.post(URL + '/Products/byId', {
            Id: info,
        })
            .then((response) => response.data)
            .then(data =>
                dispatch({ type: PRODUCTS_ID, payload: data }))
    }
}

export const SIGNUPACTION = (info) => {
    return async (dispatch) => {
        return await axios.post(URL + '/Users/signup', {
            username: info.username,
            password: info.password,
            email: info.email,
            city: info.city || '',
            address: info.address || '',
            country: info.country || '',
            ZIP: info.ZIP || ''

        })
            .then((response) => response.data)
            .then(data => {
                localStorage.setItem("SignInOK", data);
                dispatch({ type: SIGN_UP, payload: data })

            })
    }
}

export const LOGINACTION = (info) => {
    return async (dispatch) => {
        return await axios.post(URL + '/Users/login', {
            password: info.password,
            email: info.email
        })
            .then(res => {
                const { token } = res.data;
                const { username } = res.data;
                const { email } = res.data;
                const { level } = res.data;
                localStorage.setItem("jwtToken", token);
                localStorage.setItem("UserName", username);
                localStorage.setItem("Email", email);
                localStorage.setItem('LevelUser', level)
                setAuthToken(token);
                const decoded = jwt_decode(token);
                dispatch(SETCURRENTUSER(decoded));
            })
            .catch(err =>
                dispatch({
                    type: LOG_IN,
                    payload: 'Error Login'
                })
            );
    };
}

export const SETCURRENTUSER = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};

export const LOGOUTUSER = () => {
    return async (dispatch) => {
        await localStorage.removeItem("jwtToken");
        await localStorage.removeItem("UserName");
        await localStorage.removeItem('Email');
        await localStorage.removeItem('LevelUser');
        setAuthToken(false);
        dispatch(SETCURRENTUSER({}));
    };
};

export const RESETUSER = (info) => {
    return async (dispatch) => {
        return await axios.post(URL + '/Users/reset', {
            email: info.email,
            password: info.password,
            newpassword: info.newpassword
        })
            .then((response) => response.data)
            .then(data =>
                dispatch({ type: RESET_USER, payload: data }))
    }
}


export const ADDCART = (info) => {
    return async (dispatch) => {
        return await axios.post(URL + '/Users/addcart', {
            email: info.email,
            name: info.name,
            image: info.image,
            price: info.price,
            Id: info.id,
            size: info.size,
            quantity: info.quantity
        })
            .then((response) => response.data)
            .then(data => {
                localStorage.setItem("ResponseAdd", data);
                dispatch({ type: ADD_CART, payload: data })
            })
    }
}

export const REMOVECART = (info) => {
    return async (dispatch) => {
        return await axios.post(URL + '/Users/removecart', {
            email: info.email,
            name: info.name
        })
            .then((response) => response.data)
            .then(data => {
                localStorage.setItem("ResponseRemove", data);
                dispatch({ type: REMOVE_CART, payload: data })
            })
    }
}

export const GETCART = (info) => {
    return async (dispatch) => {
        return await axios.post(URL + '/Users/getcart', {
            email: info.email
        })
            .then((response) => response.data)
            .then(data =>
                dispatch({ type: GET_CART, payload: data }))
    }
}

export const EDITPRODUCT = (info) => {
    return async (dispath) => {
        return await axios.post(URL + '/Products/editproduct', {
            Id: info.Id,
            name: info.name || '',
            category: info.category || '',
            subcategory: info.subcategory || '',
            brand: info.brand || '',
            price: info.price || '',
            stock: info.stock || '',
        })
            .then((response) => response.data)
            .then(data =>
                dispath({ type: EDIT_PRODUCT, payload: data }))
    }
}