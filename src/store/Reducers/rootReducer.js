import CartItemsReducer from "./CartItemsReducer";
import { combineReducers } from "redux";
const rootReducer = combineReducers({
    cartItems: CartItemsReducer
})

export default rootReducer;