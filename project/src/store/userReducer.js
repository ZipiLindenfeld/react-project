import * as actionType from "./actions"

const initalseState = {
    user: null,
}

const userReducer = (state = initalseState, action) => {
    switch (action.type) {
        case actionType.SET_USER:
            return { ...state, user: action.user }
        case actionType.LOG_OUT:
            return { ...state, user: null }
        default: return { ...state }
    }
}
export default userReducer;