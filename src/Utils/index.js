import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../store/Reducers/rootReducer";
export const middlewares = [thunk];
export const testStore = (initialState) => {
    const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
    return createStoreWithMiddleware(rootReducer, initialState);
};