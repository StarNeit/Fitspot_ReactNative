
import {StyleSheet} from 'react-native'
import {DEFAULT_BACKGROUND_COLOR, DEFAULT_GREEN_COLOR, DEFAULT_HYPERLINK_COLOR} from '@theme/colors'
import { FONT_DAYTONA_LIGHT, FONT_DAYTONA_BOLD, FONT_DAYTONA_FAT,FONT_DAYTONA_REG } from '@theme/fonts'

const styles = StyleSheet.create({
  modalTitle:{
    fontFamily: FONT_DAYTONA_REG,
    fontSize: 14,
    marginTop: 10,
  },
  modalContent:{
    textAlign: 'center',
    fontSize: 10,
    marginTop: 10,
  },
  modalContentGreen:{
    color: DEFAULT_GREEN_COLOR,
    fontWeight: 'bold'
  },
  modalButton: {
    height: 30,
    backgroundColor: DEFAULT_GREEN_COLOR,
    borderColor: DEFAULT_GREEN_COLOR,
    borderWidth: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    marginTop: 10,

  },
  modalButtonText: {
    fontSize: 12,
    color: 'white',
    alignSelf: 'center',
    fontFamily: 'System',
    fontWeight: 'bold'
  },
  hr: {
    marginTop: 10,
  },
  hyperlink: {
    color: DEFAULT_HYPERLINK_COLOR,
    fontWeight: 'bold'
  }
})

export default styles
