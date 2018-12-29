import {StyleSheet} from 'react-native'
import * as shared from '../../../../components/sharedStyles' 

export const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 10,
    backgroundColor: shared.floatingBtnColor,
  },
  bottomNavIcon: {
    padding: 5,
    alignItems: 'center',
  },
  bottomNavIconText: {
    color: shared.secondaryColor,

  }
})