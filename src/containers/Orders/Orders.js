import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-orders';

import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { fetchOrders } from '../../store/actions/orderActions';

class Orders extends Component {
  componentDidMount() {
    this.props.fetchOrders(this.props.token, this.props.userId);
  }

  render() {
    if (this.props.loading) {
      return <Spinner />;
    }

    const orders = this.props.orders.map(o => {
      return <Order key={o.id} ingredients={o.ingredients} price={+o.price} />;
    });
    return <div>{orders}</div>;
  }
}

const mapStateToProps = state => ({
  orders: state.order.orders,
  loading: state.order.loading,
  token: state.auth.token,
  userId: state.auth.userId
});

export default connect(mapStateToProps, { fetchOrders })(
  withErrorHandler(Orders, axios)
);
