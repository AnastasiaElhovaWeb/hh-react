import React from "react";
import ReactDOM from "react-dom";
import store from "../store";
import {addReviewer} from "./addReviewer";

const changeStore = (user: object) => {
    const { reviewers } = store.getState();
    const id = Object.keys(reviewers).length + 1;

    store.dispatch(
        addReviewer({
            id: id.toString(),
            login: user["login"],
            href: user["html_url"],
            image: user["avatar_url"]
        })
    );
    console.log(store.getState());
};

export default function findUser(login: string, repo: string, blacklist: any) {

    fetch(`https://api.github.com/repos/${login}/${repo}/contributors`)
        .then((response) => response.json())
        .then((response) => {
            if (response.message) {
                ReactDOM.render(
                    <div>{response.message}</div>,
                    document.getElementById("listReviewers")
                );
            } else {
                let reviewer = response[ Math.floor(Math.random() * response.length)];
                while (blacklist.includes(reviewer["login"])) {
                    reviewer = response[ Math.floor(Math.random() * response.length)];
                }

                let reviewerHTML = (
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
                );
            }
        });
}