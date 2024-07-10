import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, TextInput, Button } from 'react-native';
import { useSelector } from 'react-redux';
import { db, auth } from '../firebase';

const ChatScreen = ({ route }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const { chatId } = route.params;
  const { currentUser } = useSelector((state) => state.usersState);

  useEffect(() => {
    const unsubscribe = db.collection('chats').doc(chatId).collection('messages')
      .orderBy('timestamp', 'asc')
      .onSnapshot(snapshot => {
        setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      });

    return () => unsubscribe();
  }, [chatId]);

  const sendMessage = () => {
    if (message.trim()) {
      db.collection('chats').doc(chatId).collection('messages').add({
        message,
        userId: auth.currentUser.uid,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
      setMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <View style={[
            styles.messageContainer,
            item.userId === currentUser.uid ? styles.myMessage : styles.theirMessage
          ]}>
            <Text style={styles.messageText}>{item.message}</Text>
          </View>
        )}
        keyExtractor={item => item.id}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={message}
          onChangeText={setMessage}
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  messageContainer: { marginVertical: 5, padding: 10, borderRadius: 5 },
  myMessage: { alignSelf: 'flex-end', backgroundColor: '#DCF8C6' },
  theirMessage: { alignSelf: 'flex-start', backgroundColor: '#E4E6EB' },
  messageText: { fontSize: 16 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', padding: 10 },
  input: { flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10 },
});

export default ChatScreen;
