import React from 'react';
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

export default function Login() {
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
      />
      <TouchableOpacity style={styles.button}>
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
