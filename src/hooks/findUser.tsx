import { addGitHubUser } from "../models/gitHubUsers";
import { addFetchErrors } from "../models/fetchErrors";
import store, { RootState } from "../store";
import { Dispatch } from "redux";
import React from "react";

let fetchErrorsLength = 0;

export default function findUser(login: string, repo: string, blacklist: any) {
    return function (dispatch: Dispatch, getState: () => RootState) {
        return fetch(`https://api.github.com/repos/${login}/${repo}/contributors`)
            .then((response) => response.json())
            .then((response) => {
                if (response.message) {
                    dispatch(addFetchErrors({'id': fetchErrorsLength.toString(), 'message': response.message}));
                } else {
                    let reviewer = response[ Math.floor(Math.random() * response.length)];
                    while (blacklist.includes(reviewer["login"])) {
                        reviewer = response[ Math.floor(Math.random() * response.length)];
                    }
                    dispatch(addGitHubUser(reviewer));
                    dispatch(addFetchErrors({'id': fetchErrorsLength.toString(), 'message': ''}));
                }
                fetchErrorsLength++;
                console.log(store.getState());
            });
    };
}