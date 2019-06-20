import {StyleSheet} from 'react-native'
import * as shared from '../../components/sharedStyles' 

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    height: '100%',
    flex: 1,
    
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 25,
    paddingTop: 82,
    paddingBottom: 62,
    alignItems: 'center',
    backgroundColor: shared.secondaryColor,
  },
  informationArea: {
    alignItems: 'flex-start'
  },
  displayName: {
    fontFamily: 'saira bold',
    fontSize: 40,
    color: '#353b48'
  },
  profileDetails: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  detail: {
    fontSize: 13,
    fontFamily: 'inter bold', 
    color: '#636e72',
  },
  displayImageContainer: {
    height: 70,
    width: 70,
    borderRadius: 35,
    elevation: 5,
    overflow: 'hidden'
  },
  displayImage: {
    height: '100%',
    width: '100%'
  },
  listheaderContainer: {
    padding: 25,
    
  },
  listheadertext: {
    fontFamily: 'inter regular',
    color: '#353b48'
  },
  body: {
    paddingBottom: 100
  },
  noContentText: {
    color: '#bdc3c7',
    fontSize: 10,
    fontWeight: 'bold'
  },
  noContentContaier: {
    padding: 25,
  }
})