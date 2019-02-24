import React from 'react'
import { Image, 
        View, 
        ScrollView,
        TouchableOpacity, 
        Animated, 
        Text, 
        FlatList,
        SafeAreaView } from 'react-native'

import { styles } from './styles'
import { ProfileFeed, ModalComponent, CreatepostContainer,FloatingBtn } from '../../components'
import {  Entypo } from '@expo/vector-icons'

export class ProfileView extends React.PureComponent {

  constructor(props)  {
    super(props)
    this.scrollOffset = new Animated.Value(0)

    this.state = {
      showModal: false
    }
  }

  setModalVisible = (visible) => () => { 
    this.setState({showModal: visible})
  }

  openModal = () => this.setState({showModal: true})

  setModalVisibleAfterPost = () => this.setState({showModal: false})

  handleScroll = (e) =>  {
    const scrollSensitivity = 4 / 3;
    const offset = e.nativeEvent.contentOffset.y / scrollSensitivity;
    this.scrollOffset.setValue(offset);
  }

  navigateToSettings = () => this.props.navigation.navigate('settings')

  render() {
    const { showModal } = this.state
    const scrollOffset  = this.scrollOffset

    const headerPaddingTop = scrollOffset.interpolate({
      inputRange: [0, 200],
      outputRange: [82, 35],
      extrapolate: 'clamp',
    })

    const headerPaddingBottom = scrollOffset.interpolate({
      inputRange: [0, 200],
      outputRange: [62, 15],
      extrapolate: 'clamp',
    })

    const titleFontSize = scrollOffset.interpolate({
      inputRange: [0, 200],
      outputRange: [40, 20],
      extrapolate: 'clamp',
    })

    const imageWidth = scrollOffset.interpolate({
      inputRange: [0, 200],
      outputRange: [70, 40],
      extrapolate: 'clamp',
    })

    const {
      user,
      userFeeds,
      likedFeeds,
      authenticated,
      navigation
    } = this.props

    return (

      <View style={styles.container}>
        <Animated.View style={[styles.header, {
          paddingTop: headerPaddingTop,
          paddingBottom: headerPaddingBottom
        }]}>
          <View style={styles.informationArea}>
            <Animated.Text style={[styles.displayName, {
              fontSize: titleFontSize
            }]}>{user.displayName}</Animated.Text>
            <View  style={styles.profileDetails}>
              {/* <Text style={styles.detail}>10 Followers</Text>
              <View style={{width: 10}} />
              <Text style={styles.detail}>20 Following</Text> */}
              <View style={{width: 10}} />
              <Text style={styles.detail}>{userFeeds.length} Promotions</Text>
            </View>
          </View>
          <TouchableOpacity onPress={this.navigateToSettings}>
            <Animated.Image style={[styles.displayImage,{
                height: imageWidth,
                width: imageWidth,
            }]} source={{uri: user.image}} /> 
          </TouchableOpacity>

          </Animated.View>
       
        <View  style={styles.body}>
        <ScrollView style={styles.scrollView} onScroll={this.handleScroll}>
          { likedFeeds.likedFeeds.length > 0? 
          <Listheader>Liked by you  </Listheader>:
          <NoContent>Go and like some promotions :) </NoContent>}
          { likedFeeds.likedFeeds.length > 0 &&
           <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            data={likedFeeds.likedFeeds}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) =>  <ProfileFeed horizontal={true} feed={item} />}
            initialNumToRender={4}
            // ListHeaderComponent={() => <Listheader>Liked by you</Listheader>}
            />}

          
          { userFeeds.length > 0 ?(
            <FlatList
            scrollEventThrottle={16}
            data={userFeeds}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) =>  <ProfileFeed  feed={item} />}
            ListHeaderComponent={() => <Listheader>Added by you  </Listheader>}
            stickyHeaderIndices={[0]}
            initialNumToRender={4}
            />
          ):(
              <NoContent> 
                {user.type==='consumer'?"Upgrade to a store to add promotions": "Add    promitions and they will appear here"}
              </NoContent>
            ) 
            }
 
         
          </ScrollView>
        </View>
        {(user.type !== "consumer" &&  authenticated ) &&   (
          <FloatingBtn action={this.openModal}>
            <Entypo name={'plus'} size={30} color={"#ffffff"} />
          </FloatingBtn>  
        )}  
        <ModalComponent 
          visible={showModal} 
          setModalVisible={this.setModalVisible} >
          <CreatepostContainer 
            navigation={navigation} 
            setModalVisible={this.setModalVisibleAfterPost}  />
        </ModalComponent>   
      </View>

    )
  }
}




const Listheader = ({children}) => {
  return (
    <View style={styles.listheaderContainer}>
      <Text style={styles.listheadertext}>{children}</Text>
    </View>
  )
}

const NoContent= ({children}) => (
  <View style={styles.noContentContaier}>
    <Text style={styles.noContentText}>{children}</Text>
  </View>
)