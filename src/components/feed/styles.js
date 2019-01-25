import {StyleSheet} from 'react-native'
import * as shared from '../sharedStyles' 
import { Dimensions } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: shared.secondaryColor,
    padding: 20,
    marginBottom:3
  },
  imageArea: {
    display:'flex',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 25,
  },
  contentArea: {
    display:'flex',
    flexDirection: 'row',
    justifyContent:'flex-start',
    alignItems: 'flex-start',
    
    padding:10
  },
  userImageContainer: {
    flex: 1,
    justifyContent:'flex-start'
  },
  userImage: {
    width: 60,
    height: 60,
    borderRadius:30,
    marginRight:6
  },
  postContent: {
    flex: 6,
    alignItems: 'flex-start',
    paddingRight: 20
  },
  userName: {
   
    fontWeight: 'bold',
    color: shared.primary_text
  },
  postText: {
    fontWeight: '100',
    color: shared.secondary_text,
  },
  actionArea: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  statText: {
    fontSize: 11,
    textAlign: 'center',
    color: "#95a5a6"
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5,
    // width: 60
  },
  postLocation: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  postLocationText: {
    fontWeight: '100',
    color: shared.secondary_text,
    fontSize: 11,
    marginLeft: 5,
    
  },
  postBox: {
    justifyContent: 'center',
    alignItems:'center',
    width: Dimensions.get('window').width-30,
    
    backgroundColor: '#3498db'
  },
  postBoxText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    width: '100%'
  },
  createdAt: {
    fontWeight: '100',
    color: shared.secondary_text,
    fontSize: 10,
    marginBottom: 5,
  }
})