import {GET_THEME_ERROR_SUCCESS, ERROR_RESPONSE_WITH_MESSAGE} from './reducersKeys'

const initialState = {themeError: null, errorWithMessage: null}
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_THEME_ERROR_SUCCESS: {
            return {...state, themeError: action.payload}
        }
        case ERROR_RESPONSE_WITH_MESSAGE: {
            return {...state, errorWithMessage: action.payload}
        }
        default:
            return {...state}
    }

}