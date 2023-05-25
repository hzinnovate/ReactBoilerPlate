import { types } from '../../actionTypes';

let initialState = {
    isLoading: false,
    images: [],
    allImages: [],
};

export function gallleryReducer(state = initialState, action) {
    switch (action.type) {
        case types.GET_GALLERY_IMAGES_START:
            return { ...state, isLoading: true };
        case types.GET_GALLERY_IMAGES_SUCCESS:
            return { ...state, images: action.images || [], isLoading: false };
        case types.GET_GALLERY_IMAGES_FAILED:
            return { ...state, isLoading: false, images: [] };

        case types.GET_GALLERY_IMAGES_FOR_ADMIN_START:
            return { ...state, isLoading: true };
        case types.GET_GALLERY_IMAGES_FOR_ADMIN_SUCCESS:
            return { ...state, allImages: action.images || [], isLoading: false };
        case types.GET_GALLERY_IMAGES_FOR_ADMIN_FAILED:
            return { ...state, isLoading: false, allImages: [] };

        default:
            return state;
    }
}