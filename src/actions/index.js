import { UPDATE_LOCATION } from './type';

 export const updateLocation = (geoLocation) => ({
    type: UPDATE_LOCATION,
    payload: {
        lat: geoLocation.coords.latitude,
        long: geoLocation.coords.longitude
    }
 });