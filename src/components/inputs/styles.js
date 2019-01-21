import {StyleSheet} from 'react-native'
import * as shared from '../sharedStyles'

export const styles = StyleSheet.create({
    textInputError: {
      color: 'red',
      fontSize: 12,
      padding: 10,
      paddingLeft: 0,
      paddingTop: 0
    },
    inputText: {
      paddingBottom: 10,
    paddingTop: 0,
     flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 5,
    paddingLeft: 0,
      fontSize: 15,
    },
    roundBtn: {
      borderColor: shared.btnBorder,
      borderRadius: 30,
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    SeachIconContainer: {
      width: '100%',
      padding: 7,
      paddingTop: 0,
      alignItems: 'center',
      flexDirection: 'row'
    },
    locationPlaceholder: {
      fontWeight: '100',
      color: '#bdc3c7',
      fontSize: 12,
    },
    locatoionText: {
      color: '#000000',
      fontSize: 12
    },
    locationSeacrhContainer: {
      padding: 14,
      flex: 1,
      height: '100%'
    },
    modalHeader: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      width: '100%',
      height:55,
      backgroundColor:shared.floatingBtnColor,
      padding: 5
    }, goback: {
      color: shared.secondaryColor,
    },
    // locationContainer: {
    //   flexDirection: 'row',
    //   alignItems: 'center'
    // }
    textInputContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: shared.floatingBtnColor,
       borderBottomWidth: 1,
    },
    searchIcon: {
      padding: 5,
    },
  })