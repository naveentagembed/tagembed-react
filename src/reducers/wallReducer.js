import {GET_WALL_SUCCESS, GET_WALL_ERROR, WALL_THEME_ID_UPDATE} from './reducersKeys'

const initialState = {wallData: null}
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_WALL_SUCCESS: {
            return {...state, wallData: action.payload}
        }
        case GET_WALL_ERROR: {
            return {...state, wallData: null}
        }
        case WALL_THEME_ID_UPDATE: {
            return {...state, wallData: action.payload}
        }
        default:
            return {...state}
    }

}