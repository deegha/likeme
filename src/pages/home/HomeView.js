import React from 'react'
import { View, ScrollView, Text,Animated, Image,  TouchableOpacity,FlatList,Easing, Dimensions  } from 'react-native'
import { styles } from './styles'
import { 
  FloatingBtn, 
  ModalComponent, 
  CreatepostContainer,
  ProfileFeed } from '../../components'
import {  Entypo, Ionicons } from '@expo/vector-icons'
import { Loading, APP_NAME } from '../../components'
import starter from '../../../assets/bg2.png'
import { XComponent, Section } from './components'
import { Font } from 'expo'

const { width, height } = Dimensions.get('window')

export class HomeView extends React.PureComponent {

  constructor(props) {
    super(props)

    this.scrollOffset=new Animated.Value(0)
    this.height= new Animated.Value(height)
    this.opacity= new Animated.Value(0)
    this.opacityName= new Animated.Value(0)
    this.imageHeight = new Animated.Value(height)

   
  }

  componentDidUpdate(prePros) {
    if(prePros.loading !== this.props.loading && this.props.loading === false) {
      this.animate()
    }
  }

  handleScroll = (e) =>  {
    const scrollSensitivity = 4 / 3
    const offset = e.nativeEvent.contentOffset.y / scrollSensitivity
    this.scrollOffset.setValue(offset)
  }

  animate =() => {
    Animated.parallel([
      Animated.timing(                  
        this.height,            
        {
          toValue: 0,    
          easing: Easing.in(),              
          duration: 700,              
        }
      ).start(),
      Animated.timing(                  
        this.opacity,            
        {
          toValue: 1,    
          easing: Easing.back(),              
          duration: 800,              
        }
      ).start(() => Animated.timing(                  
        this.opacityName,            
        {
          toValue: 1,    
          easing: Easing.back(),              
          duration: 800,              
        }
      ).start())
    ])
  }

  
  render() {
    const {
      auth:{authenticated,user:{type, displayName}},
      navigateTo,
      loading,
      navigateToProfile,
      feedsItems,
      fashion
    } = this.props
    const { opacity,height, opacityName,  } = this


    const elav = this.scrollOffset.interpolate({
      inputRange: [0, 50],
      outputRange: [0, 10],
      extrapolate: 'clamp',
    })

    const exStyles= {
      elevation: elav,
      // opacity: opacity
      // height:height
    }

    

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.initialTextContainer ,{width: width, height:height}]}>
          <Text style={styles.initialText}>PROMO APP</Text>
        </Animated.View>
        <Animated.View style={[styles.headerContainer, exStyles]}>
        <View style={styles.header}>
         
            <Animated.Text style={[styles.title, {opacity:opacity}]} >
              { APP_NAME }
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
          <XComponent navigateTo={navigateTo} />
          <Section feedsItems={feedsItems}  lable={"Latest deals"}/>
          
          {fashion.length > 1 && (
            <Section feedsItems={fashion}  lable={"Fashion"}/>
          )}
          
        </ScrollView>
      </View>
    )
  }
}
