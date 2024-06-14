//HomeScreen

//General Imports
import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

//Screens
import FeedScreen from './Main/FeedScreen'
import ProfileScreen from './Main/Profile'
import AddScreen from './Main/Add'




//Redux
import  {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import {fetchUser} from '../redux/actions/index'
import { style } from 'deprecated-react-native-prop-types/DeprecatedViewPropTypes'



const Tab = createMaterialBottomTabNavigator();

const globalTabScreenOptions={
  backgroundColor:"#fff",

}

const EmptyScreen = () =>{
  return(null)
}

export class HomeScreen extends Component {
  componentDidMount(){
    this.props.fetchUser();
  }
  render() {
    return (
      <Tab.Navigator initialRouteName='Feed' 
      labeled= {false} 
      activeColor='#3282B8'
      activeTintColor= '#3282B8'
      inactiveColor='#1B262C'
      shifting = {true}
      barStyle = {{backgroundColor : '#fff'}}
      >
        <Tab.Screen name ='Feed' component={FeedScreen} options={{
        
          //headerShown: false,
          tabBarIcon:(({color, size}) => (
            <MaterialCommunityIcons name = 'home' color={color} size = {26}/>
          )),
        }} />
           <Tab.Screen name ='AddContainer' component={AddScreen}
           listeners={({navigation}) => {
              tabPress: event => {
                event.preventDefault();
                navigation.navigate("Add")
              }
           }}
            options={{
           // headerShown: false,
          tabBarIcon:(({color, size}) => (
            <MaterialCommunityIcons name = 'plus-box' color={color} size = {26}/>
          )),
        }} />
           <Tab.Screen name ='Profile' component={ProfileScreen} options={{
           // headerShown: false,
          tabBarIcon:(({color, size}) => (
            <MaterialCommunityIcons name = 'account-circle' color={color} size = {26}/>
          )),
        }}/>
      </Tab.Navigator>
    );
  }
  

}
    const mapStateToProps = (store) => ({
  currentUser: store.usersState.currentUser,
});

 const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser}, dispatch);


export default connect (mapStateToProps, mapDispatchProps) (HomeScreen);


