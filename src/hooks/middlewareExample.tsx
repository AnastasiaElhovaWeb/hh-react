import { useRef, Fragment } from "react";
import { render } from "react-dom";
import { useSelector, useDispatch, Provider } from "react-redux";

import store from "../store";
import fetchUser from "../models/fetchUser";

import "../styles.css";

const userNames = ["hhrelease", "aliksbright", "AndreyGladkov"];

const App = () => {
    const users = useSelector(({ gitHubUsers }) => Object.values(gitHubUsers));
    const dispatch = useDispatch();

    return (
        <div className="App">
            <h1>Async flow</h1>
            <button
                type="button"
                onClick={() => {
                    dispatch(fetchUser('rust-lang', 'rust', ['']));
                }}
            >
                load
            </button>

            {users.length > 0 &&
            users.map(({ login, id, avatar_url }) => (
                <Fragment key={id}>
                    <hr />
                    login: {login}
                    <hr />
                    <img src={avatar_url} alt={login} style={{ width: "50%" }} />
                </Fragment>
            ))}
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
