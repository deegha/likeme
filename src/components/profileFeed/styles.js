import { StyleSheet } from 'react-native'
import * as shared from '../sharedStyles'

export const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start' ,
    backgroundColor: '#ffff',
    margin: 1
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 20,
    marginRight: 10
  },
  description: {
    color: '#353b48',
    fontSize: 15,
    fontWeight: 'bold',
    width: 200
  },
  timeLeft: {
    color: '#636e72',
    fontSize: 12,
    fontWeight: 'bold'
  },
  postLocation: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  postLocationText: {
    fontSize: 12,
    width: 250
  },
  removeBtn: {
    marginTop: 5,
  },
  removeBtnText: {
    color: shared.red
  }
})