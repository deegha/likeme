import React from 'react'
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'

export const SettingsView = ({logout}) => {

  return (
    <ScrollView style={styles.container}>
      <View style={styles.item}>
        <TouchableOpacity onPress={logout}>
        <Text style={styles.itemText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:20,
    backgroundColor: '#ffffff'
  },
  item: {
    padding:2
  },
  itemText: {
    color: '#000',
    fontSize: 32,
    fontWeight: 'bold'
  }
})
