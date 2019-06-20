import React from 'react'

import { View, Text,Animated, TouchableOpacity,FlatList,Easing, Dimensions, Image  } from 'react-native'
const { width, height } = Dimensions.get('window')
import { styles } from './styles'
import { 
  FloatingBtn, 
  ModalComponent, 
  CreatepostContainer, 
  FeedView  } from '../'
import {  Entypo, Ionicons } from '@expo/vector-icons'
import { Loading, APP_NAME } from '../../components'
import loadingImg from '../../../assets/downloading.png'
import { Font } from 'expo'
export class FeedsView extends React.PureComponent {


  render() {
    const {
      feedsItem,
      auth:{authenticated,user:{type, displayName}},
      
      navigation,
      showModal,
      setModalVisibleAfterPost,
      setModalVisible,
      createPost,
      loading,
      navigateToProfile
    } = this.props
    console.log(loading, "loading on feeds vieww")
    return (
      <View style={styles.container}>
      <Image source={{loadingImg}} width={200} height={200} />
        <View style={[styles.headerContainer]}>
        <View style={styles.header}>
          <View style={styles.headerleft}>
            <TouchableOpacity onPress={this.props.goback}>
              <Ionicons name={'md-arrow-back'} size={20} color={"#ffffff"} />
            </TouchableOpacity>
            <Text style={[styles.title]} >
              {this.props.title}
            </Text>
          </View>
          <TouchableOpacity onPress={navigateToProfile} >
            <View style={[styles.profileArea]}>
              {authenticated && (
                <Text style={[styles.profileName]}>
                  {displayName}
                </Text>
              )}
              
              <Ionicons name={'ios-person'} size={30} color={"#ffffff"} />
            </View>
          </TouchableOpacity>
        </View>
        </View>


        {feedsItem.length < 1 && !loading ? (
        <View style={[styles.container, {
          justifyContent: 'center',
          alignItems: 'center'
        }]}>
          {(this.props.title === 'On your location') ? (
            <Text style={styles.infoMessage}>Sorry! no promotions or deals found on your location </Text>
          ):(
            <Text style={styles.infoMessage}>Sorry! no promotions or deals found under this category </Text>
          )}        
          
        </View>
        ): (
          <FlatList
          scrollEventThrottle={16}
          initialNumToRender={5}
          data={Object.keys(feedsItem)}
          keyExtractor={(item) => item.toString()}
          renderItem={({item}) => {
            return  (
              <FeedView 
                key={feedsItem[item].id} 
                feed={feedsItem[item]} />
            )
          }}
          />
        )}
        
      </View>
    )
  }
}
