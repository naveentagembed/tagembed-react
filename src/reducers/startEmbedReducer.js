import {START_EMBED_IFRAME} from './reducersKeys'

const initialState = {heightEvent: {origin: null}}
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case START_EMBED_IFRAME: {
            return {...state, heightEvent: action.payload}
        }
        default:
            return {...state}
    }

}