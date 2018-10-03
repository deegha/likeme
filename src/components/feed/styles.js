import {StyleSheet} from 'react-native'
import * as shared from '../sharedStyles' 

export const styles = StyleSheet.create({
  container: {
    marginTop: 22,
    borderRadius: 10 
  },
  imageArea: {
    display:'flex',
    flex:3
  },
  contentArea: {
    display:'flex',
    justifyContent:'center',
    alignItems: 'center',

  },
  image: {
    flex:1,
    height: undefined, 
    width: undefined
   }
})