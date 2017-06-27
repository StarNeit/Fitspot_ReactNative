import React from 'react'
import {View,Image,Text,StatusBar,TouchableHighlight,ListView} from 'react-native'
import {Actions} from 'react-native-router-flux'
import Logo from '@components/Logo'
import Button from '@components/Button'
import ScheduledEventInfo from '@components/ScheduledEventInfo'
import PopupModal from '@components/PopupModal'
import HomeHelpModalPopup from '@components/PopupHelpModal/modalPopup'
import ButtonHelp from '@components/ButtonHelp'
import styles from './styles'

import {FONT_DAYTONA_LIGHT, FONT_DAYTONA_BOLD,FONT_DAYTONA_REG, FONT_DAYTONA_SEMIBOLD} from '@theme/fonts'
import {DEFAULT_BACKGROUND_COLOR, DEFAULT_GREEN_COLOR, DEFAULT_ORANGE_COLOR} from '@theme/colors'

type Props = {
  events: Array,
  selectedDate: Object,
  activities: Array,
  editEvent: Function,
  chatSessions: Array,
}

class EventsListView extends React.Component {

  constructor(props) {
    super(props);
    var source = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    });
    this.state = {
      ds: this.props.events,
      dataSource: source,
      modalVisible: false
    }
  }

  pressRow(rowData) {

  }

  componentDidMount() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.state.ds)
    })
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  renderRow(rowData) {
    return (
      <ScheduledEventInfo eventInfo={ rowData } chatSessions={this.props.chatSessions} editEvent={this.props.editEvent} activities={this.props.activities} showCommunicationOptions={true}/>
    )
  }

  renderListView(){
    return (
      <View style={{flex: 1}}>
        <ListView enableEmptySections={true} style={{marginTop:0, marginBottom:0}} dataSource={this.state.dataSource} renderRow={this.renderRow.bind(this)}></ListView>
      </View>
    )
  }

  renderNoResults(){
      return (
        <View style={{justifyContent:'center', flex: 1}}>
          <Text style={{textAlign: 'center',fontFamily:FONT_DAYTONA_BOLD, fontSize:20, color:'#4C4C4C',marginTop: 24}}>No Booked Sessions</Text>
          <Text style={{textAlign: 'center',fontFamily:FONT_DAYTONA_REG, fontSize:14, color:'#4C4C4C', marginTop: 12,marginBottom: 24,marginLeft:24,marginRight:24,}}>Book some sessions and they will show here on your calendar.</Text>
            <Button buttonStyle={styles.bookButtonStyle} buttonTextStyle={styles.bookButtonTextStyle} onPress={Actions.chooseActivity}>
              Book Your First Workout!
            </Button>

        </View>
      )
  }

  render() {
    if(this.props.events.length > 0){
      return this.renderListView()
    }else{
      return this.renderNoResults()
    }

  }
}

export default EventsListView
