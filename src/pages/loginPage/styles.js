import {StyleSheet} from 'react-native'
import * as shared from '../../components/sharedStyles' 

export const styles = StyleSheet.create({
    container: {
        display: 'flex',

        alignItems: 'center',
        height:'100%',
        width: '100%',
        padding: 5
    },
    innerContainer: {
        display: 'flex',
        width: '80%',
        justifyContent: 'center',
        height:90,
    },
    loginTitile: {
        color: shared.primaryColor,
        marginBottom:20,
        marginTop: 50,
        fontSize: 20
    },
    devider: {
        borderTopWidth: 1,
        borderColor: shared.thirdColor,
        width: '40%',
        opacity: 0.2
    },
    deviderContainer:{
        display: 'flex',
        flexDirection: 'row',
        width: '50%',
        justifyContent: 'center',
        height:90,
        alignItems: 'center',
    },
    text : {
        color: shared.thirdColor,
        marginLeft: 9,
        marginRight: 9
    },
    btnContainer : {
        display: 'flex',
        width: '80%',
        justifyContent: 'center',
        height:50,
    },
    formError: {
        color: shared.thirdColor
    },
    loginTitileContainer: {
        display:'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center'
    }
  })