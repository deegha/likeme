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
import { Loading } from '../../components'

export class FeedsView extends React.PureComponent {

  constructor(props) {
    super(props)
    this.state={
      height: new Animated.Value(height),
      opacity: new Animated.Value(0),
      opacityName: new Animated.Value(0)
    }
  }

  componentDidUpdate(prePros) {

    console.log(Object.keys(this.props.feedsItem)< 1, "dagrsf")

    if(prePros.loading !== this.props.loading && this.props.loading === false) {
      this.animate()
    }

  }

  animate =() => {
    Animated.parallel([
      Animated.timing(                  
        this.state.height,            
        {
          toValue: 80,    
          easing: Easing.back(),              
          duration: 700,              
        }
      ).start(),
      Animated.timing(                  
        this.state.opacity,            
        {
          toValue: 1,    
          easing: Easing.back(),              
          duration: 1000,              
        }
      ).start(() => Animated.timing(                  
        this.state.opacityName,            
        {
          toValue: 1,    
          easing: Easing.back(),              
          duration: 400,              
        }
      ).start())
    ])
   
  }
   
  render() {
    const {
      handleScroll,
      feedsItem,
      titleMarginTop,
      titleFontSize ,
      auth:{authenticated,user:{type, displayName}},
      navigateTol,
      logout,
      
      navigation,
      showModal,
      setModalVisibleAfterPost,
      setModalVisible,
      createPost,
      loading,
      navigateToProfile
    } = this.props

    const { opacity,height, opacityName } = this.state
  
    return (
      <View style={styles.container}>
        <Animated.View style={[styles.headerContainer, {height:height}]}>
        {(loading)&&(
          <Loading />
        )}
        <View style={styles.header}>
          <Animated.Text style={[styles.title, {opacity:opacity}]} >
            Promo app
          </Animated.Text>
          <TouchableOpacity onPress={navigateToProfile} >
            <Animated.View style={[{opacity:opacity},styles.profileArea]}>
              {authenticated && (
                <Animated.Text style={[styles.profileName,{opacity:opacityName}]}>{displayName}
                </Animated.Text>
              )}
              
              <Ionicons name={'ios-person'} size={30} color={"#ffffff"} />
            </Animated.View>
          </TouchableOpacity>
        </View>
         
        </Animated.View>
        {(loading && Object.keys(feedsItem) < 1)?(
          <Loading />
        )
        :(
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
              
        {(type !== "consumer" &&  authenticated ) &&   (
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
        </ModalComponent>   
      </View>
    )
  }
}
