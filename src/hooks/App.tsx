import React, {useRef, useState} from "react";
import { render } from "react-dom";
import { useSelector, useDispatch, Provider } from "react-redux";
import store from "../store";
import findUser from "./findUser";
import "../styles.css";

const App = () => {
    const [isVisibleSettings, setIsVisibleSettings] = useState(false);
    const inputLogin = useRef<HTMLInputElement>(null);
    const inputRepo = useRef<HTMLInputElement>(null);
    const inputBlacklist = useRef<HTMLTextAreaElement>(null);
    const users = useSelector(({ gitHubUsers }) => Object.values(gitHubUsers));
    const errors = useSelector(({ fetchErrors }) => Object.values(fetchErrors));
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
            {errors.length > 0 &&
            <div className="ListErrors">
                { errors[errors.length-1]['message'] }
            </div>
            }
            <div className="ListReviewers">
                <div>Возможные ревьюеры:</div>
                {users.length > 0 &&
                users.map(({ login, avatar_url, html_url }) => (
                    <div className="row">
                        <img width={100} height={100} src={avatar_url}/>
                        <h2>{login}</h2>
                        <a href={html_url}>Профиль</a>
                    </div>
                ))}
            </div>
        </div>
    );
};

const rootElement = document.getElementById("root");

render(
    <Provider store={store}>
        <App />
    </Provider>,
    rootElement
);
