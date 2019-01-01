import {StyleSheet} from 'react-native'
import * as shared from '../../components/sharedStyles' 

export const styles = StyleSheet.create({
  container: {
    paddingTop: 22,
    backgroundColor: shared.backGround,
    height: '100%',
    flex: 1
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    alignItems: 'center',
    backgroundColor: shared.secondaryColor,
  },
  informationArea: {
    alignItems: 'flex-start'
  },
  displayName: {
    fontWeight: 'bold',
    fontSize: 40,
  },
  profileDetails: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  follow: {
    fontSize: 13,

  },
  displayImage: {
    height: 70,
    width: 70,
    borderRadius: 35
  }
})