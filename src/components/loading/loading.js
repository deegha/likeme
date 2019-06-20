import React from 'react'
import { View, Text, StyleSheet,Dimensions, Image } from 'react-native'

const { width, height } = Dimensions.get('window')
export class Loading extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText} >Hi there, hold on a bit :)</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',

  },
  loadingText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff'
  }
})