import { GET_PRODUCTS } from "../actions";
import { GET_CATEGORIES } from "../actions";
import { PRODUCTS_ID } from "../actions";
import { GET_CART } from "../actions";
import { ADD_CART } from "../actions";
import { LESS_MORE } from "../actions";
import { ADD_MORE } from "../actions";
import { GET_WISHLIST } from "../actions";
import { CURRENT_USER } from "../actions";
import { GET_ORDERS } from "../actions";
import { GET_ORDER_BYID } from "../actions";
import { GET_ORDER_BYUSER } from "../actions";

const initialState = {
  products: [],
  categories: [],
  productById: [],
  responseAddCart: [],
  cart: [],
  responseAdd: [],
  responseLess: [],
  wishlist: [],
  currentuser: [],
  orders: [],
  ordersById: [],
  ordersByUser: [],
};

const reducers = (state = initialState, action) => {
  if (action.type === GET_PRODUCTS) {
    return {
      ...state,
      products: action.payload,
    };
  }
  if (action.type === GET_CATEGORIES) {
    return {
      ...state,
      categories: action.payload,
    };
  }
  if (action.type === PRODUCTS_ID) {
    return {
      ...state,
      productById: action.payload,
    };
  }
  if (action.type === GET_CART) {
    return {
      ...state,
      cart: action.payload,
    };
  }
  if (action.type === ADD_CART) {
    return {
      ...state,
      responseAddCart: action.payload,
    };
  }
  if (action.type === ADD_MORE) {
    return {
      ...state,
      responseAdd: action.payload,
    };
  }
  if (action.type === LESS_MORE) {
    return {
      ...state,
      responseLess: action.payload,
    };
  }
  if (action.type === GET_WISHLIST) {
    return {
      ...state,
      wishlist: action.payload,
    };
  }
  if (action.type === CURRENT_USER) {
    return {
      ...state,
      currentuser: action.payload,
    };
  }
  if (action.type === GET_ORDERS) {
    return {
      ...state,
      orders: action.payload,
    };
  }
  if (action.type === GET_ORDER_BYID) {
    return {
      ...state,
      ordersById: action.payload,
    };
  }
  if (action.type === GET_ORDER_BYUSER) {
    return {
      ...state,
      ordersByUser: action.payload,
    };
  }
  return state;
};

export default reducers;
