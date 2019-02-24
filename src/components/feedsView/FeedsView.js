import React from 'react'

import { View, Text,Animated, TouchableOpacity,FlatList,Easing, Dimensions  } from 'react-native'
const { width, height } = Dimensions.get('window')
import { styles } from './styles'
import { 
  FloatingBtn, 
  ModalComponent, 
  CreatepostContainer, 
  FeedView  } from '../'
import {  Entypo, Ionicons } from '@expo/vector-icons'
import { Loading, APP_NAME } from '../../components'

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
  
    return (
      <View style={styles.container}>
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
        
              
        {/* {(type !== "consumer" &&  authenticated ) &&   (
          <FloatingBtn action={createPost}>
            <Entypo name={'plus'} size={30} color={"#ffffff"} />
          </FloatingBtn>  
        )}  
       
        <ModalComponent 
          visible={showModal} 
          setModalVisible={setModalVisible} >
          <CreatepostContainer 
            navigation={navigation} 
            setModalVisible={setModalVisibleAfterPost}  />
        </ModalComponent>    */}
      </View>
    )
  }
}
