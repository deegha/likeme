import { StyleSheet } from 'react-native'
import * as shared from '../sharedStyles'

export const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start' ,
    backgroundColor: '#ffff',
    margin: 1,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 20,
    marginRight: 10
  },
  description: {
    color: '#353b48',
    fontSize: 12,
    fontWeight: 'bold',
    width: 200
  },
  descriptionHorizotal: {
    color: '#353b48',
    fontSize: 12,
    fontWeight: 'bold',
    width: 300
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
    fontSize: 9,
    width: 250
  },
  removeBtn: {
    marginTop: 5,
  },
  removeBtnText: {
    color: shared.red
  },
  
})

export const hStyles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'flex-start',
    justifyContent: 'flex-start' ,
    backgroundColor: '#ffff',
    margin: 1,
    borderRadius: 5
  },
  containerHorizontal: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'flex-start' ,
    backgroundColor: '#ffff',
    margin: 1,
    borderRadius: 5,
  },
  image: {
    width: 300,
    height: 200,
    borderRadius: 20,
    marginRight: 10
  },
  postLocationText: {
    marginTop: 7,
    fontSize: 8,
    width: 300
  },
  description: {
    marginTop: 7,
    color: '#353b48',
    fontSize: 12,
    fontWeight: '600',
    width: 300
  }
})