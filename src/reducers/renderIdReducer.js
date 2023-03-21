import { RENDER_ID } from "./reducersKeys";

const initialState = {
    renderId: null
}

export default function reducer(state = initialState, action) {

    switch (action.type) {
        case RENDER_ID:{
            return{
                renderId: action.payload
            }
        }
    
        default:
            return state;
    }
}