import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../Aux/Aux';

import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    showSideDrawer: false
  };

  closeSideDrawerHandler = () => {
    this.setState({
      showSideDrawer: false
    });
  };

  toggleSideDrawerHandler = () => {
    this.setState(prevState => {
      return { showSideDrawer: !this.state.showSideDrawer };
    });
  };

  render() {
    return (
      <Aux>
        <div>
          <Toolbar
            drawerToggleClicked={this.toggleSideDrawerHandler}
            isAuthenticated={this.props.isAuthenticated}
          />
          <SideDrawer
            isAuthenticated={this.props.isAuthenticated}
            open={this.state.showSideDrawer}
            closed={this.closeSideDrawerHandler}
          />
        </div>
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null
});

export default connect(mapStateToProps)(Layout);
