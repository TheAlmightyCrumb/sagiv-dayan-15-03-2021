import { combineReducers } from "redux";
import productReducer from "./productReducer";
import storeReducer from "./storeReducer";
import currencyReducer from "./currencyReducer";

const reducer = combineReducers({
  products: productReducer,
  stores: storeReducer,
  currency: currencyReducer
});

export default reducer;
