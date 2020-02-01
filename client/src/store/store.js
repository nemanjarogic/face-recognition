import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";

import authenticationReducer from "./reducers/authentication.reducers";
import alertReducer from "./reducers/alert.reducers";
import userReducer from "./reducers/user.reducers";

const composeEnhancers =
  (process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null) || compose;

const rootReducer = combineReducers({
  authentication: authenticationReducer,
  alert: alertReducer,
  user: userReducer
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);

export default store;
