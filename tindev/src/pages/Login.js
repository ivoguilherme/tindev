import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import logo from '../assets/logo.png';
import api from '../services/api';
import AsyncStorage from '@react-native-community/async-storage';

export default function Login({navigation}) {
  const [user, setUser] = useState('');

  async function handleLogin() {
    const response = await api.post('/devs', {
      username: user,
    });

    const {_id} = response.data;

    await AsyncStorage.setItem('user', _id);

    navigation.navigate('Main', {user: _id});
  }

  useEffect(() => {
    AsyncStorage.getItem('user').then(user => {
      if (user) {
        navigation.navigate('Main', {user});
      }
    });
  }, []);

  return (
    <KeyboardAvoidingView
      behavior="padding"
      enabled={Platform.OS === 'ios'}
      style={styles.container}>
      <Image source={logo} />

      <TextInput
        style={styles.input}
        placeholder="Digite seu usuário do GitHub"
        placeholderTextColor="#999"
        autoCapitalize="none"
        autoCorrect={false}
        value={user}
        onChangeText={setUser}
      />

      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    padding: 30,
    backgroundColor: '#F5F5F5',
  },

  input: {
    height: 46,
    alignSelf: 'stretch',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 4,
    marginTop: 20,
    paddingHorizontal: 15,
  },

  button: {
    height: 46,
    alignSelf: 'stretch',
    backgroundColor: '#DF4723',
    borderRadius: 4,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
