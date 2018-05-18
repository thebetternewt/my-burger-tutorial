import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  checkoutCancelledHander = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  render() {
    const redirect = <Redirect to="/" />;
    if (!this.props.ingredients || this.props.purchased) {
      return <div>{redirect}</div>;
    }

    return (
      <div>
        <CheckoutSummary
          ingredients={this.props.ingredients}
          checkoutCancelled={this.checkoutCancelledHander}
          checkoutContinued={this.checkoutContinuedHandler}
        />
        <Route
          path={this.props.match.path + '/contact-data'}
          component={ContactData}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ingredients: state.burgerBuilder.ingredients,
  purchased: state.order.purchased
});

export default connect(mapStateToProps)(Checkout);
