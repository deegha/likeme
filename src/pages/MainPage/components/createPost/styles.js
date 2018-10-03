import {StyleSheet} from 'react-native'
import * as shared from '../../../../components/sharedStyles' 

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: shared.secondaryColor,
        padding: 10
    },
    postData: {
        display: 'flex',
        flex: 2,
        margin:0,
        padding:0,
        width: '100%',
        alignItems:'center'
    },
    postOptions: {
        display: 'flex',
        flex: 1,
    },
    inputFeild: {
        fontSize: 50
    },
    postOptionBtn:{
        display:'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    postImage: {
        width: '100%'
    }
})