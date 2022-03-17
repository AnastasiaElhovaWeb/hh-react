import { Action, Reducer } from "redux";

const ADD_GITHUB_USER_ACTION = "ADD_GITHUB_USER_ACTION";

interface GithubUser {
    login: string;
    id: string;
    avatar_url: string;
}

interface AddGithubUserAction extends Action<typeof ADD_GITHUB_USER_ACTION> {
    payload: GithubUser;
}

export function addGitHubUser(userData: GithubUser) {
    return {
        type: ADD_GITHUB_USER_ACTION,
        payload: userData
    };
}

const gitHubUsers: Reducer<GithubUser | {}, AddGithubUserAction> = (
    state = {},
    { type, payload }
) => {
    switch (type) {
        case ADD_GITHUB_USER_ACTION:
            return { ...state, [payload.id]: payload };
        default:
            return state;
    }
};

export default gitHubUsers;
