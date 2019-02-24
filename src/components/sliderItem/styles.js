import { StyleSheet, Dimensions } from 'react-native'
import * as shared from '../sharedStyles'

const { width, height } = Dimensions.get('window')

export const styles = StyleSheet.create({
  
  postLocation: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10
  },
  
  container: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start' ,
    backgroundColor: '#ffff',
    borderRadius: 5
  },
  containerHorizontal: {
    paddingVertical: 20,
    alignItems: 'flex-start',
    justifyContent: 'flex-start' ,
    backgroundColor: '#ffff',
    borderRadius: 5,
    padding: 15
  },
  image: {
    width: width-90,
    height: width-200,
    borderRadius: 10,
    elevation: 5
  },
  postLocationText: {
    fontSize: 10,
    width: width-110,
    marginLeft: 10
  },
  description: {
    marginTop: 7,
    color: '#353b48',
    fontSize: 14,
    fontWeight: '600',
    width: width-100,
  },
  descriptionBox: {
    paddingVertical: 10,
    paddingHorizontal: 5
  },
  profileimage: {
    width: 40,
    height : 40,
    borderRadius: 20,
    marginRight: 10
  },
  profileimageContainer: {
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  profileName: {
    color: '#2d3436',
    fontWeight: '600',
  },
  actionArea: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 5,
    marginTop: 10
    // width: 60
  }
})