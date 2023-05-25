import { types } from '../../actionTypes';

let initialState = {
    isLoading: false,
    user: null,
};

export function userReducer(state = initialState, action) {
    switch (action.type) {
        case types.AUTH_START:
            return { ...state, isLoading: true };
        case types.AUTH_SUCCESS:
            return { ...state, user: action.user, isLoading: false };
        case types.AUTH_FAILD:
            return { ...state, isLoading: false, user: null };

        // sing out
        case types.SIGN_OUT:
            return { ...state, isLoading: false, user: null };

        default:
            return state;
    }
}
