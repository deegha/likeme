import {StyleSheet} from 'react-native'
import * as shared from '../sharedStyles' 
import { Dimensions } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: shared.secondaryColor,
    padding: 20,
    marginBottom:3,
    
  },
  imageArea: {
    display:'flex',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 25,
    elevation: 5
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
    width: '100%',
    height: '100%',
  },
  userImageArea: {
    width: 40,
    height: 40,
    borderRadius:20,
    marginRight:6,
    elevation: 5,
    overflow:'hidden',
    zIndex:3
  },
  postContent: {
    flex: 6,
    alignItems: 'flex-start',
    paddingRight: 20
  },
  userName: {
   
    fontFamily: 'inter bold',
    color: shared.primary_text
  },
  postText: {
    fontFamily: 'saira bold',
    fontSize: 25,
    paddingLeft: 10,
    marginBottom: 8,
    color: shared.secondary_text,
  },
  actionArea: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  actionAreaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5
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
    alignItems: 'flex-start',
    marginBottom: 10
  },
  postLocationText: {
    fontFamily: 'inter thin',
    lineHeight: 20,
    color: shared.secondary_text,
    fontSize: 11,
    marginLeft: 5,
    
  },
  locationIcon: {
    paddingVertical: 5
  },
  postBox: {
    justifyContent: 'center',
    alignItems:'center',
    width: Dimensions.get('window').width-30,
    
    backgroundColor: '#3498db'
  },
  postBoxText: {
    fontSize: 20,
    fontFamily: 'saira light',
    color: '#ffffff',
    textAlign: 'center',
    width: '100%'
  },
  createdAt: {
    fontWeight: '100',
    color: shared.secondary_text,
    fontSize: 10,
    marginBottom: 5,
  },
  lightText: {
    marginRight: 5,
    color: '#535c68',
    fontWeight: '100',
  },
})