import React, { useState, useRef, FC } from "react";
import ReactDOM from "react-dom";

const MenuSettings: FC = () => {
    const [isVisibleSettings, setIsVisibleSettings] = useState(false);

    const inputLogin = useRef<HTMLInputElement>(null);
    const inputRepo = useRef<HTMLInputElement>(null);
    const inputBlacklist = useRef<HTMLTextAreaElement>(null);

    const listReviewers = useRef(null);

    const findReviewer = () => {

        let login = inputLogin?.current?.value;
        let repo = inputRepo?.current?.value;
        let blacklist = [''];
        if (inputBlacklist?.current?.value) {
            blacklist = inputBlacklist?.current?.value.split(' ').join('').split(';');
        }

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
                    ReactDOM.render(
                        reviewerHTML,
                        document.getElementById("listReviewers")
                    );
                }

            });
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
                                <input type="text" value="rust-lang" ref={inputLogin}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="w-50">
                                <label>Repo</label>
                            </div>
                            <div className="w-50">
                                <input type="text" placeholder="rust" ref={inputRepo}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="w-50">
                                <label>BlackList</label>
                            </div>
                            <div className="w-50">
                                <textarea rows={5} ref={inputBlacklist}>
                                    brson;
                                    bors;
                                    alexcrichton;
                                    Centril;
                                    GuillaumeGomez;
                                    Manishearth;
                                    pcwalton;
                                    RalfJung;
                                    bjorn3;
                                    JohnTitor;
                                    nikomatsakis;
                                    eddyb;
                                    steveklabnik;
                                    nrc;
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

export default MenuSettings;
