import { Reducer, Action } from "redux";

const ADD_REVIEWER_ACTION = "ADD_REVIEWER";

interface Reviewer {
    id: string;
    login: string;
    href: string;
    image: string;
}

interface AddReviewerAction
    extends Action<typeof ADD_REVIEWER_ACTION> {
    payload: Reviewer;
}

export function addReviewer(reviewer: Reviewer) {
    return {
        type: ADD_REVIEWER_ACTION,
        payload: reviewer
    };
}

const reviewers: Reducer<
    { [key: string]: Reviewer } | {},
    AddReviewerAction
    > = (state = {}, { type, payload }) => {
    switch (type) {
        case ADD_REVIEWER_ACTION:
            return { ...state, [payload.id]: payload };
        default:
            return state;
    }
};

export default reviewers;
