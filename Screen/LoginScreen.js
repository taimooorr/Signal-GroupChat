import { StyleSheet, View, StatusBar,KeyboardAvoidingView } from 'react-native'
import React, { useState, useEffect } from 'react'
/* ThirdParty Imports */
import { Image,Button,Input } from '@rneui/base'


/* files imports */

import { onAuthStateChangedAuthUser, signInAuthUserWithEmailAndPassword } from '../firebase'

export default function LoginScreen({ navigation }) {
  /* States */
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  /* UseEffects */

  /* Functions */
  const signIn = () => {
    signInAuthUserWithEmailAndPassword(email, password)
      .catch((error) => alert(error))
  }


  /* UI */
  return (
    <KeyboardAvoidingView behavior='padding'  style={styles.container}>
      <StatusBar styles="light" />
      <Image source={{ uri: "https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png" }}
        style={{
          width: 200,
          height: 200,
        }} />
      <View style={styles.inputContainer}>
        <Input placeholder="Email" autoFocus type="email" value={email} onChangeText={(text)=>setEmail(text)} />
        <Input placeholder="Password" secureTextEntry type="password" value={password} onChangeText={(text) => setPassword(text)} />
      </View>
      <Button containerStyle={styles.button} title={"Login"} onPress={signIn} />
      <Button containerStyle={styles.button} type='outline' title={"Register"} onPress={() => navigation.navigate("Register")} />
      <View style={{ height: 50 }} />
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