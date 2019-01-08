import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start' 
  },
  image: {
    width: 100,
    borderRadius: 20,
    marginRight: 10
  },
  description: {
    color: '#353b48',
    fontSize: 15,
    fontWeight: 'bold'
  },
  timeLeft: {
    color: '#636e72',
    fontSize: 12,
    fontWeight: 'bold'
  }
})