import React, { useLayoutEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Input } from 'react-native-elements';
import { auth, db } from "../Firebase";


const RegisterScreen = ({navigation}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Back to Login",
    });
  }, [navigation]);

  const register = () => {
    auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        db.collection("users").doc(auth.currentUser.uid)  
          .set({
            name,
            email,
          })
          .then(() => {
            console.log("Document successfully written!");
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });  
        console.log(result)      
      })
      .catch((error) => alert(error.message));
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar style='dark'/>
      <Text style={styles.headerText}>Hey There</Text>
      <View style={styles.inputContainer}>
        <Input
          placeholder='Name'
          type='name' 
          value={name} 
          onChangeText={(text) => setName(text)}
        />
        <Input
          placeholder='Email'
          type='email' 
          value={email} 
          onChangeText={(text) => setEmail(text)}
        /> 
        <Input
          placeholder='Password'
          type='password' 
          secureTextEntry ={true}
          value={password} 
          onChangeText={(text) => setPassword(text)}
        />   
      </View>  
      <TouchableOpacity style={styles.signupButton} onPress={register} >
      <Text style={styles.signupButtonText}>Sign up</Text>
    </TouchableOpacity>

    
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    padding:10,
    backgroundColor:'#FFF', 
  },
  inputContainer:{
    marginTop:10,
    width:300,
    paddingTop: 40,
  },
  Button:{
    width:200,
    marginBottom:10,
  },
  headerText:{
    fontSize:30,
    fontWeight:"bold",
  },
  registerButton:{
    backgroundColor:'#3B3486',
    alignContent:"center",
    justifyContent:"center",
    width:100,
    padding:5,
    margin:2,
    borderRadius:5,
    shadowRadius:1,
    shadowColor:"#7743DB",
  },
  signupButton:{
    backgroundColor: '#F05454',
    borderRadius: 10,
    height: 50,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,

  },
  signupButtonText: {
    color: '#F5F5F5',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RegisterScreen;
