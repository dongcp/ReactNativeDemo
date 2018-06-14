import { UPDATE_LOCATION } from '../actions/type';

const initialState = {
    lat: 0.0,
    long: 0.0
}

export default function (state = initialState, action){
    switch(action.type) {
        case UPDATE_LOCATION:
            return action.payload;
        default:
            return state;
    }
}
