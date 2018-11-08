import {StyleSheet} from 'react-native'
import * as shared from '../../components/sharedStyles' 

export const styles = StyleSheet.create({
    container: {
        display: 'flex',
        backgroundColor: shared.secondaryColor,
        alignItems: 'center',
        height:'100%',
        width: '100%',
        padding: 5
    },
    innerContainer: {
        display: 'flex',
        width: '80%',

    },
    loginTitile: {
        color: shared.secondary_text,
        marginBottom:50,
        marginTop: 50,
        fontSize: 34,
        fontWeight: '100'
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
        height:60,
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