import React from 'react'
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import {  Ionicons, Entypo, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'

export const SettingsView = ({logout, navigateTo}) => {

  return (
    <ScrollView style={styles.container}>
      
      <TouchableOpacity onPress={navigateTo('changeProPic')}  style={styles.item}>
        <Ionicons name="ios-person" size={20} color="#00bcd4" style={{width:30, alignItems:'center'}} />
        <Text style={styles.itemText}>Change profile picture</Text>
      </TouchableOpacity>
    
      <TouchableOpacity  style={styles.item}>
        <MaterialCommunityIcons name="textbox-password" size={20} color="#00bcd4" style={{width:30, alignItems:'center'}} />
        <Text style={styles.itemText}>Chage password</Text>
      </TouchableOpacity>
    
      <TouchableOpacity  onPress={logout}  style={styles.item}>
        <Entypo name="log-out" size={20} color="#00bcd4"style={{width:30, alignItems:'center'}}  />
        <Text style={styles.itemText}>Logout</Text>
      </TouchableOpacity>
    
      <TouchableOpacity  style={styles.item} onPress={navigateTo('privacypolicy')} >
        <MaterialCommunityIcons name="file-document" size={20} color="#00bcd4" style={{width:30, alignItems:'center'}} />
        <Text style={styles.itemText}>Privacy Policy</Text>
      </TouchableOpacity>
    
      <TouchableOpacity  style={styles.item}>
        <MaterialIcons name="delete" size={20} color="#00bcd4" style={{width:30, alignItems:'center'}} />
        <Text style={styles.itemText}>Delete account</Text>
      </TouchableOpacity>
    
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
    padding:2,
    marginVertical: 15,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  itemText: {
    color: '#000',
    fontSize: 18,
    fontFamily: 'inter bold',
    marginLeft: 5,
    letterSpacing: 1.1
  }
})
