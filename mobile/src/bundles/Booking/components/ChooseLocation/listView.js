import React from 'react'
import {View, Image, Text, StatusBar, TouchableHighlight,ListView,TextInput} from 'react-native'
import {Actions} from 'react-native-router-flux'
import styles from './styles'
import {DEFAULT_BACKGROUND_COLOR, DEFAULT_GREEN_COLOR,DEFAULT_GREY_COLOR} from '@theme/colors'

type Props = {
  isVisible: bool,
  locationItems: Object,
  chooseLocation: Function,
}

class ChooseLocationListView extends React.Component{

  constructor(props) {
    super(props);
    const {locationItems} = props;
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    });
    this.state = {
      ds: locationItems,
      dataSource: ds,
    }
  }

  componentDidMount() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.state.ds)
    })
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.locationItems.length != 0 &&
      this.state.ds.length != nextProps.locationItems.length){
        this.setState({
          dataSource:this.state.dataSource.cloneWithRows(nextProps.locationItems),
          ds : nextProps.locationItems
        })
    }
  }

  pressRow(item){
    this.props.chooseLocation(item)
  }

  searchList(value){
    var results = this.props.locationItems.filter(gym => gym.name.includes(value))

    if(value.length == 0){
      this.setState({
        dataSource:this.state.dataSource.cloneWithRows(this.state.ds),
      })
    }else{
      this.setState({
        dataSource:this.state.dataSource.cloneWithRows(results),
      })
    }
  }

  renderSearch(){
    return (
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search..."
          clearButtonMode='while-editing'
          onChangeText={(text) => this.searchList(text)}
        />
      </View>
    )
  }

  renderRow(rowData) {
    return (
      <TouchableHighlight onPress={() => this.pressRow(rowData)}>
        <View style={styles.row} >
          <View>
            <Image style={styles.image} source={require('../../assets/choose-location-location-default-icon.png')} />
          </View>
          <View>
            <Text style={styles.rowTitle}>{rowData.name}</Text>
            <Text style={styles.rowAddress}>{rowData.address}</Text>
          </View>
        </View>
      </TouchableHighlight>

    )
  }

  render(){

    if(!this.props.visible){
      return null;
    }
    //{height: 0, opacity: 0}
    return (
      <View style={[styles.container]}>
        <ListView style={styles.listStyle} enableEmptySections={true} dataSource={this.state.dataSource} renderHeader={this.renderSearch.bind(this)} renderRow={this.renderRow.bind(this)}></ListView>
      </View>
    )
  }
}

export default ChooseLocationListView
