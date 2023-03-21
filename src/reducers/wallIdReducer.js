import {GET_WALL_ID_SUCCESS, GET_WALL_ID_ERROR} from './reducersKeys'

const initialState = {wallID: null}
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_WALL_ID_SUCCESS: {
            return {...state, wallID: action.payload}
        }
        case GET_WALL_ID_ERROR: {
            return {...state, wallID: null}
        }
        default:
            return {...state}
    }

}