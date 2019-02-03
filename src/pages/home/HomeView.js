import React from 'react'

import { View, ScrollView, Text,Animated, TouchableOpacity,FlatList,Easing, Dimensions  } from 'react-native'
const { width, height } = Dimensions.get('window')
import { styles } from './styles'
import { 
  FloatingBtn, 
  ModalComponent, 
  CreatepostContainer,
  ProfileFeed } from '../../components'
import {  Entypo, Ionicons } from '@expo/vector-icons'
import { Loading } from '../../components'

import { XComponent, Sections, Listheader } from './components'

export class HomeView extends React.PureComponent {

  constructor(props) {
    super(props)
    this.state={
      scrollOffset:new Animated.Value(0),
      height: new Animated.Value(height),
      opacity: new Animated.Value(0),
      opacityName: new Animated.Value(0)
    }
  }

  componentDidUpdate(prePros) {
    console.log(this.props.loading,"loading")
    if(prePros.loading !== this.props.loading && this.props.loading === false) {
      console.log("in")
      this.animate()
    }
  }

  handleScroll = (e) =>  {
    const scrollSensitivity = 4 / 3
    const offset = e.nativeEvent.contentOffset.y / scrollSensitivity
    this.state.scrollOffset.setValue(offset)
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
      auth:{authenticated,user:{type, displayName}},
      
      navigation,
      showModal,
      setModalVisibleAfterPost,
      setModalVisible,
      createPost,
      loading,
      navigateToProfile,
      feedsItems
    } = this.props

    const { opacity,height, opacityName, scrollOffset } = this.state

    const elav = scrollOffset.interpolate({
      inputRange: [0, 50],
      outputRange: [0, 10],
      extrapolate: 'clamp',
    })

    const exStyles= {
      elevation: elav,
      height:height
    }
  
    return (
      <View style={styles.container}>
        <Animated.View style={[styles.headerContainer, exStyles]}>
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
        <ScrollView onScroll={this.handleScroll} >      
          <XComponent />
          <Sections>
          <Listheader>Hot deals</Listheader>
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              scrollEventThrottle={16}
              data={feedsItems}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({item}) =>  <ProfileFeed horizontal={true} feed={item} />}
              initialNumToRender={4}
              // ListHeaderComponent={() => <Listheader>Hot deals</Listheader>}
              />
          </Sections>
        </ScrollView>

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
