import {StyleSheet} from 'react-native'
import * as shared from '../../components/sharedStyles' 

export const regStyles = StyleSheet.create({
  addImageContainer: {
    // width: 90,
    // height: 90,
    backgroundColor: shared.silver,
    borderRadius: 20,
    // marginTop: 30,
    // marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  addImageText: {
    color: shared.primaryColor,
    fontWeight: 'bold'
  },
  proPic: {
    width: 90,
    height: 90,
    borderRadius: 20,
  }
})