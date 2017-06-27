import React from 'react'
import {
  View,
  Image,
  Text,
  StatusBar,
  TouchableHighlight,
  ListView,
  PixelRatio,
  Dimensions
} from 'react-native'


import {Actions} from 'react-native-router-flux'
import Logo from '@components/Logo'
import Button from '@components/Button'
import ScheduledEventInfo from '@components/ScheduledEventInfo'
import PopupModal from '@components/PopupModal'
import HomeHelpModalPopup from '@components/PopupHelpModal/modalPopup'
import ButtonHelp from '@components/ButtonHelp'
import styles from './styles'
import moment from 'moment'
import Link from '@components/Link'
import NotLoggedInView from '@components/NotLoggedInView'
import {FONT_DAYTONA_LIGHT, FONT_DAYTONA_BOLD,FONT_DAYTONA_REG, FONT_DAYTONA_SEMIBOLD} from '@theme/fonts'
import {DEFAULT_BACKGROUND_COLOR, DEFAULT_GREEN_COLOR, DEFAULT_ORANGE_COLOR} from '@theme/colors'
import CONSTS from '@utils/Consts'
import {getCorrectFontSizeForScreen} from '@utils/multiResolution'

var mTitleSize,mTimeSize,mMsgNotificationSize;
var {height, width} = Dimensions.get('window');

type Props = {
  user: Object,
  isLoggedIn: boolean,
  getUserInfo: Function,
  chatSessions: Array,
  chatMessages: Object,
}

class ChatList extends React.Component {

  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});
    mTitleSize = getCorrectFontSizeForScreen(12);
    mTimeSize = getCorrectFontSizeForScreen(8);
    mMsgNotificationSize = getCorrectFontSizeForScreen(10);

    this.state = {
      user: props.user,
      ds: props.chatSessions,
      dataSource: ds,
      modalVisible: false,
      chatMessages: props.chatMessages
    }
  }

  componentWillReceiveProps(nextProps){

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});

    this.setState({
      dataSource: ds.cloneWithRows(nextProps.chatSessions.slice()),
      ds: nextProps.chatSessions,
      chatMessages: nextProps.chatMessages
    })
  }

  pressRow(rowData) {
    let user = this.state.user.userType === CONSTS.USER_TYPE.CUSTOMER ? rowData.trainer : rowData.customer

    Actions.chatScene({sessionId: rowData.sessionId, name: user.name});

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

    var chatMessages = this.state.chatMessages[rowData.sessionId]
    var boldText = rowData.lastReadDate !== rowData.lastMessageDate
    var numberOfUnread = 0;
    if(boldText){//cheap way to detect unread messages ^_^
      chatMessages.map((message,index) => {
        if(message.createdAt === rowData.lastReadDate){
          numberOfUnread = (index + 1);
        }
      })
    }
    let userToDisplay = this.state.user.userType === CONSTS.USER_TYPE.CUSTOMER ? rowData.trainer : rowData.customer
    return (
      <TouchableHighlight onPress={() => {this.pressRow(rowData)}}>
      <View style={{flex: 1,flexDirection: 'row', paddingTop:15,paddingBottom:15, borderBottomWidth:1,borderBottomColor: '#c0c0c0'}}>
        <View style={{marginLeft:12, marginRight:12}}>
          { userToDisplay.avatar === null ?
            <Image style={[{
              borderRadius: 25,
              width:50,
              height: 50,
              // position:'absolute'
            }, boldText ? {borderColor:'#E67650',borderWidth:2} : {}]} source={require('@images/default-avatar.png')} />

             :
          <Image style={[{
            borderRadius: 25,
            width:50,
            height: 50,
            // position:'absolute'
          }, boldText ? {borderColor:'#E67650',borderWidth:2} : {}]} source={{uri: userToDisplay.avatar.url}} />
          }
        { numberOfUnread > 0 ?
        <View style={{backgroundColor:'#E67650',width:22,height:22,right:-5,top:-5,borderRadius:11,borderWidth:2,borderColor:'#E67650',position:'absolute'}}>
          <Text style={{textAlign:'center',justifyContent:'center',color:'white',fontSize:mMsgNotificationSize,fontFamily:FONT_DAYTONA_SEMIBOLD,width:17,height:10,marginTop:2,backgroundColor:'rgba(0,0,0,0)'}}>{numberOfUnread}</Text>
        </View>
        :
        null
        }

        </View>
        <View>
          <View style={{flexDirection:'row',marginBottom: 6,alignItems: 'center'}}>
            <Text style={{fontFamily: FONT_DAYTONA_SEMIBOLD, fontSize: mTitleSize, color: 'black'}}>{userToDisplay.name}</Text>
            <Text style={{marginLeft: 6,color:'#5A5A5A',fontSize:mTimeSize,fontFamily:'System', fontWeight: 'bold'}}>{moment.duration(moment().diff(rowData.lastMessageDate)).humanize()} ago</Text>
          </View>
          <View style={{flex:1,flexDirection:'column'}}>
            <Text style={{flex:1, maxWidth:220,fontSize:mMsgNotificationSize,fontFamily:'System', fontWeight: boldText ? 'bold' : 'normal',color: '#7D7D80'}}>{chatMessages.length === 0? 'No messages sent.' : chatMessages[0].text }</Text>
          </View>
        </View>
      </View>
    </TouchableHighlight>
    )
  }

  renderNoChatsYet(){
    return (
      <View style={{justifyContent:'center', flex: 1}}>
        <Text style={{textAlign: 'center',fontFamily:FONT_DAYTONA_BOLD, fontSize:20, color:'#4C4C4C',marginTop: 24}}>No chats, yet!</Text>
        <Text style={{textAlign: 'center',fontFamily:FONT_DAYTONA_REG, fontSize:14, color:'#4C4C4C', marginTop: 12,marginBottom: 24,marginLeft:24,marginRight:24,}}>Book a confirmed session with a trainer to chat with them.</Text>
          <Button buttonStyle={styles.bookButtonStyle} buttonTextStyle={styles.bookButtonTextStyle} onPress={Actions.chooseActivity}>
            Book a Workout!
          </Button>
      </View>

    )
  }

  render() {

    if(this.props.isLoggedIn && this.props.user.isVerified) {
      if(this.props.chatSessions.length > 0){
        return (
          <View style={{flex: 1,alignItems: 'stretch',justifyContent:'center', width:null,}}>
            <ListView enableEmptySections={true} style={{marginTop:65, marginBottom:40}} dataSource={this.state.dataSource} renderRow={this.renderRow.bind(this)}></ListView>
          </View>
        )
      }else{
        return this.renderNoChatsYet()
      }

    }else{
      return(
         <NotLoggedInView userId={this.props.user.id}  userId={this.props.user.id} getUserInfo={this.props.getUserInfo} loggedIn={this.props.isLoggedIn}  image={require('../../assets/chat-icon.png')} headerText='Chats With Trainers' descriptionText='This screen will show all your future conversations with trainers.' />
      )
    }
  }
}

export default ChatList
