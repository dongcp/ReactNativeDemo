import React, { Component } from 'react';
import {
    View,
    Button,
    DeviceEventEmitter
} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import App from './App';
import SlideUpScreen from './SlideUpScreen';
import RevealAnimationScreen from './RevealAnimationScreen';
import TestReveal from './TestReveal';
import DeliveryLocations from './DeliveryLocations';
import LottieAnimation from './LottieAnimation';
import LocationScreen from './src/location/LocationScreen';
import { Provider } from 'react-redux';
import store from './src/store';

export class Home extends Component {
    
    render() {
        return(
            <Provider store={store}>
                <View style={{flex: 1}}>
                    <Button 
                        title='Animated'
                        onPress={() => this.props.navigation.navigate('Animated')}
                    />
                    <Button 
                        title='Test slide up panel'
                        onPress={() => this.props.navigation.navigate('SlideUpScreen')}
                    />
                    <Button 
                        title='Test reveal animation'
                        onPress={() => this.props.navigation.navigate('RevealAnimationScreen')}
                    /> 
                    <Button 
                        title='Test reveal'
                        onPress={() => this.props.navigation.navigate('Delivery')}
                    />
                    <Button 
                        title='Lottie Animation'
                        onPress={() => this.props.navigation.navigate('LottieAnimation')}
                    />
                    <Button
                        title='Location Service'
                        onPress={() => this.props.navigation.navigate('LocationScreen')}
                    />
                </View>
            </Provider>
        );
    }
}

export default createStackNavigator(
    {
        Home: Home,
        Animated: App,
        SlideUpScreen: SlideUpScreen,
        RevealAnimationScreen: RevealAnimationScreen, 
        TestReveal: TestReveal,
        Delivery: DeliveryLocations,
        LottieAnimation: LottieAnimation,
        LocationScreen: LocationScreen
    },
    {
        initialRoute: 'Home'
    }
);
