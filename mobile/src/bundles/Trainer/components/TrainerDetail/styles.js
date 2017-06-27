import {StyleSheet, Dimensions} from 'react-native'
import {DEFAULT_BACKGROUND_COLOR, DEFAULT_GREEN_COLOR, DEFAULT_GREY_COLOR} from '@theme/colors'
import {FONT_DAYTONA_REG, FONT_DAYTONA_BOLD} from '@theme/fonts'

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    marginTop: 0,
    height: Dimensions.get('window').height,
    backgroundColor: 'rgba(0,0,0,0)',
    zIndex: 7,
    position: 'absolute',
    top: 0,
  },
  trainerContainer: {
    width: 256,
    height: 365,
    marginTop: (Dimensions.get('window').height - 365) / 2,
    backgroundColor: 'white'
  },
  locationName: {
    fontFamily: FONT_DAYTONA_BOLD,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 25
  },
  trainerBio: {fontFamily:'System',fontSize:11,textAlign:'center',marginTop:15},
  trainerOptions: {fontFamily:FONT_DAYTONA_BOLD,fontSize:10,color:'#E67650',marginTop:20,marginBottom:20,textAlign:'center'},
  certificationContainer: {flexDirection:'row',alignSelf:'center',alignItems:'center',marginTop:6},
  certificationAbbrev: {marginLeft:5,marginRight:5,fontFamily:FONT_DAYTONA_BOLD,fontSize:10,color:'#AFAFB3'},
  buttonTextStyle: {color: 'white', textAlign: 'center',alignSelf: 'center',fontFamily:'System',fontWeight:'700',},
  buttonStyle: {backgroundColor: DEFAULT_GREEN_COLOR,height:50, justifyContent:'center'},
})

export default styles
