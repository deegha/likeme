import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export class Loading extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText} >Loading</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText: {
    fontSize: 20,
    fontWeight: 'bold'
  }
})