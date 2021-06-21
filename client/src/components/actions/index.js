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
export const CLEAN_CART = 'CLEANCART';
export const ADD_MORE = 'ADDMORE';
export const LESS_MORE = 'LESSMORE';
export const ADD_WISH = 'ADDWISH';
export const REMOVE_WISH = 'REMOVEWISH';
export const GET_WISHLIST = 'GETWISHLIST';
export const CURRENT_USER = 'CURRENTUSER';
export const ADD_COMMENT = 'ADDCOMENT';
export const REMOVE_COMMENT = 'REMOVECOMMENT';
export const GOOGLE_LOGIN = 'GOOGLELOGIN'

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

export const GOOGLELOGIN = (info) => {
    return async (dispatch) => {
        axios.post(URL + '/Users/google', {
            email: info.email,
            username: info.name,
            googleId: info.googleId,
            token: info.token
        })
            .then((response) => response.data)
            .then(data => {
                console.log(data)
                const { token } = data;
                const { username } = data;
                const { email } = data;
                const { level } = data;
                const { googleId } = data
                localStorage.setItem("jwtToken", token);
                localStorage.setItem("UserName", username);
                localStorage.setItem("Email", email);
                localStorage.setItem('LevelUser', level);
                localStorage.setItem("googleId", googleId)
                dispatch({ type: GOOGLE_LOGIN, payload: data });
            })
    }
}



export const LOGOUTUSER = () => {
    return async (dispatch) => {
        await localStorage.removeItem("jwtToken");
        await localStorage.removeItem("UserName");
        await localStorage.removeItem('Email');
        await localStorage.removeItem('LevelUser');
        await localStorage.removeItem('googleId');
        setAuthToken(false);
        dispatch(SETCURRENTUSER({}));
    };
};

export const CURRENTUSER = (info) => {
    return async (dispatch) => {
        return await axios.post(URL + '/Users/currentuser', {
            email: info
        })
            .then((response) => response.data)
            .then(data =>
                dispatch({ type: CURRENT_USER, payload: data }))
    }
}

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
            stock: info.stock,
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
            Id: info.Id
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
            email: info
        })
            .then((response) => response.data)
            .then(data =>
                dispatch({ type: GET_CART, payload: data }))
    }
}

export const CLEANCART = (info) => {
    return async (dispatch) => {
        return await axios.post(URL + '/Users/cleancart', {
            email: info
        })
            .then((response) => response.data)
            .then(data =>
                dispatch({ type: CLEAN_CART, payload: data }))
    }
}

export const ADDMORE = (info) => {
    return async (dispatch) => {
        return await axios.post(URL + '/Users/addquantity', {
            cart: info.cart,
            email: info.email
        })
            .then((response) => response.data)
            .then(data =>
                dispatch({ type: ADD_MORE, payload: data }))
    }
}

export const LESSMORE = (info) => {
    return async (dispatch) => {
        return await axios.post(URL + '/Users/lessquantity', {
            email: info.email,
            cart: info.cart,
        })
            .then((response) => response.data)
            .then(data =>
                dispatch({ type: LESS_MORE, payload: data }))
    }
}

export const ADDWISH = (info) => {
    return async (dispatch) => {
        return await axios.post(URL + '/Users/addwish', {
            email: info.email,
            name: info.name,
            Id: info.Id,
            image: info.image
        })
            .then((response) => response.data)
            .then(data =>
                dispatch({ type: ADD_WISH, payload: data }))
    }
}

export const REMOVEWISH = (info) => {
    return async (dispatch) => {
        return await axios.post(URL + '/Users/removewish', {
            email: info.email,
            Id: info.Id,
        })
            .then((response) => response.data)
            .then(data =>
                dispatch({ type: REMOVE_WISH, payload: data }))
    }
}

export const GETWISH = (info) => {
    return async (dispatch) => {
        return await axios.post(URL + '/Users/getwishlist', {
            email: info
        })
            .then((response) => response.data)
            .then(data =>
                dispatch({ type: GET_WISHLIST, payload: data }))
    }
}

export const ADDCOMMENT = (info) => {
    return async (dispatch) => {
        return await axios.post(URL + '/Products/addcomment', {
            email: info.email,
            Id: info.Id,
            comment: info.comment,
            title: info.title
        })
            .then((response) => response.data)
            .then(data =>
                dispatch({ type: ADD_COMMENT, payload: data }))
    }
}

export const REMOVECOMMENT = (info) => {
    return async (dispatch) => {
        return await axios.post(URL + '/Products/removecomment', {
            Id: info,
        })
            .then((response) => response.data)
            .then(data =>
                dispatch({ type: REMOVE_COMMENT, payload: data }))
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