/*import { createStore } from "redux";

import reviewers from "./models/addReviewer";

const stateFromServer = {
    reviewers: {}
};

const customReducer = (reducerMap: any) => (state: any, action: any) => {
    let newState = {};
    for (let reducer in reducerMap) {
        newState[reducer] = reducerMap[reducer](state[reducer], action);
    }
    return newState;
};

export default createStore(
    customReducer({ reviewers }),
    stateFromServer
);
*/


import { combineReducers, createStore, applyMiddleware, compose } from "redux";

import resumeComments from "./models/resumeComments";
import gitHubUsers from "./models/gitHubUsers";
import thunk from "./middlewares/thunk";

/*const composeEnhancers =
    (typeof window !== "undefined" &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;*/

const stateFromServer = {
    resumeComments: {
        1: {
            id: 1,
            title: "Consider using Redux",
            text: ""
        },
        2: {
            id: 2,
            title: "Keep all state in a single tree",
            text: ""
        }
    }
};

const reducer = combineReducers({
    resumeComments,
    gitHubUsers
});

export type RootState = ReturnType<typeof reducer>;

declare module "react-redux" {
    interface DefaultRootState extends RootState {}
}

export default createStore(reducer, stateFromServer, applyMiddleware(thunk));



