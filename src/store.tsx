import { combineReducers, createStore, applyMiddleware } from "redux";
import gitHubUsers from "./models/gitHubUsers";
import fetchErrors from "./models/fetchErrors";
import thunk from "./middlewares/thunk";

const stateFromServer = {};

const reducer = combineReducers({
    gitHubUsers,
    fetchErrors
});

export type RootState = ReturnType<typeof reducer>;

declare module "react-redux" {
    interface DefaultRootState extends RootState {}
}

export default createStore(reducer, stateFromServer, applyMiddleware(thunk));



