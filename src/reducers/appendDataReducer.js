import {
    GET_APPEND_DATA_SUCCESS,
    GET_APPEND_DATA__ERROR,
    GET_NETWORK_ID_APPEND_DATA_SUCCESS,
    GET_IFRAME_EVENT_SUCCESS
} from './reducersKeys'

const initialState = {}
export default function reducer(state = initialState, action) {
    switch (action.type) {
        /* case GET_APPEND_DATA_SUCCESS: {
            let appendData = { after: action.payload.after, networkID: action.payload.networkID,heightEvent:action.payload.heightEvent }
           return { ...state, appendData }
         }
         case GET_NETWORK_ID_APPEND_DATA_SUCCESS: {
             let appendData = { after: state.appendData.after, networkID: action.payload }
             return { ...state, appendData }
         }
         case GET_APPEND_DATA__ERROR: {
             return { ...state, appendData: { after: null, networkID: 0} }
         }
        case GET_IFRAME_EVENT_SUCCESS: {
             let appendData = { after: state.appendData.after, networkID: state.appendData.networkID,heightEvent:action.payload }
             return { ...state, appendData }
         } */
        default:
            return {...state}
    }

}