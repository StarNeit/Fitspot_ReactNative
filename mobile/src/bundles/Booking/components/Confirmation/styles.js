import {StyleSheet, Dimensions} from 'react-native'
import {DEFAULT_BACKGROUND_COLOR, DEFAULT_GREEN_COLOR} from '@theme/colors'
import {FONT_DAYTONA_LIGHT, FONT_DAYTONA_BOLD, FONT_DAYTONA_SEMIBOLD, FONT_DAYTONA_REG} from '@theme/fonts'

const styles = StyleSheet.create({
  clientContainer: {
    flex: 1,
    // justifyContent: 'space-around',
    alignItems: 'center',
    width: null,
    height: null,
    marginBottom:55,
    marginTop:55,
  },
  headerText: {
    fontFamily: FONT_DAYTONA_BOLD,
    fontSize: 14,
    marginTop: 31,
    color: '#fff',
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0)'
  },
  row: {
    flex: 1,
    // flexDirection:'row',
    backgroundColor: 'rgba(255,255,255,1)',
    width: 256,
    height: 115,
    alignSelf: 'center',
    marginBottom: 20,
    borderRadius: 6,
    marginTop: 10,
  },
  rowTop: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6
  },
  bold: {
    fontFamily: FONT_DAYTONA_BOLD
  },
  rowTopTitle: {
    fontFamily: FONT_DAYTONA_SEMIBOLD,
    fontSize: 14,
    color: 'white',
    textAlign: 'center'
  },
  rowBottom: {
    flex: 2,
    flexDirection: 'row',
  },
  rowBottomHeader: {
    color: '#c4c4c4',
    fontWeight: 'bold',
    fontSize: 8
  },
  rowBottomText: {
    color: '#c4c4c4',
    fontSize: 20,
    fontFamily: FONT_DAYTONA_LIGHT
  },
  rowBottomColumn: {
    flex: 1,
    justifyContent: 'center'
  },
  bestValue: {
    position: 'absolute',
    top: 33,
    left: -5
  },

    buttonStyle: {marginBottom: 24,alignSelf:'stretch',marginLeft:35,marginRight:35,backgroundColor:'white',height:50, justifyContent:'center',borderColor: '#5D5D5F',borderWidth:1},
    buttonTextStyle: {color: '#5D5D5F', textAlign: 'center',alignSelf: 'center',fontWeight: 'bold'},
    bookButtonStyle: {width:Dimensions.get('window').width,marginBottom: 24,alignSelf:'stretch',marginLeft:0,marginRight:0,backgroundColor:DEFAULT_GREEN_COLOR,height:50, justifyContent:'center'},
    bookButtonTextStyle: {color: 'white', textAlign: 'center',alignSelf: 'center',fontWeight: 'bold'},
    loginButtonStyle: {fontFamily:'System', fontWeight: '700',marginBottom: 24,alignSelf:'center',marginLeft:35,marginRight:35,height:50,color:DEFAULT_GREEN_COLOR},
    purchaseHeaderText: {textAlign: 'center',fontFamily:FONT_DAYTONA_BOLD, fontSize:20, color:'#4C4C4C',marginTop: 24},
    purchaseSubheaderText: {textAlign: 'center',fontFamily:FONT_DAYTONA_REG, fontSize:14, color:'#4C4C4C', marginTop: 12,marginBottom: 24},

})

export default styles
