import React, { useState, useRef, FC } from "react";
import { render } from "react-dom";
import { useDispatch, Provider } from "react-redux";

import store from "../store";
import findUser from "../hooks/findUser";

import "../styles.css";

const AppFindUser: FC = () => {
    const [isVisibleSettings, setIsVisibleSettings] = useState(false);

    const inputLogin = useRef<HTMLInputElement>(null);
    const inputRepo = useRef<HTMLInputElement>(null);
    const inputBlacklist = useRef<HTMLTextAreaElement>(null);

    const listReviewers = useRef(null);

    const dispatch = useDispatch();

    const findReviewer = () => {
        let login = inputLogin?.current?.value || '';
        let repo = inputRepo?.current?.value || '';
        let blacklist = [''];
        if (inputBlacklist?.current?.value) {
            blacklist = inputBlacklist?.current?.value.split(' ').join('').split(';');
        }
        dispatch(findUser(login, repo, blacklist));
    };


    return (
        <div className="App">
            <div className="MenuSettings">
                <button
                    type="button"
                    onClick={() => {
                        setIsVisibleSettings(!isVisibleSettings);
                    }}
                >
                    {isVisibleSettings ? 'Скрыть' : 'Показать'} настройки
                </button>
                <div className={isVisibleSettings ? 'd-block' : 'd-none'}>
                    <div className="MenuSettingsList">
                        <div className="row">
                            <div className="w-50">
                                <label>Login</label>
                            </div>
                            <div className="w-50">
                                <input type="text" placeholder="login" ref={inputLogin} defaultValue="rust-lang"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="w-50">
                                <label>Repo</label>
                            </div>
                            <div className="w-50">
                                <input type="text" placeholder="repo" ref={inputRepo} defaultValue="rust"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="w-50">
                                <label>BlackList</label>
                            </div>
                            <div className="w-50">
                                <textarea rows={5} ref={inputBlacklist}
                                    defaultValue="brson; bors; alexcrichton; Centril; GuillaumeGomez; Manishearth; pcwalton;
                                                RalfJung; bjorn3; JohnTitor; nikomatsakis; eddyb; steveklabnik; nrc;">

                                </textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="MenuSettingsSearch">
                <button
                    type="button"
                    onClick={findReviewer}
                >
                    Найти ревьюера
                </button>
            </div>
            <div className="ListReviewers" ref={listReviewers} id="listReviewers"></div>
        </div>
    );
};


const rootElement = document.getElementById("root");

render(
    <Provider store={store}>
        <AppFindUser />
    </Provider>,
    rootElement
);