import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { checkAuthState as tryAutoLogin } from './store/actions/authActions';

import AsyncComponent from './hoc/AsyncComponent';

// Lazy load component routes
const AsyncAuth = AsyncComponent(() => import('./containers/Auth/Auth'));
const AsyncLogout = AsyncComponent(() =>
  import('./containers/Auth/Logout/Logout')
);
const AsyncOrders = AsyncComponent(() => import('./containers/Orders/Orders'));
const AsyncCheckout = AsyncComponent(() =>
  import('./containers/Checkout/Checkout')
);

class App extends Component {
  componentDidMount() {
    this.props.tryAutoLogin();
  }

  render() {
    const guestRoutes = (
      <Switch>
        <Route path="/auth" component={AsyncAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );

    const authRoutes = (
      <Switch>
        <Route path="/checkout" component={AsyncCheckout} />
        <Route path="/orders" component={AsyncOrders} />
        <Route path="/logout" component={AsyncLogout} />;
        <Route path="/auth" component={AsyncAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );

    return (
      <div>
        <Layout>{this.props.isAuthenticated ? authRoutes : guestRoutes}</Layout>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null
});

export default withRouter(connect(mapStateToProps, { tryAutoLogin })(App));
