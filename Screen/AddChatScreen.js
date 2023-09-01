import { StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'

/* ThirdParty Imports */
import { Button, Input } from '@rneui/base'
import Icon from "react-native-vector-icons/FontAwesome"
/* files Imports */
import { db, createChat } from '../firebase'
export default function AddChatScreen({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      alignSelf: "center",
      title: "Add a new Chat",
      headerBackTitle: "Chats",

    })
  }, [])

  const [input, setInput] = useState("")

  /* Functions */
  const handleCreateChat = async () => {
    await createChat(input)
      .then(() => {
        navigation.goBack()
      }
      )
      .catch((error) => alert(error))
  }


  return (
    <View style={styles.container}>
      <Input
        placeholder="Enter a chat name"
        value={input}
        onChangeText={(text) => setInput(text)}
        leftIcon={
          <Icon name="wechat" type="antdesign" size={24} color="black" />
        }
      />
      <Button disabled={!input} onPress={handleCreateChat} title="Create new Chat" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 30,
    height: "100%",
  }
})