import { KeyboardAvoidingView, StatusBar, StyleSheet, View } from 'react-native'
import React, { useState, useLayoutEffect } from 'react'

import { createAuthUserWithEmailAndPassword } from '../firebase'
/* ThirdParty Imports */
import { Input, Button, Text } from '@rneui/base'

export default function RegisterScreen({ navigation }) {
  /* States */
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [imageUrl, setImageUrl] = useState('');


  /* UseLayoutEffect */
  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Login",

    })
  }, [navigation])

  /* Functions */
  const register = () => {
    createAuthUserWithEmailAndPassword(email, password, name, imageUrl)
  }




  return (
    
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <StatusBar styles="light" />
      <View style={styles.inputContainer}>
        <Input
          placeholder="Full Name"
          autoFocus type="text"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Input
          placeholder="Enter Your Email"
          type="email" value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Enter Your Password"
          secureTextEntry type="password" value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <Button containerStyle={styles.button} raised title={"Register"} onPress={register} />
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',

  },
  inputContainer: {
    width: 300,

  },
  button: {
    width: 200,
    marginTop: 10,
  },

})