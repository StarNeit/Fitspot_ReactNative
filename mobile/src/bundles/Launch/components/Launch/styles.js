
import {StyleSheet, Dimensions} from 'react-native'
import {DEFAULT_BACKGROUND_COLOR, DEFAULT_GREEN_COLOR} from '@theme/colors'
import { FONT_DAYTONA_LIGHT } from '@theme/fonts'

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    width: null,
    height: null,
    backgroundColor: '#222'
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.3
  },
  logoImage: {
    marginTop: 110,
    width: 164,
    height: 100,
  },
  textBlock: {
    fontSize: 14,
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'white',
    width: 256,
    fontFamily: FONT_DAYTONA_LIGHT,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    width: Dimensions.get('window').width,
    alignItems: 'center',
    marginTop: 130,
  },
  loginButton: {
    height: 50,
    width: null,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0)',
    borderColor: DEFAULT_GREEN_COLOR,
    borderWidth: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',

  },
  loginButtonText: {
    fontSize: 12,
    color: DEFAULT_GREEN_COLOR,
    alignSelf: 'center',
    fontFamily: 'System',
    fontWeight: 'bold'
  },
  registerButton: {
    height: 50,
    width: null,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: DEFAULT_GREEN_COLOR,
    borderColor: DEFAULT_GREEN_COLOR,
    borderWidth: 1,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  registerButtonText: {
    fontSize: 14,
    color: 'white',
    alignSelf: 'center',
    fontFamily: 'System',
    fontWeight: 'bold'
  }
,
linkStyle: {backgroundColor: 'rgba(0,0,0,0)',textAlign:'center',color: DEFAULT_GREEN_COLOR}
})

export default styles
