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
        margin:0,
        padding:0,
        width: '100%',
        alignItems:'center',
        flex: 1
    },
 
    inputFeild: {
			fontSize: 20,
			padding: 5,
			marginBottom: 10
    },
    postOptions:{
			display:'flex',
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			borderBottomWidth:0.5,
			borderBottomColor: '#d6d7da',    
        marginBottom: 20
    },
    postImage: {
			width: '100%'
    },
    option: {
			margin: 10
    },
    optionText: {
			fontSize: 15,
			fontWeight: '600'
    },
    optionTextDisabled: {
		fontSize: 15,
		fontWeight: '600',
		color: shared.disabledText
    },
    form: {
			padding: 5,
			flex:2
    },
    postOptionsSection: {
			flexDirection: 'row',
			justifyContent: 'center'
    },
    tagContainer: {
			flexDirection: 'row',
			justifyContent: 'flex-start',
			alignItems: 'center',
			marginBottom: 10
    },
    tag: {
			fontSize: 10,
			color: '#ffffff',
			backgroundColor: '#fc5c65',
			borderRadius: 40,
			padding: 10,
			fontWeight: 'bold',
			marginRight: 5
		},
		selected: {
			fontSize: 11,
			color: '#ffffff',
			backgroundColor: '#eb3b5a',
			borderRadius: 40,
			padding: 10,
			fontWeight: 'bold',
			marginRight: 5	
		}
})