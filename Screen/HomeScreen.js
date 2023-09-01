import { StyleSheet, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect, useState, useEffect } from 'react'

/* ThirdParty Imports */
import { Avatar } from 'react-native-elements'
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons'
/* files Imports */
import { db, signOutAuthUser, getChats } from '../firebase'
import CustomListItem from '../Componets/CustomListItem'
  ;

export default function HomeScreen({ navigation }) {
  const [chats, setChats] = useState([]);

  useEffect(() => {

    const setChatsData = async () => {
      const chatsData = await getChats();
      setChats(chatsData);
    }
    setChatsData();


  }, [navigation]);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Signal",
      headerStyle: { backgroundColor: "#fff" },
      headerTitleStyle: {
        color: "black",
      },
      headerTintColor: "black",
      headerTitleAlign: "center",
      headerLeft: () => <View style={{ marginLeft: 10 }}>
        <TouchableOpacity onLongPress={signOutUser} activeOpacity={0.5}>
          <AntDesign name="user" size={24} color="black" />
          {/*   <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} /> */}
        </TouchableOpacity>
      </View>,
      headerRight: () => <View style={{
        flexDirection: "row",
        justifyContent: "space-between",
        width: 80,
        marginRight: 20,
      }}>
        <TouchableOpacity activeOpacity={0.5}>
          <AntDesign name="camerao" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("AddChat")} activeOpacity={0.5}>
          <SimpleLineIcons name="pencil" size={24} color="black" />
        </TouchableOpacity>
      </View>
    })
  }, [navigation])
  /* Functions */
  const signOutUser = () => {
    signOutAuthUser()
      .then(() => {
        navigation.replace("Login")
      })
  }
  const enterChat = (id, chatName) => {
    navigation.navigate("Chat", {
      id: id,
      chatName: chatName,
    })
  }
  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        {chats.map(({ id, data: { chatName } }) => (
          <CustomListItem enterChat={enterChat} key={id} id={id} chatName={chatName} />
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
  }
})