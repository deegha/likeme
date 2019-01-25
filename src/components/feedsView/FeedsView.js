import React from 'react'

import { View, Text,Animated, TouchableOpacity,FlatList } from 'react-native'
import { styles } from './styles'
import { 
  FloatingBtn, 
  ModalComponent, 
  CreatepostContainer, 
  FeedView  } from '../'
import {  Entypo } from '@expo/vector-icons'
import { Loading } from '../../components'

export class FeedsView extends React.PureComponent {

   
  render() {
    const {
      handleScroll,
      feedsItem,
      titleMarginTop,
      titleFontSize ,
      auth,
      navigateTol,
      logout,
      
      navigation,
      showModal,
      setModalVisibleAfterPost,
      setModalVisible,
      createPost,
      loading
    } = this.props
  
    return (
      <View style={styles.container}>
        <Animated.View style={[styles.header, { marginTop: titleMarginTop }]}>
          <Animated.Text style={[styles.title, {fontSize: titleFontSize}]} >
            Promo app
          </Animated.Text>
          <TouchableOpacity onPress={auth.authenticated?logout:navigateTol} >
            <Text style={[styles.rightBtn]}>{auth.authenticated?"Logout":"Login"}</Text>
          </TouchableOpacity>
        </Animated.View>
        {(loading && Object.keys(feedsItem) < 1)?(
          <Loading />
        ):(
         <FlatList
             scrollEventThrottle={16}
            initialNumToRender={5}
            data={Object.keys(feedsItem)}
            keyExtractor={(item) => item.toString()}
            renderItem={({item}) => {
              //feedsItem[item].postMedia.url !=="" &&
              return  (
                <FeedView 
                  makeAction={()=>()=>console.log("dsfsd")} 
                  key={feedsItem[item].id} 
                  feed={feedsItem[item]} />
              )
            }}
            
            onScroll={handleScroll}
            // onEndReachedThreshold={0.1}
            // onEndReached={loadMore}
            // ListFooterComponent={renderFooter} 
            />
          )}
        <FloatingBtn action={createPost}>
         <Entypo name={'plus'} size={30} color={"#ffffff"} />
        </FloatingBtn>
        
        <ModalComponent 
          visible={showModal} 
          setModalVisible={setModalVisible} >
          <CreatepostContainer 
            navigation={navigation} 
            setModalVisible={setModalVisibleAfterPost}  />
        </ModalComponent>   
      </View>
    )
  }
}
