import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';
import Aux from '../../../hoc/Aux/Aux';

const navigationItems = props => {
  console.log('navITEMS props', props);
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/" exact>
        Burger Builder
      </NavigationItem>

      {props.isAuthenticated ? (
        <Aux>
          <NavigationItem link="/orders">Orders</NavigationItem>
          <NavigationItem link="/logout">Logout</NavigationItem>
        </Aux>
      ) : (
        <NavigationItem link="/auth">Authenticate</NavigationItem>
      )}
    </ul>
  );
};

export default navigationItems;
