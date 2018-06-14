import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  Image,
  StyleSheet,
  Animated
} from 'react-native';

var isHidden;

export default class TestReveal extends Component {
  constructor(){
    super();

    isHidden = true;

    this.state = {
      translateValue: new Animated.Value(380),
      listHeightValue: new Animated.Value(0),
      buttonHeightValue: new Animated.Value(80)
    }
  }

  toggleList = () => {
    console.log("Alhu");
    let toTranslateValue = isHidden?0:380;

    this.setState({
      listHeightValue: isHidden?380:0,
      buttonHeightValue: isHidden?0:80
    })

    Animated.parallel([
      Animated.spring(
        this.state.translateValue,
        {
          toValue: toTranslateValue,
          velocity: 3,
          tension: 2,
          friction: 8
        }
      )
    ]).start();

    isHidden = !isHidden;
  }

  render() {
    return(
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <View style={{width: '100%', height: 460, alignItems: 'center'}}>
          <Animated.View style={{width: '90%', height: this.state.buttonHeightValue, transform:[{translateY: this.state.translateValue}]}}>
            <TouchableHighlight 
                style={styles.itemContainer}
                onPress={this.toggleList}>
                <View style={{flex: 1, flexDirection: 'row', }}>
                <Image source={require('./img/sports-car.png')} style={{width: 80, height: 80}}/>
                </View>
            </TouchableHighlight>
          </Animated.View>

          <Animated.View style={[styles.listContainer, {height: this.state.listHeightValue, transform:[{translateY: this.state.translateValue}]}]}>
            
          </Animated.View>
        </View>

        <View style={{flex: 1, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center'}}>
          <TouchableHighlight style={{width: 60, height: 60, borderRadius: 30, borderWidth: 1, borderColor: '#000000'}}
           onPress={this.toggleList}>
            <Image source={require('./img/ic_down.png')}/> 
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    width: '100%', 
    height: '100%', 
    padding: 10, 
    backgroundColor: '#ffffff'
  },
  listContainer: {
    width: '95%',
    top: 80,
    backgroundColor: '#ffffff'
  }
});
