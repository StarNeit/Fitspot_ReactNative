
import {StyleSheet, Dimensions} from 'react-native'
import {DEFAULT_BACKGROUND_COLOR, DEFAULT_GREEN_COLOR} from '@theme/colors'
import { FONT_DAYTONA_LIGHT } from '@theme/fonts'

const styles = StyleSheet.create({
  container: {
  flex: 1,
},
buttonStyle: {marginBottom: 24,alignSelf:'stretch',marginLeft:35,marginRight:35,backgroundColor:'white',height:50, justifyContent:'center',borderColor: '#5D5D5F',borderWidth:1},
buttonTextStyle: {color: '#5D5D5F', textAlign: 'center',alignSelf: 'center',fontWeight: 'bold'},
bookButtonStyle: {marginBottom: 24,alignSelf:'stretch',marginLeft:35,marginRight:35,backgroundColor:DEFAULT_GREEN_COLOR,height:50, justifyContent:'center',borderColor: DEFAULT_GREEN_COLOR,borderWidth:1},
bookButtonTextStyle: {color: 'white', textAlign: 'center',alignSelf: 'center',fontWeight: 'bold'},
loginButtonStyle: {fontFamily:'System', fontWeight: '700',marginBottom: 24,alignSelf:'center',marginLeft:35,marginRight:35,height:50,color:DEFAULT_GREEN_COLOR},
})

export default styles
