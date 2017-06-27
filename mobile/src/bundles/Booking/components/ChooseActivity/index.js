import React from 'react'
import {View, Image, Text, StatusBar, TouchableHighlight,ListView} from 'react-native'
import {Actions} from 'react-native-router-flux'
import Logo from '@components/Logo'
import Button from '@components/Button'
import styles from './styles'
import NavigationSteps from '@components/NavigationSteps'
import {DEFAULT_BACKGROUND_COLOR, DEFAULT_GREEN_COLOR,DEFAULT_GREY_COLOR} from '@theme/colors'
import {FONT_DAYTONA_REG, FONT_DAYTONA_BOLD} from '@theme/fonts'
import CONSTS from '@utils/Consts'

type Props = {
  activities: Array,
  bookingState: Object,
  selectActivity: Function,
}

class ChooseActivity extends React.Component{

  constructor(props) {
    super(props);
    var source = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    });

    this.state = {
      currentStep: this.props.bookingState.bookingType == CONSTS.BOOKING_TYPE.BY_ACTIVITY ? 1 : 2,
      totalSteps: 4, //always have just four.
      ds: this.props.activities,
      dataSource: source,
      modalVisible: false
    }
  }

  pressRow(rowData) {

  }

  selectActivity(activity){
    this.props.selectActivity(activity)
    Actions.chooseDateTime()
  }

  componentDidMount() {
    if(typeof this.state.ds == 'undefined'){
      Actions.mainAppModal(
      {
        uniqId: new Date().getTime(),
        visible: true,
        headerText: 'An Error Occured',
        detailsText: 'Error retrieving Activities from API.',
        onOkay:null,
        okayButtonText: 'OK',
        showCancelButton: false,
      }
      )
      return;
    }
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.state.ds)
    })
  }

  renderRow(rowData) {
    var activity = rowData.activity || rowData
    var imgSrc = [];
      imgSrc['Strength'] = require('../../assets/StrengthActivityBackground.png');
      imgSrc['Circuit Training']= require('../../assets/CircuitTrainingActivityBackground.png');
      imgSrc['Pilates']= require('../../assets/PilatesActivityBackground.png');
      imgSrc['Yoga']= require('../../assets/YogaActivityBackground.png');
      imgSrc['Boxing'] = require('../../assets/BoxingActivityBackground.png');
      imgSrc['Stretching'] = require('../../assets/StretchingActivityBackground.png');

    return (
      <TouchableHighlight onPress={() => this.selectActivity(activity)} underlayColor={'rgba(0,0,0,0)'}>
        <Image style={styles.image} source={imgSrc[activity.name]}>
          <Text style={{color:'black',marginLeft:20,fontSize:16,fontFamily:FONT_DAYTONA_REG,marginTop:15}}>{activity.name}</Text>
          <View style={{width:250}}>
          <Text style={{marginLeft:20,marginRight:32,color:'black',fontFamily:'System',fontWeight:'100',fontSize:11,marginTop:5}}>{activity.description}</Text>
          </View>
        </Image>
      </TouchableHighlight>
    )
  }

  render(){
    return (
      <View style={styles.container}>
        <NavigationSteps currentNumber={this.state.currentStep} numberOfSteps={this.state.totalSteps}  />
        <ListView enableEmptySections={true} style={{marginTop:10,marginBottom:50}} dataSource={this.state.dataSource} renderRow={this.renderRow.bind(this)}></ListView>
      </View>
    )
  }
}

export default ChooseActivity
