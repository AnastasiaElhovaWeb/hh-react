const ADD_RESUME_COMMENT_ACTION = "ADD_RESUME_COMMENT";

export function addResumeComment(resumeComment) {
    return {
        type: ADD_RESUME_COMMENT_ACTION,
        payload: resumeComment
    };
}

export default function resumeComments(state = {}, { type, payload }) {
    switch (type) {
        case ADD_RESUME_COMMENT_ACTION:
            return { ...state, [payload.id]: payload };
        default:
            return state;
    }
}
