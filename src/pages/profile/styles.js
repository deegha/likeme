import {StyleSheet} from 'react-native'
import * as shared from '../../components/sharedStyles' 

export const styles = StyleSheet.create({
  container: {
    backgroundColor: shared.backGround,
    height: '100%',
    flex: 1
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
    fontWeight: 'bold',
    fontSize: 40,
    color: '#353b48'
  },
  profileDetails: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
   
  },
  detail: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#636e72'
  },
  displayImage: {
    height: 70,
    width: 70,
    borderRadius: 35
  }
})