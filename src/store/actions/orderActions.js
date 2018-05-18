import axios from '../../axios-orders';
import {
  INIT_PURCHASE,
  PURCHASE_BURGER_SUCCESS,
  PURCHASE_BURGER_FAILED,
  PURCHASE_BURGER_START,
  FETCH_ORDERS_START,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAILED
} from './types';

// INITIALIZE PURCHASE ACTION

export const initPurchase = () => dispatch => {
  dispatch({
    type: INIT_PURCHASE
  });
};

// PURCHASE BURGER ACTIONS

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData
  };
};

export const purchaseBurgerFailed = error => {
  return {
    type: PURCHASE_BURGER_FAILED,
    error
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: PURCHASE_BURGER_START
  };
};

export const purchaseBurger = (orderData, token) => dispatch => {
  dispatch(purchaseBurgerStart());
  axios
    .post(`/orders.json?auth=${token}`, orderData)
    .then(res => {
      console.log('[res data]', res.data);
      dispatch(purchaseBurgerSuccess(res.data.name, orderData));
    })
    .catch(err => {
      dispatch(purchaseBurgerFailed(err));
    });
};

// FETCH ORDER ACTIONS

export const fetchOrdersSuccess = orders => {
  return {
    type: FETCH_ORDERS_SUCCESS,
    orders
  };
};

export const fetchOrdersFailed = error => {
  return {
    type: FETCH_ORDERS_FAILED,
    error
  };
};

export const fetchOrdersStart = () => {
  return {
    type: FETCH_ORDERS_START
  };
};

export const fetchOrders = (token, userId) => dispatch => {
  dispatch(fetchOrdersStart());

  const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
  axios
    .get(`/orders.json${queryParams}`)
    .then(res => {
      const fetchedOrders = [];
      for (let key in res.data) {
        fetchedOrders.push({
          ...res.data[key],
          id: key
        });
      }
      dispatch(fetchOrdersSuccess(fetchedOrders));
    })
    .catch(err => {
      dispatch(fetchOrdersFailed(err));
    });
};
