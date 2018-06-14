import React, { Component } from 'react';
import {
  View,
  Animated,
  Easing,
  StyleSheet
} from 'react-native';
import LottieView from 'lottie-react-native';

export default class LottieAnimation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: new Animated.Value(0),
    };
  }

  componentDidMount() {
    this.laughing()
  }

  laughing() {
    this.state.progress.setValue(0)
    Animated.timing(this.state.progress, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
    }).start(()=>{this.laughing()});
  }

  render() {
    return (
      <LottieView source={require('./animations/search_&_locate.json')} progress={this.state.progress} />
    );
  }
}