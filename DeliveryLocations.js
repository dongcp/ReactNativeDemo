import React, { Component } from 'react'
import {
  View,
  Image,
  Text,
  TouchableHighlight,
  Animated,
  PanResponder,
  StyleSheet
} from 'react-native'

var isHidden;
var isDraggingUp = false;

export default class DeliveryLocations extends Component {
  constructor(){
    super()
    isHidden = true;
    this.state = {
      listHeightValue: new Animated.Value(0),
      listOpacityValue: new Animated.Value(0)
    }
  }

  toggleMenu = () => {
    console.log("Alo")
    let toHeightValue = isHidden?250:0
    let toOpacityValue = isHidden?1:0

    Animated.parallel([
      Animated.spring(
        this.state.listHeightValue,
        {
          toValue: toHeightValue,
          velocity: 10,
          friction: 20
        }
      ),
      Animated.sequence([
        Animated.delay(isHidden?100:0),
        Animated.spring(
          this.state.listOpacityValue,
          {
            toValue: toOpacityValue,
            velocity: 15,
            friction: 20
          }
        )
      ])
    ]).start()

    isHidden = !isHidden
  }

  panResponder = {}

  componentWillMount() {
    this.panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: this.handlePanResponderGrant,
      onPanResponderMove: this.handlePanResponderMove,
      onPanResponderRelease: this.handlePanResponderEnd,
      onPanResponderTerminate: this.handlePanResponderEnd
    })
  }

  render() {
    return(
      <View style={{flex: 1, backgroundColor: '#00ffff'}}>
        <View style={{flex: 1, width: '100%', height: '100%', position: 'absolute', justifyContent: 'space-between', padding: 10}}>
          <View style={styles.topView}>
            
          </View>

          <View style={styles.bottomView}>
            <View style={{backgroundColor: 'white', marginTop: 15, padding: 10, borderRadius: 5}} {...this.panResponder.panHandlers}>
                <Text style={{fontSize: 13, color: 'black'}}>Diem lay hang</Text>
                <View style={{flexDirection: 'row', marginTop: 5}}>
                  <Image source={require('./img/ic_pin_map.png')} style={{width: 18, height: 18}} resizeMode='contain'/>
                  <Text style={{marginLeft: 5}}>So 3, Khuong Trung, Thanh Xuan</Text>
                </View>

              <Animated.View style={{backgroundColor: 'yellow', marginTop: 5, opacity: this.state.listOpacityValue, height: this.state.listHeightValue}}>
                <View style={{flexDirection: 'row', marginTop: 5}}>
                    <Image source={require('./img/ic_pin_map.png')} style={{width: 18, height: 18}} resizeMode='contain'/>
                    <Text style={{marginLeft: 5}}>So 3, Khuong Trung, Thanh Xuan</Text>
                </View>
                <View style={{flexDirection: 'row', marginTop: 5}}>
                    <Image source={require('./img/ic_pin_map.png')} style={{width: 18, height: 18}} resizeMode='contain'/>
                    <Text style={{marginLeft: 5}}>So 3, Khuong Trung, Thanh Xuan</Text>
                </View>
                <View style={{flexDirection: 'row', marginTop: 5}}>
                    <Image source={require('./img/ic_pin_map.png')} style={{width: 18, height: 18}} resizeMode='contain'/>
                    <Text style={{marginLeft: 5}}>So 3, Khuong Trung, Thanh Xuan</Text>
                </View>
              </Animated.View>

              <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <View>
                  <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <Image source={require('./img/ic_pin_location.png')} style={{width: 18, height: 18, marginTop: 5}} resizeMode='contain'/>
                    <Text style={{marginLeft: 5}}>3 diem giao</Text>
                  </View>

                  <Text style={{position: 'absolute', opacity: 0}}>Quang duong: 15km</Text>
                </View>

                <Text>Tong cuoc: 70k</Text>
              </View>

            </View>

            <TouchableHighlight
              style={{position: 'absolute', alignSelf: 'center'}}
              onPress={this.toggleMenu}
            >
              <Image
                style={{width: 30, height: 30}}
                source={require('./img/ic_menu.png')}
                resizeMode='center'
              />
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }

  // Should we become active when the user presses down on the square?
  handleStartShouldSetPanResponder = (e, gestureState) => {
    return true
  }

  // We were granted responder status! Let's update the UI
  handlePanResponderGrant = (e, gestureState) => {
    console.log("Dragging")
  }

  // Every time the touch/mouse moves
  handlePanResponderMove = (e, gestureState) => {
    console.log("Handle Pan Responder Move: "+gestureState.dx+"_"+gestureState.dy)
    
    isDraggingUp = gestureState.dy < 0;
    
    // Keep track of how far we've moved in total (dx and dy)
    // this.setState({
    //   offsetTop: gestureState.dy,
    //   offsetLeft: gestureState.dx,
    // })
  }

  // When the touch/mouse is lifted
  handlePanResponderEnd = (e, gestureState) => {
    // const {initialTop, initialLeft} = this.state
    if(isDraggingUp){
      console.log("Up: "+ this.state.listHeightValue._value)
      if(this.state.listHeightValue._value<250-2){
        this.toggleMenu()
      }
    }else{
      console.log("Down: "+ this.state.listHeightValue._value)
      if(this.state.listHeightValue._value>0){
        this.toggleMenu()
      }
    }
  }
}

const styles =  StyleSheet.create({
  topView: {
    width: '100%',
    height: 100,
    backgroundColor: '#000000'
  },
  bottomView: {
    justifyContent: 'flex-start'
  }
});
