import {SEARCH_KEYWORD, GET_SEARCH_LOADER_SUCCESS} from './reducersKeys'

const initialState = {searchKeyword: null, isSearchLoader: false}
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SEARCH_KEYWORD: {
            return {...state, searchKeyword: action.payload}
        }
        case GET_SEARCH_LOADER_SUCCESS: {
            return {...state, isSearchLoader: action.payload}
        }
        default:
            return {...state}
    }

}