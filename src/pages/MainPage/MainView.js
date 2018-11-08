/**
 * Created by deegha on 6/10/2018
 */

import React from 'react'
import { View, Text, Button, ScrollView, RefreshControl, TouchableOpacity  } from 'react-native'

import { FeedView } from '../../components'
import { styles } from './styles'
import { FloatingBtn } from '../../components/'
import { Ionicons } from '@expo/vector-icons'
import { CREATE_POST } from '../../components/feed/actionsConstants'

export const MainView = ({auth, feedsItem, loading, fetchFeeds,makeAction, createPost, creating, logOut, navigateLogin}) => {

  return (
    <View style={{flex:1}}>
      {auth.authenticated && auth.user.type === "store" && <FloatingBtn action={createPost} >
        <Ionicons name="md-add" size={40} color="#fff" />
      </FloatingBtn>}
     
      {creating && 
      <View style={styles.creatingContainer}>
        <View style={styles.creating}>
          <Text style={styles.creatingText}>Creating post...</Text>
        </View>
      </View>}
      <ScrollView 
        
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={fetchFeeds}
          />
        }
        contentContainerStyle={{flexGrow : 1, alignItems : 'center'}}>
        <View style={styles.header}>
          <Text style={styles.title}>Black App</Text>
          <TouchableOpacity onPress={auth.authenticated?logOut:navigateLogin}>
            <Text>{auth.authenticated?"Logout":"Login"}</Text>
          </TouchableOpacity>
        </View>
        <View style={{height:60}} ></View>
     
        {feedsItem && Object.keys(feedsItem).map( 
          feed => feedsItem[feed].id && <FeedView makeAction={makeAction} key={feedsItem[feed].id} feed={feedsItem[feed]} /> )}
        
      </ScrollView>
      
    </View>
  )
}