/**
 * Created by deegha on 6/10/2018
 */

import React from 'react'
import { View, Text, Button, ScrollView, RefreshControl  } from 'react-native'

import { FeedView } from '../../components'
import { styles } from './styles'
import { FloatingBtn } from '../../components/'
import { Ionicons } from '@expo/vector-icons'
import { CREATE_POST } from '../../components/feed/actionsConstants'

export const MainView = ({setModalVisible, navigation, feedsItem, loading, fetchFeeds,makeAction, createPost, creating}) => {

  return (
    <View style={{flex:1}}>
      <FloatingBtn action={createPost} >
        <Ionicons name="md-add" size={40} color="#fff" />
      </FloatingBtn>
      <ScrollView 
        
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={fetchFeeds}
          />
        }
        contentContainerStyle={{flexGrow : 1, alignItems : 'center'}}>
        <View style={{height:60}} ></View>
        {creating && 
        <View style={{height:30}}>
          <Text>Creating</Text>
        </View>}
        {feedsItem && Object.keys(feedsItem).map( 
          feed => feedsItem[feed].id && <FeedView makeAction={makeAction} key={feedsItem[feed].id} feed={feedsItem[feed]} /> )}
        
      </ScrollView>
      
    </View>
  )
}