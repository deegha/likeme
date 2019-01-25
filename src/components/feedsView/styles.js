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
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: shared.backGround,
    // backgroundColor: 'red',
    zIndex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  creatingContainer: {
    marginTop: 22,
    width: '100%',
    zIndex:4
  },
  creating: {
    width: '96%',
    alignItems: 'center',
    margin: 10,
    borderRadius: 20,
    padding: 10,
    backgroundColor: '#ffffff'
  },
  creatingText: {
    fontSize: 18,
    fontWeight: '100'
  },
  rightBtn: {
    fontWeight: '600'
  },
  scrollView: {
    backgroundColor: '#000',
    flex:1,
  }
})