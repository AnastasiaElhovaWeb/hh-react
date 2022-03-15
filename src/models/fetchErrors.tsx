import { Reducer, Action } from "redux";

const ADD_FETCH_ERROR = "ADD_FETCH_ERROR";

interface FetchError {
    id: string;
    message: string;
}

interface AddFetchErrorsAction
    extends Action<typeof ADD_FETCH_ERROR> {
    payload: FetchError;
}

export function addFetchErrors(fetchError: FetchError) {
    return {
        type: ADD_FETCH_ERROR,
        payload: fetchError
    };
}

const fetchErrors: Reducer<
    { [key: string]: FetchError } | {},
    AddFetchErrorsAction
    > = (state = {}, { type, payload }) => {
    switch (type) {
        case ADD_FETCH_ERROR:
            return { ...state, [payload.id]: payload };
        default:
            return state;
    }
};

export default fetchErrors;
