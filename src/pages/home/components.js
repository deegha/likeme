import React from 'react'
import { View, Text, TouchableOpacity, Dimensions } from 'react-native'

import Carousel, { Pagination } from 'react-native-snap-carousel'
import { styles } from './styles'

import { SliderItem } from '../../components'
import {  Entypo, Ionicons, MaterialCommunityIcons, MaterialIcons, FontAwesome } from '@expo/vector-icons'


const { width } = Dimensions.get('window')

const IconContainer = ({children, lable, callBack, callBackProp, extraProps}) => {
  let props = {}
  if(extraProps)
    props=extraProps
    
  let page = 'allFeeds'
  if(callBackProp) {
    page=callBackProp
  }
    
  return (
    <TouchableOpacity style={styles.iconContainer} onPress={callBack(page, props)}>
      {children}
      <Text style={styles.iconlable}>{lable}</Text>
    </TouchableOpacity>
  )
}


export class XComponent extends React.PureComponent {

  render() {
    const { navigateTo } = this.props 
    return (
      <View style={styles.xComponentContainer}>
        <View style={styles.xComponentTop} /> 
        <View style={styles.xComponenBottom}>
          <View style={styles.xComponenBottomRow}>

            <IconContainer lable={'Hot'} callBack={navigateTo}  extraProps={"all"}>
              <MaterialCommunityIcons 
                name={'fire'} size={22} color={"#fc5c65"} />
            </IconContainer>
            <IconContainer lable={'On your location'} callBack={navigateTo} callBackProp={'LocationFeeds'}>
              <Entypo name={'location'} size={22} color={"#00bcd4"} />
            </IconContainer>
            <IconContainer lable={'Cards'} callBack={navigateTo}  extraProps={ "cards"}>
              <FontAwesome name={'credit-card'} size={22} color={"#30336b"} />
            </IconContainer>
            <IconContainer lable={'Online'} callBack={navigateTo}  extraProps={ "online"}>
              <MaterialIcons name={'computer'} size={22} color={"#a55eea"} />
            </IconContainer>
          </View>
          <View style={styles.xComponenBottomRow}>
            <IconContainer lable={'Fashion'} callBack={navigateTo}  extraProps={"fashion"}>
              <MaterialCommunityIcons name={'hanger'} size={22} color={"#ff4757"} />
            </IconContainer>
            <IconContainer lable={'Travel'} callBack={navigateTo} extraProps={"travel"}>
              <MaterialCommunityIcons name={'airplane'} size={22} color={"#4b7bec"} />
            </IconContainer>
            <IconContainer lable={'Rides'} callBack={navigateTo}  extraProps={"rides"}>
              <FontAwesome name={'taxi'} size={22} color={"#fed330"} />
            </IconContainer>
            <IconContainer lable={'Happy Hours'} callBack={navigateTo} extraProps={"drinks"}>
              <Ionicons name={'md-wine'} size={22} color={"#B53471"} />
            </IconContainer>
          </View>
        </View>     
      </View> 
    )
  }
}

// export const XComponent = ({navigateTo}) => {

  
// }

export const Listheader = ({children}) => {
  return (
    <View style={styles.listheaderContainer}>
      <Text style={styles.listheadertext}>{children}</Text>
    </View>
  )
}

export class Section extends React.PureComponent  {

  state = {
    activeSlide: 0,
  }

  get pagination () {
    const { activeSlide } = this.state
    return (
        <Pagination
          dotsLength={this.props.feedsItems.length}
          activeDotIndex={activeSlide}
          containerStyle={{ backgroundColor: 'transparent', marginVertical: -20 }}
          dotStyle={{
            width: 5,
            height: 5,
            borderRadius: 2.5,
            marginHorizontal:   8,
            backgroundColor: '#000'
          }}
          inactiveDotStyle={{
              // Define styles for inactive dots here
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
    )
  }

  render() {
    const {feedsItems, lable} = this.props
    return (
      <View style={styles.sectionContainer}>
        <Listheader>{lable}</Listheader>
        <Carousel
          ref={(c) => { this._carousel = c; }}
          data={feedsItems}
          renderItem={({item}) =>  <SliderItem feed={item} />}
          sliderWidth={width+45}
          itemWidth={width}
          onSnapToItem={(index) => this.setState({ activeSlide: index }) }

          />
          { this.pagination }
      </View>
    )
  }
}


