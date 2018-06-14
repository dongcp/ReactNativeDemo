import React, { Component } from 'react';
import {
    View,
    Text,
    Button
} from 'react-native';
import SlidingUpPanel from 'rn-sliding-up-panel';

export class SlideUpScreen extends Component {
  state = {
    visible: true
  }

  render() {
    return (
      <View style={styles.container}>
        <Button title='Show panel' onPress={() => this.setState({visible: true})} />
        <SlidingUpPanel
          visible={this.state.visible}
          onRequestClose={() => this.setState({visible: false})}
          draggableRange={{top:300, bottom: 120}}>
          <View style={styles.test}>
            <Text>Here is the content inside panel</Text>
          </View>
        </SlidingUpPanel>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center'
  },
  test: {
    flex: 1,
    backgroundColor: '#ffffff'
  }
}

export default SlideUpScreen;
