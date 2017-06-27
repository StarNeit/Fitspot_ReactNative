import React from 'react'
import {Actions} from 'react-native-router-flux'
import { TextInput,View, ListView, StyleSheet, Text, ScrollView, Image, ActivityIndicator } from 'react-native';
import styles from './styles'
import moment from 'moment'
import ApiUtils from '@utils/ApiUtils'

import {FONT_DAYTONA_REG, FONT_DAYTONA_BOLD} from '@theme/fonts'
import {DEFAULT_GREEN_COLOR} from '@theme/colors'

import ButtonSettings from '@components/ButtonSettings'
import HorizontalLine from '@components/HorizontalLine'
import Button from '@components/Button'
import CONSTS from '@utils/Consts'


type Props = {
  payoutItems: Array,
  getPayoutInfo: Function
}


class PaymentHistory extends React.Component{

  constructor(props) {
    super(props);

    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    });
    var totalEarned = 0;
    if(props.payoutItems.length > 0){
      for (var item in props.payoutItems) {
          totalEarned += item['trainerPayout'];
      };
    }
    const sumValues = (obj) => Object.keys(obj).reduce((acc, value) => acc + obj[value], 0);
    this.state = {
      // items: props.workoutItems,
      items: [0,1,2,3,4,5,6,7,8,0,1,2,3,4,5,6,7,8],
      dataSource: ds,
      modalVisible: false,
      currentMonth: moment(),
      titleString: moment().subtract(1,'month').format('MMM DD YYYY') + ' - ' + moment().format('MMM DD YYYY'),
      isLoading: false,
      totalEarned : totalEarned
    }
  }

  componentWillReceiveProps(newProps){


  }


  getPayoutInfo(dtStart,dtEnd){
    var me = this
    this.setState({isLoading:true})
    ApiUtils.get('trainers/payment-history?dtStart=' + dtStart + '&dtEnd=' + dtEnd)
    .then(([response, jsonBody]) => {
      if (response.status == 200) {
        var totalEarned = 0;
        if(jsonBody.workouts.length > 0){
          for (var item in jsonBody.workouts) {
              totalEarned += item['trainerPayout'];
          };
        }
        me.setState({items: jsonBody.workouts,
          titleString: moment(dtStart).format('MMM DD YYYY') + ' - ' + moment(dtEnd).format('MMM DD YYYY'),
          dataSource: this.state.dataSource.cloneWithRows(jsonBody.workouts),
          totalEarned: totalEarned,
        })

      } else {
        Actions.mainAppModal(
        {
          uniqId: new Date().getTime(),
          visible: true,
          headerText: 'Payment History Error',
          detailsText: jsonBody.message,
          onOkay:null,
          okayButtonText: 'OK',
          showCancelButton: false,
        }
        )
      }
      this.setState({isLoading:false})
    })
  }


  componentDidMount() {
    this.setState({dataSource: this.state.dataSource.cloneWithRows(this.state.items)})
  }

  advanceMonth(){
    var dateStart = this.state.currentMonth.utc().format()
    var dateEnd = this.state.currentMonth.add(1,'months').utc().format()
    this.getPayoutInfo(dateStart,dateEnd)

  }
  decreaseMonth(){
    var dateEnd = this.state.currentMonth.utc().format()
    var dateStart = this.state.currentMonth.subtract(1,'months').utc().format()
    this.getPayoutInfo(dateStart,dateEnd)
    
  }



  renderRow(rowData){
    return (
      <View style={{flex:1,alignSelf:'stretch'}}>
        <View style={{flexDirection:'row',marginTop:12,marginBottom:12,}}>
          <Text style={{fontFamily:'System',fontWeight:'500',color:'#4D4D4D',flex:1,marginLeft:16}}>{moment().format('DD MMM ha')}</Text>
          <Text style={{fontFamily:'System',fontWeight:'500',color:'#4D4D4D',flex:1,textAlign:'center',width:100}}>Deborah S.</Text>
          <Text style={{fontFamily:'System',fontWeight:'500',color:'#4D4D4D',flex:1,textAlign:'right',marginRight:16}}>$40</Text>
        </View>
        <HorizontalLine />
      </View>
    )
  }

    render (){
      return (
        <View style={{marginBottom:75}}>
          <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',}}>
            <Button onPress={() => this.decreaseMonth()} buttonStyle={styles.arrowButtonStyle} ><Image style={styles.image} source={require('@images/leftArrow.png')} /></Button>
            <Text style={{fontFamily:FONT_DAYTONA_BOLD, fontSize:13,color:'#4C4C4C',marginBottom:2}}>{this.state.titleString}</Text>
            <Button onPress={() => this.advanceMonth()} buttonStyle={styles.arrowButtonStyle} ><Image style={styles.image} source={require('@images/rightArrow.png')} /></Button>
          </View>
          <View style={{flexDirection:'row',marginTop:18}}>
            <Text style={{fontFamily:'System',fontWeight:'bold',color:'#5A5A5A',fontSize:11,flex:1,marginLeft:16}}>DATE & TIME</Text>
            <Text style={{fontFamily:'System',fontWeight:'bold',color:'#5A5A5A',fontSize:11,flex:1,textAlign:'center',width:100}}>CLIENT</Text>
            <Text style={{fontFamily:'System',fontWeight:'bold',color:'#5A5A5A',fontSize:11,flex:1,textAlign:'right',marginRight:16}}>EARNED</Text>
          </View>
          <HorizontalLine fullWidth/>
          <View>
          <ActivityIndicator color="#4C4C4C" size='large' style={{position:'absolute',top:0,bottom:0,left:0,right:0,opacity: this.state.isLoading ? 1 : 0}} />
          <ListView enableEmptySections={true} contentContainerStyle={{marginTop: this.state.items.length == 0 ? 50 : 0, marginBottom: this.state.items.length == 0 ? 50: 0 ,opacity: this.state.isLoading ? 0 : 1,zIndex:4,backgroundColor:'white'}}  dataSource={this.state.dataSource} renderRow={this.renderRow.bind(this)}></ListView>
          </View>
          <HorizontalLine fullWidth/>
          <View style={{flexDirection:'row'}}>
            <Text style={{fontFamily:'System',fontWeight:'bold',color:'#4C4C4C',flex:1,marginLeft:16,}}>TOTAL</Text>
            <Text style={{fontFamily:'System',fontWeight:'bold',color:'#4C4C4C',flex:1,textAlign:'center'}}>{this.state.items.length} Clients</Text>
            <Text style={{fontFamily:'System',fontWeight:'bold',color:'#4C4C4C',flex:1,marginRight:16,textAlign:'right'}}>${this.state.totalEarned}</Text>
          </View>

        </View>
      )
    }
}

export default PaymentHistory
