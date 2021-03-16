import { combineReducers } from "redux";
import productReducer from "./productReducer";
import storeReducer from "./storeReducer";
import currencyReducer from "./currencyReducer";
import viewStateReducer from "./viewStateReducer";

const reducer = combineReducers({
  products: productReducer,
  stores: storeReducer,
  currency: currencyReducer,
  viewState: viewStateReducer
});

export default reducer;
