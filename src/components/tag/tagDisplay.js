import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export const TagDisplay = ({title}) => {

  return (
    <View style={styles.tagView}>
      <Text style={styles.tag}>{title}</Text>
    </View>
  ) 
}

const styles = StyleSheet.create({
  tag: {
    fontSize: 10,
    color: '#ffffff',
    backgroundColor: '#fc5c65',
    borderRadius: 40,
    paddingVertical: 5,
    paddingHorizontal: 7,
    fontWeight: 'bold',
    marginRight: 5,
  },
  tagView: {
    justifyContent:'center',
    elevation: 5
  }
})