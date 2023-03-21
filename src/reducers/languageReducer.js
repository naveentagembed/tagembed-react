import {GET_LANGUAGE_SUCCESS, GET_BUTTON_NAME_UPDATE_SUCCESS} from './reducersKeys'

const initialState = {
    customLanguageData: null,
    buttonName: "Show More",
    filterButton: "All",
    viewOnText: "View on",
    shareText: "SHARE"
}
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_LANGUAGE_SUCCESS: {
            return {...state, ...action.payload}
        }
        case GET_BUTTON_NAME_UPDATE_SUCCESS: {
            return {...state, buttonName: action.payload}
        }
        default:
            return {...state}
    }

}