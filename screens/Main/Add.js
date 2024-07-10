import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput, FlatList } from 'react-native';
import { Camera } from 'expo-camera';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { db, storage, auth } from './../../Firebase';

export default function AddScreen() {
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [image, setImage] = useState(null);
  const [allowedUsers, setAllowedUsers] = useState('');
  const [users, setUsers] = useState([]);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');

      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === 'granted');
    })();

    const fetchUsers = async () => {
      const usersCollection = await db.collection('users').get();
      setUsers(usersCollection.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchUsers();
  }, []);

  const flipCamera = () => {
    setType(type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back);
  };

  const takePicture = async () => {
    if (cameraRef.current && cameraReady) {
      const options = { quality: 1.0, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      setImage(data.uri);
    }
  };

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      aspect: [1, 1],
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const retakePicture = () => {
    setImage(null);
  };

  const uploadImage = async () => {
    if (image) {
      const response = await fetch(image);
      const blob = await response.blob();
      const filename = image.substring(image.lastIndexOf('/') + 1);
      const ref = storage.ref().child(`images/${auth.currentUser.uid}/${filename}`);
      const snapshot = await ref.put(blob);
      const downloadURL = await snapshot.ref.getDownloadURL();

      const allowedUserIds = allowedUsers.split(',').map(uid => uid.trim());

      await db.collection('posts').add({
        imageUrl: downloadURL,
        userId: auth.currentUser.uid,
        allowedUsers: allowedUserIds,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });

      setImage(null);
      setAllowedUsers('');
    }
  };

  if (hasCameraPermission === null || hasGalleryPermission === null) {
    return <View />;
  }

  if (hasCameraPermission === false || hasGalleryPermission === false) {
    return <Text>No access to camera or gallery</Text>;
  }

  return (
    <View style={styles.container}>
      {!image && (
        <Camera
          style={styles.camera}
          type={type}
          ref={cameraRef}
          onCameraReady={() => setCameraReady(true)}
        >
          <View style={styles.topContainer}>
            <TouchableOpacity style={styles.flipButton} onPress={flipCamera}>
              <FontAwesome name="camera" size={23} color="#fff" />
            </TouchableOpacity>
          </View>
          <View style={styles.bottomContainer}>
            <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
              <View style={styles.captureButtonInside}></View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.galleryButton} onPress={pickImageAsync}>
              <FontAwesome name="picture-o" size={28} color="#fff" />
            </TouchableOpacity>
          </View>
        </Camera>
      )}
      {image && (
        <View style={styles.previewContainer}>
          <Image source={{ uri: image }} style={styles.previewImage} />
          <TextInput
            style={styles.input}
            placeholder="Allowed users (comma-separated UIDs)"
            value={allowedUsers}
            onChangeText={setAllowedUsers}
          />
          <FlatList
            data={users}
            renderItem={({ item }) => (
              <Text>{item.email}</Text>
            )}
            keyExtractor={item => item.id}
          />
          <View style={styles.previewButtonsContainer}>
            <TouchableOpacity style={styles.previewButton} onPress={retakePicture}>
              <Text style={styles.previewButtonText}>Retake</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.previewButton} onPress={uploadImage}>
              <Text style={styles.previewButtonText}>Upload</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  topContainer: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  flipButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomContainer: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20,
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderColor: '#fff',
    borderWidth: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureButtonInside: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
  },
  galleryButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  previewButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  previewButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  previewButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 10,
    marginVertical: 10,
    fontSize: 16,
    color: '#fff',
  },
});
