import { GET_PRODUCTS } from "../actions";
import { GET_CATEGORIES } from "../actions";
import { PRODUCTS_ID } from "../actions";
import { SIGN_UP } from '../actions';
import { LOG_IN } from '../actions';
import { EDIT_PRODUCT } from "../actions";
import { GET_CART } from "../actions";
import { ADD_CART } from "../actions";

const initialState = {
    products: [],
    categories: [],
    productById: [],
    responseLogin: [],
    responseSignup: [],
    responseAddCart: [],
    cart: [],
    responseEditProduct: [],
}

const reducers = (state = initialState, action) => {
    if (action.type === GET_PRODUCTS) {
        return {
            ...state,
            products: action.payload
        }
    }
    if (action.type === GET_CATEGORIES) {
        return {
            ...state,
            categories: action.payload
        }
    }
    if (action.type === PRODUCTS_ID) {
        return {
            ...state,
            productById: action.payload
        }
    }
    if (action.type === SIGN_UP) {
        return {
            ...state,
            responseSignup: action.payload
        }
    }
    if (action.type === LOG_IN) {
        return {
            ...state,
            responseLogin: action.payload
        }
    }
    if (action.type === GET_CART) {
        return {
            ...state,
            cart: action.payload
        }
    }
    if (action.type === EDIT_PRODUCT) {
        return {
            ...state,
            responseEditProduct: action.payload
        }
    }
    if (action.type === ADD_CART) {
        return {
            ...state,
            responseAddCart: action.payload
        }
    }
    return state;
}

export default reducers;