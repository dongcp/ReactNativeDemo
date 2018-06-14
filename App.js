/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Animated,
  Easing,
  Button
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

var shineTimes = 0;

export class App extends Component {
  constructor() {
    super();
    this.test = new Animated.Value(0);
    this.translateYValue = new Animated.Value(0);
    this.indicatorBarHeightValue = new Animated.Value(0);
    this.backgroundCircleSizeValue = new Animated.Value(0);
    this.backgroundCircleOpacityValue = new Animated.Value(0);
  }

  moveUp = () => {
    this.translateYValue.setValue(0);
    this.indicatorBarHeightValue.setValue(0);
    Animated.parallel([
      Animated.timing(
        this.indicatorBarHeightValue,
        {
          toValue: 1,
          duration: 500,
          easing: Easing.linear
        }
      ),
      Animated.timing(
        this.translateYValue,
        {
          toValue: 1,
          duration: 500,
          easing: Easing.linear
        }
      )
    ]).start();
  }

  shine(){
    shineTimes++;
    this.backgroundCircleSizeValue.setValue(0);
    this.backgroundCircleOpacityValue.setValue(0);

    Animated.parallel([
      Animated.timing(
        this.backgroundCircleSizeValue,
        {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear
        }
      ),
      Animated.timing(
        this.backgroundCircleOpacityValue,
        {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear
        }
      )
    ]).start(() => {
      if(shineTimes < 2){
        this.shine();
      }
    });
  }

  moveDown = () => {
    this.translateYValue.setValue(1);
    this.indicatorBarHeightValue.setValue(1);
    Animated.parallel([
      Animated.timing(
        this.indicatorBarHeightValue,
        {
          toValue: 0,
          duration: 500,
          easing: Easing.linear
        }
      ),
      Animated.timing(
        this.translateYValue,
        {
          toValue: 0,
          duration: 500,
          easing: Easing.linear
        }
      )
    ]).start(() => {
      shineTimes = 0;
      this.shine();
    });
  }

  render() {
    const spin = this.test.interpolate({
      inputRange: [0,1],
      outputRange: ['0deg','360deg']
    })

    const move = this.translateYValue.interpolate({
      inputRange: [0,1],
      outputRange: [0,-20]
    })

    const indicatorBarHeight = this.indicatorBarHeightValue.interpolate({
      inputRange: [0,1],
      outputRange: [100,40]
    })

    const backgroundCircleSize = this.backgroundCircleSizeValue.interpolate({
      inputRange: [0,0.5,1],
      outputRange: [70,150,70]
    })

    const backgroundCircleOpacity = this.backgroundCircleOpacityValue.interpolate({
      inputRange: [0,0.5,1],
      outputRange: [0,0.75,0]
    })

    return (
      <View style={{flex: 1}}>
        <Animated.View style={[styles.container, {transform: [{translateY: move}]}]}>
          <Animated.View style={[styles.indicatorBar, {height: indicatorBarHeight}]}/>

          <Animated.View style={styles.indicatorContainer}>
            <Animated.View style={[
              styles.backgroundCircle, 
              {width: backgroundCircleSize, height: backgroundCircleSize, opacity: backgroundCircleOpacity}
            ]}/>
            <View style={styles.mainCircle}/>
          </Animated.View>
        </Animated.View>

        <View style={{flex: 1, flexDirection: 'row'}}>
          <Button
            title='Up'
            onPress={this.moveUp}
          />

          <Button
            title='Down'
            onPress={this.moveDown}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  indicatorContainer: {
    width: 150,
    height: 150,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center'
  },
  backgroundCircle: {
    borderRadius: 75,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  mainCircle: {
    width: 70,
    height: 70,
    position: 'absolute',
    borderRadius: 35,
    backgroundColor: '#000000'
  },
  indicatorBar: {
    width: 14,
    top: 75,
    backgroundColor: '#231452',
    borderRadius: 8
  }
});

export default App;
