import {GET_CUSTOM_POST_DATA_SUCCESS, GET_CUSTOM_POST_DATA_ERROR} from './reducersKeys'

const initialState = {customPostData: null}
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_CUSTOM_POST_DATA_SUCCESS: {
            return {...state, customPostData: action.payload}
        }
        case GET_CUSTOM_POST_DATA_ERROR: {
            return {...state, customPostData: null}
        }
        default:
            return {...state}
    }

}