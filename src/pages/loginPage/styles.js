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
    containerScroll: {
        display: 'flex',
        backgroundColor: shared.secondaryColor,
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
        fontWeight: '100',
        fontFamily: 'saira bold',
        letterSpacing: 1.2
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
        alignItems: 'center',
    },
    text : {
        color: shared.thirdColor,
        marginLeft: 9,
        marginRight: 9,
        fontFamily: 'saira thin'
    },
    btnContainer : {
        display: 'flex',
        width: '80%',
        justifyContent: 'center',
        height:50,
    },
    formError: {
        color: "#ED4C67",
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 10
    },
    loginTitileContainer: {
        display:'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center'
    }    
  })