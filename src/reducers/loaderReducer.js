import {
    GET_LOADER_SUCCESS,
    GET_LOADER_ERROR,
    GET_THEME_LOADER_SUCCESS,
    GET_THEME_SHOW_MORE_LOADER_SUCCESS,
    GET_WEB_FILTER_LOADER_SUCCESS
} from './reducersKeys'

const initialState = {loader: null, themeLoader: true, isShowMoreLoader: false, webFilterLoader: false}
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_LOADER_SUCCESS: {
            return {...state, loader: action.payload}
        }
        case GET_THEME_LOADER_SUCCESS: {
            return {...state, themeLoader: action.payload}
        }
        case GET_THEME_SHOW_MORE_LOADER_SUCCESS: {
            return {...state, isShowMoreLoader: action.payload}
        }
        case GET_WEB_FILTER_LOADER_SUCCESS: {
            return {...state, webFilterLoader: action.payload}
        }
        case GET_LOADER_ERROR: {
            return {...state, loader: null, themeLoader: true, isShowMoreLoader: false}
        }
        default:
            return {...state}
    }

}