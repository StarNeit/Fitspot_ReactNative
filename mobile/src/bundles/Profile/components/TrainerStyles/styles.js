import {StyleSheet, Dimensions} from 'react-native'
import {DEFAULT_BACKGROUND_COLOR, DEFAULT_GREEN_COLOR} from '@theme/colors'
import { FONT_DAYTONA_LIGHT } from '@theme/fonts'

const styles = StyleSheet.create({
  container: {
  flex: 1,
  marginTop: 20,
},
buttonStyle: {marginBottom: 12,alignSelf:'stretch',marginLeft:0,marginRight:0,backgroundColor:DEFAULT_GREEN_COLOR,height:50, justifyContent:'center',borderColor: DEFAULT_GREEN_COLOR,borderWidth:1},
buttonTextStyle: {color: 'white', textAlign: 'center',alignSelf: 'center',fontWeight: 'bold'},
})

export default styles
