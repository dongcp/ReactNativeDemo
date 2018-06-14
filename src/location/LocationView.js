import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    DeviceEventEmitter
} from 'react-native';
import LocationService from './LocationService';
import * as actions from '../actions';
import { connect } from 'react-redux';

class LocationView extends Component {
    componentDidMount() {
        DeviceEventEmitter.addListener('updateLocation', (geoData) => {
            console.log(geoData.coords.latitude+"_"+geoData.coords.longitude);
            this.props.updateLocation(geoData);
        })
    }

    render() {
        console.log('render');
        return(
            <View style={{flex: 1, backgroundColor: 'cyan'}}>
                    <View style={{flexDirection: 'row'}}>
                        <Text>Previous location: </Text> 
                        <Text>(0,0)</Text> 
                    </View>
                    
                    <View style={{flexDirection: 'row'}}>
                        <Text>Current location: </Text> 
                        <Text>({this.props.location.lat},{this.props.location.long})</Text> 
                    </View>

                    <Button
                        title='Start high accuracy mode'
                        onPress={() => {
                            LocationService.startHighAccuracyMode();
                        }}
                    />

                <Button
                        title='Start low battery mode'
                        onPress={() => {
                            LocationService.startLowPowerMode();
                    }}
                />
            </View>
        );
    }
}

const mapStateToProps = state => ({
    location: state.location
})

export default connect(mapStateToProps, actions)(LocationView);
