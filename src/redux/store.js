import { createWrapper, HYDRATE } from "next-redux-wrapper";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import products from "./all_data/reducer";
import cart_product from "./cart_products/reducer";
import users from "./user_data/reducer";

const combinedReducer = combineReducers({
  cart_product,
  products,
  users,
});

const masterReducer = (state, action) => {
  if (action.types === HYDRATE) {
    const nextState = {
      ...state,
      cartedProducts: {
        cart_product:
          state.cart_product.quantity + action.payload.cart_product.quantity,
      },
      allProducts: {
        products: state.products,
      },
      user_data: {
        user_data: state.users,
      },
    };
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

const initStore = () => {
  return createStore(masterReducer, composeWithDevTools(applyMiddleware()));
};

export const wrapper = createWrapper(initStore);
