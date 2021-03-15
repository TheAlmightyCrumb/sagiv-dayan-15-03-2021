import { combineReducers } from "redux";
import productReducer from "./productReducer";
import storeReducer from "./storeReducer";

const reducer = combineReducers({
  products: productReducer,
  stores: storeReducer
});

export default reducer;
