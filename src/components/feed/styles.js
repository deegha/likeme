import {StyleSheet} from 'react-native'
import * as shared from '../sharedStyles' 

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
    width: 40,
    height: 40,
    borderRadius:20,
    marginTop:4
  },
  postContent: {
    flex: 6,
    alignItems: 'flex-start',
    paddingRight: 20
  },
  userName: {
    marginBottom: 5,
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
    margin: 5,
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
    
  }
})