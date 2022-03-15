import { addGitHubUser } from "./gitHubUsers";
import { RootState } from "../store";
import { Dispatch } from "redux";
import ReactDOM from "react-dom";
import React from "react";

export default function fetchUser(login: string, repo: string, blacklist: any) {
    return function (dispatch: Dispatch, getState: () => RootState) {
        return fetch(`https://api.github.com/repos/${login}/${repo}/contributors`)
        //return fetch(`https://api.github.com/users/${login}`)
            .then((response) => response.json())
            .then((response) => {
                if (response.message) {
                    /*ReactDOM.render(
                        <div>{response.message}</div>,
                        document.getElementById("listReviewers")
                    );*/
                } else {
                    let reviewer = response[ Math.floor(Math.random() * response.length)];
                    while (blacklist.includes(reviewer["login"])) {
                        reviewer = response[ Math.floor(Math.random() * response.length)];
                    }

                    dispatch(addGitHubUser(reviewer));

                    /*let reviewerHTML = (
                        <div>
                            <div>Возможный ревьюер:</div>
                            <div className="row">
                                <img width={100} height={100} src={reviewer["avatar_url"]}/>
                                <h2>{reviewer["login"]}</h2>
                                <a href={reviewer["html_url"]}>Профиль</a>
                            </div>
                        </div>
                    );
                    changeStore(reviewer);
                    ReactDOM.render(
                        reviewerHTML,
                        document.getElementById("listReviewers")
                    );*/
                }
            });




    };
}

/*
export default function fetchUser(userName: string) {
    return function (dispatch: Dispatch, getState: () => RootState) {
        return fetch(`https://api.github.com/users/${userName}`)
            .then((response) => response.json())
            .then((data) => dispatch(addGitHubUser(data)));
    };
}
*/