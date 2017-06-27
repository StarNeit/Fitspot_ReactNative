/* @flow */
import React from 'react'
import {View, Text, Image, Modal, TouchableHighlight} from 'react-native'
import {Actions} from 'react-native-router-flux'
import Title from '@components/Title'
import Button from '@components/Button'

import styles from './styles'
type Props = {
}

class HomeHelpModalPopup extends React.Component {
  render() {
    return (
          <View style={{ height: 400, width: 280,}}>
            <View style={{  flex: 1,flexDirection: 'row',flexWrap: 'nowrap',alignItems: 'center',justifyContent: 'space-around'}}>
              <View style={{ flex: 1,flexDirection: 'column',alignItems: 'center',alignSelf: 'center'}}>
                <Text style={styles.modalLargeNumber}>1</Text>
                <Image source={require('./assets/vert-line.png')}/>
                <Text style={styles.modalLargeNumber}>2</Text>
                <Image source={require('./assets/vert-line.png')}/>
                <Text style={styles.modalLargeNumber}>3</Text>
              </View>
              <View style={{flex: 2,flexDirection: 'column',}}>
                <View>
                  <Text style={styles.modalTitle}>Request a Workout</Text>
                  <Text style={styles.modalDesc}>First, choose an activity, at what time and location, and pick one of our certified hand-picked trainers.</Text>
                </View>
                <View>
                  <Text style={styles.modalTitle}>Trainer Confirms</Text>
                  <Text style={styles.modalDesc}>Next, we send a request to the chosen trainer, and they either confirm right away, or suggest a slight modification.</Text>
                </View>
                <View>
                  <Text style={styles.modalTitle}>Get Ready to Sweat</Text>
                  <Text style={styles.modalDesc}>You're all set. The trainer will provide the necesarry equipment for the activity. Have a great workout!</Text>
                </View>
              </View>
            </View>
            <View>
              <Text style={styles.modalHelpText}>Want more information?</Text>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around'
              }}>
                <Button onPress={() => alert('Find out where to go')} buttonStyle={styles.modalButton} buttonTextStyle={styles.modalButtonText}>FAQ</Button>
                <Button onPress={() => alert('Not implemented')} buttonStyle={styles.modalButton} buttonTextStyle={styles.modalButtonText}>Chat</Button>
              </View>
            </View>
          </View>
    )
  }
}

export default HomeHelpModalPopup
