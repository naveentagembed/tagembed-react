import {GET_THEME_WEB_FILTERS_ERROR, GET_THEME_WEB_FILTERS_SUCCESS} from './reducersKeys'

const initialState = {webFilters: null}
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_THEME_WEB_FILTERS_SUCCESS: {
            return {...state, webFilters: action.payload}
        }
        case GET_THEME_WEB_FILTERS_ERROR: {
            return {...state, webFilters: null}
        }
        default:
            return {...state}
    }
}