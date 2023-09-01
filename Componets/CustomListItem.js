import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'

/* ThirdParty Imports */
import { ListItem, Avatar } from 'react-native-elements'


/*  */
import { getMessages } from '../firebase'
export default function CustomListItem({ id, chatName, enterChat }) {
  const [chatMessages, setChatMessages] = useState([]);
  console.log(chatMessages);
  useEffect(() => {
    const setChatMessagesData = async () => {
      const chatMessagesData = await getMessages(id);
      setChatMessages(chatMessagesData);
    }
    setChatMessagesData();
  }, [id]);

  return (
    <ListItem onPress={() => enterChat(id, chatName)} key={id} bottomDivider>
      <Avatar
        rounded
        source={{
          uri: chatMessages?.[0]?.photoURL ||
            "https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png"
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "800" }}>
          {chatName}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          {chatMessages?.[0]?.displayName}:{chatMessages?.[0]?.message}
        </ListItem.Subtitle>
      </ListItem.Content>

    </ListItem>
  )
}

const styles = StyleSheet.create({})