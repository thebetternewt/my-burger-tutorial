import {
  INIT_PURCHASE,
  PURCHASE_BURGER_SUCCESS,
  PURCHASE_BURGER_FAILED,
  PURCHASE_BURGER_START,
  FETCH_ORDERS_START,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAILED
} from '../actions/types';

const initialState = {
  orders: [],
  loading: false,
  purchased: false
};

const initPurchase = (state, action) => {
  return {
    ...state,
    purchased: false
  };
};

const purchaseBurgerStart = (state, action) => {
  return {
    ...state,
    loading: true
  };
};

const purchaseBurgerSuccess = (state, action) => {
  const newOrder = {
    ...action.orderData,
    id: action.orderId
  };
  return {
    ...state,
    loading: false,
    orders: state.orders.concat(newOrder),
    purchased: true
  };
};

const purchaseBurgerFailed = (state, action) => {
  return {
    ...state,
    loading: false
  };
};

const fetchOrdersStart = (state, action) => {
  return {
    ...state,
    loading: true
  };
};

const fetchOrdersSuccess = (state, action) => {
  return {
    ...state,
    loading: false,
    orders: action.orders
  };
};

const fetchOrdersFailed = (state, action) => {
  return {
    ...state,
    loading: false
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_PURCHASE:
      return initPurchase(state, action);
    case PURCHASE_BURGER_START:
      return purchaseBurgerStart(state, action);
    case PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSuccess(state, action);
    case PURCHASE_BURGER_FAILED:
      return purchaseBurgerFailed(state, action);
    case FETCH_ORDERS_START:
      return fetchOrdersStart(state, action);
    case FETCH_ORDERS_SUCCESS:
      return fetchOrdersSuccess(state, action);
    case FETCH_ORDERS_FAILED:
      return fetchOrdersFailed(state, action);
    default:
      return state;
  }
};

export default reducer;
