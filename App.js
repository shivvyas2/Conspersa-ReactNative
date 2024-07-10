import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import rootReducer from './redux/reducers';
import LandingScreen from './screens/LandingScreen';
import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import AddScreen from './screens/Main/Add';

const store = createStore(rootReducer, applyMiddleware(thunk));

const Stack = createNativeStackNavigator();

const globalScreenOptions = {
  headerStyle: { backgroundColor: "#FFF" },
  headerTitleStyle: { color: "#222222" },
  headerTintColor: "#222222",
};

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Landing" screenOptions={globalScreenOptions}>
          <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Add" component={AddScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
