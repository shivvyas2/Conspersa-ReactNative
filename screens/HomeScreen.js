import React, { Component } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser, fetchUserChats } from '../redux/actions/index';
import FeedScreen from './Main/FeedScreen';
import ProfileScreen from './Main/Profile';
import AddScreen from './Main/Add';

const Tab = createMaterialBottomTabNavigator();

const globalTabScreenOptions = {
  backgroundColor: "#fff",
};

const EmptyScreen = () => {
  return null;
};

export class HomeScreen extends Component {
  componentDidMount() {
    this.props.fetchUser();
    this.props.fetchUserChats();
  }

  render() {
    return (
      <Tab.Navigator
        initialRouteName="Feed"
        labeled={false}
        activeColor='#3282B8'
        inactiveColor='#1B262C'
        shifting={true}
        barStyle={{ backgroundColor: '#fff' }}
      >
        <Tab.Screen
          name='Feed'
          component={FeedScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name='home' color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name='AddContainer'
          component={EmptyScreen}
          listeners={({ navigation }) => ({
            tabPress: event => {
              event.preventDefault();
              navigation.navigate("Add")
            }
          })}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name='plus-box' color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name='Profile'
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name='account-circle' color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}

const mapStateToProps = (store) => ({
  currentUser: store.usersState.currentUser,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchUser, fetchUserChats }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
