


import {StyleSheet} from 'react-native'
import {DEFAULT_BACKGROUND_COLOR, DEFAULT_GREEN_COLOR} from '@theme/colors'
import { FONT_DAYTONA_LIGHT, FONT_DAYTONA_BOLD, FONT_DAYTONA_FAT,FONT_DAYTONA_REG } from '@theme/fonts'

const styles = StyleSheet.create({
  container:{
    height: 300,
    width: 350,
    backgroundColor: 'rgba(1,1,1,0)'  
  },
  textContainer:{
    marginTop: 20,
    marginBottom: 10
  },
  detailContainer:{
    backgroundColor: '#F2F2F2',
    marginTop: 10,
    justifyContent:'stretch',
    flex:1
  },
  contentText:{
    marginTop: 15,
    marginBottom: 15,     
    color : '#4B4B4C',
    fontSize: 12,
    textAlign:'center',
    fontFamily: FONT_DAYTONA_REG,
    borderBottomColor:'#E7E7E7',
    borderBottomWidth:1
  },
  rowBtn: {
    height: 44,
    justifyContent: 'center',
    alignSelf: 'stretch',
    marginRight:20,
    marginLeft:20,
    borderBottomColor:'#E7E7E7',
    borderBottomWidth:1
  },
  rowBtnText:{
    color : '#4B4B4C',
    textAlign:'left', 
    fontSize: 15,
    fontFamily: FONT_DAYTONA_REG
  },

  btnContainer:{
    marginTop: 25,
    bottom:0,
    flex:1,
    alignSelf: 'stretch',
    justifyContent: 'center',

  },
  
  headerText:{
    fontFamily: FONT_DAYTONA_BOLD ,
    fontWeight: 'bold',
    fontSize : 17,
    textAlign:'center',
    color : 'black',
    marginTop: 10
  },
  
  headerContentText:{
    marginTop: 10,
    marginLeft: 6,
    marginRight: 6,
    fontFamily: FONT_DAYTONA_BOLD ,
    fontWeight: 'bold',
    fontSize : 14,
    textAlign:'center',
    color : '#4B4B4C'
  },
  
  popBtn: {
    height:60,
    justifyContent: 'center',
    alignSelf: 'stretch',
    backgroundColor: DEFAULT_GREEN_COLOR
  },
  popBtnText:{
    fontFamily: FONT_DAYTONA_BOLD ,
    fontWeight: 'bold',
    fontSize : 15,
    textAlign:'center',
    color : 'white'
  },
  popCancelBtn:{
    height: 65,
    justifyContent: 'center',
    alignSelf: 'stretch',
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    backgroundColor : '#E85F64'
  }
})

export default styles
