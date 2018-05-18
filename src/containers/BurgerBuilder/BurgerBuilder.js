import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import {
  addIngredient,
  removeIngredient,
  initIngredients
} from '../../store/actions/burgerBuilderActions';
import { initPurchase } from '../../store/actions/orderActions';
import { setAuthRedirectPath } from '../../store/actions/authActions';

class BurgerBuilder extends Component {
  state = {
    purchasing: false
  };

  componentDidMount() {
    console.log(this.props);
    this.props.initIngredients();
  }

  // Update purchase state to purchasable if at least one ingredient selected
  updatePurchaseState = ingredients => {
    // Get total number of ingredients
    const sum = Object.keys(ingredients)
      .map(ingKey => {
        // Get counts from ingredients object by key
        return ingredients[ingKey];
      })
      .reduce((sum, el) => {
        // Total counts
        return sum + el;
      }, 0);

    // Set purchasable if sum > 0
    return sum > 0;
  };

  // Update purchasing state when clicking order now button
  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      this.props.setAuthRedirectPath('/checkout');
      this.props.history.push('/auth');
    }
  };

  // Close modal when clicking backdrop
  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  // Continue with purchase from within modal
  purchaseContinueHandler = () => {
    this.props.initPurchase();
    this.props.history.push('/checkout');
  };

  // Render
  render() {
    const disableInfo = {
      ...this.props.ingredients
    };
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.props.error ? (
      <p style={{ textAlign: 'center' }}>Ingredients could not be loaded!</p>
    ) : (
      <Spinner />
    );

    if (this.props.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            price={this.props.totalPrice}
            ingredientAdded={this.props.addIngredient}
            ingredientRemoved={this.props.removeIngredient}
            disabled={disableInfo}
            purchasable={this.updatePurchaseState(this.props.ingredients)}
            ordered={this.purchaseHandler}
            isAuthenticated={this.props.isAuthenticated}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingredients}
          price={this.props.totalPrice}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
        />
      );
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => ({
  ingredients: state.burgerBuilder.ingredients,
  totalPrice: state.burgerBuilder.totalPrice,
  error: state.burgerBuilder.error,
  isAuthenticated: state.auth.token !== null
});

export default connect(mapStateToProps, {
  addIngredient,
  removeIngredient,
  initIngredients,
  initPurchase,
  setAuthRedirectPath
})(withErrorHandler(BurgerBuilder, axios));
