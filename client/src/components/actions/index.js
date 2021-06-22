import axios from 'axios';
import setAuthToken from '../Utils/SethAuthToken.js';

export const GET_PRODUCTS = 'GETPRODUCTS';
export const GET_CATEGORIES = 'GETCATEGORIES';
export const PRODUCTS_ID = 'PRODUCTSID';
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

let URL = 'http://localhost:5000';

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