import {StyleSheet} from 'react-native'
import {DEFAULT_BACKGROUND_COLOR, DEFAULT_GREEN_COLOR, DEFAULT_GREY_COLOR} from '@theme/colors'
import {FONT_DAYTONA_REG, FONT_DAYTONA_SEMIBOLD} from '@theme/fonts'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    width: null,
    height: null,
    // backgroundColor: '#927562'
  },
  listStyle: {
    flex: 1,
    marginTop: 16,
    marginBottom: 40,
    borderTopWidth: 1,
    borderTopColor: DEFAULT_GREY_COLOR,
    borderBottomWidth: 1,
    borderBottomColor: DEFAULT_GREY_COLOR
  },
  row: {
    borderBottomColor: DEFAULT_GREY_COLOR,
    borderBottomWidth: 1,
    alignItems: 'center',
    flexDirection: 'row'
  },
  image: {
    marginLeft: 15,
    marginRight: 15
  },
  rowTitle: {
    fontFamily: FONT_DAYTONA_SEMIBOLD,
    fontSize: 12,
    color: '#4B4B4C',
    marginTop: 18

  },
  rowAddress: {
    textAlign: 'left',
    marginBottom: 20,
    fontSize: 10,
    color: '#909092',
    marginTop: 3,
    fontFamily: 'System',
    lineHeight: 9
  },

  mapContainer: {
    position: 'absolute',
    top: 48,
    left: 0,
    right: 0,
    bottom: 50,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  searchContainer: {
    flex: 1,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: DEFAULT_GREEN_COLOR
  },
  input: {
    height: 30,
    flex: 1,
    paddingHorizontal: 8,
    fontSize: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 2
  }
})

export default styles
