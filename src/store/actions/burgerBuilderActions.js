import axios from '../../axios-orders';
import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  SET_INGREDIENTS,
  FETCH_INGREDIENTS_FAILED
} from './types';

export const addIngredient = name => dispatch => {
  dispatch({
    type: ADD_INGREDIENT,
    ingredientName: name
  });
};

export const removeIngredient = name => {
  return {
    type: REMOVE_INGREDIENT,
    ingredientName: name
  };
};

const setIngredients = ingredients => {
  return {
    type: SET_INGREDIENTS,
    ingredients
  };
};

export const fetchIngredientsFailed = () => {
  return {
    type: FETCH_INGREDIENTS_FAILED
  };
};

export const initIngredients = () => dispatch => {
  axios
    .get('https://react-my-burger-86441.firebaseio.com/ingredients.json')
    .then(res => {
      dispatch(setIngredients(res.data));
    })
    .catch(err => dispatch(fetchIngredientsFailed()));
};
