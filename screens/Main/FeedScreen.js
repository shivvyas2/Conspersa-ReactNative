import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { db, auth } from '../../Firebase';

const FeedScreen = () => {
  const [posts, setPosts] = useState([]);
  const { currentUser } = useSelector((state) => state.usersState);

  useEffect(() => {
    const fetchPosts = async () => {
      const snapshot = await db.collection('posts')
        .where('allowedUsers', 'array-contains', auth.currentUser.uid)
        .orderBy('timestamp', 'desc')
        .get();
      setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchPosts();
  }, [currentUser]);

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <View style={styles.post}>
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
            <Text style={styles.caption}>{item.caption}</Text>
          </View>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  post: {
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
  caption: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FeedScreen;
