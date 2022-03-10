import { createStore } from "redux";

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
