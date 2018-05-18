import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  SET_INGREDIENTS,
  FETCH_INGREDIENTS_FAILED
} from '../actions/types';

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false
};

// Set ingredient prices
const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

const addIngredient = (state, action) => {
  return {
    ...state,
    ingredients: {
      ...state.ingredients,
      // Increment ingredient
      [action.ingredientName]: state.ingredients[action.ingredientName] + 1
    },
    // Update Price
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
    building: true
  };
};

const removeIngredient = (state, action) => {
  return {
    ...state,
    ingredients: {
      ...state.ingredients,
      // Decrement ingredient
      [action.ingredientName]: state.ingredients[action.ingredientName] - 1
    },
    // Update Price
    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
    building: true
  };
};

const setIngregients = (state, action) => {
  return {
    ...state,
    ingredients: {
      salad: action.ingredients.salad,
      bacon: action.ingredients.bacon,
      cheese: action.ingredients.cheese,
      meat: action.ingredients.meat
    },
    totalPrice: 4,
    error: false,
    building: false
  };
};

const setIngredientsFailed = (state, action) => {
  return {
    ...state,
    error: true
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT:
      return addIngredient(state, action);
    case REMOVE_INGREDIENT:
      return removeIngredient(state, action);
    case SET_INGREDIENTS:
      return setIngregients(state, action);
    case FETCH_INGREDIENTS_FAILED:
      return setIngredientsFailed(state, action);
    default:
      return state;
  }
};

export default reducer;
