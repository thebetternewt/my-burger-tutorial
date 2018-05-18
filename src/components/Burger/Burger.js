import React from 'react';
// import { withRouter } from 'react-router-dom';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = props => {
  // Create array of ingredient components
  // Step 1: Get keys from ingredients prop
  let transformedIngredients = Object.keys(props.ingredients)
    .map(ingKey => {
      // Step 2: Create empty array for each ingredient with number of slots according to ingredient count
      return [...Array(props.ingredients[ingKey])].map((_, i) => {
        // Step 3: Fill empty slots with BurgerIngredient components
        return <BurgerIngredient key={ingKey + i} type={ingKey} />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);
  
  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please add some ingredients!</p>
  };
  return <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>;
};

// export default withRouter(burger); // => Gives routing props to component from parent routed component.
export default burger;