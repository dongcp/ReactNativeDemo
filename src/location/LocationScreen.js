import React, { Component } from 'react';
import {
    View,
    Text,
    Button
} from 'react-native';
import { Provider } from 'react-redux';
import store from '../store';
import LocationView from './LocationView';

export default class LocationScreen extends Component {

    render() {
        return(
            <Provider store={store}>
                <LocationView/>
            </Provider>
        );
    }
}
