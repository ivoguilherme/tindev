import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import logo from '../assets/logo.png';
import imgLike from '../assets/like.png';
import imgDislike from '../assets/dislike.png';
import api from '../services/api';
import AsyncStorage from '@react-native-community/async-storage';

export default function Main({navigation}) {
  const [users, setUsers] = useState([]);
  const [firstCharge, setFirstCharge] = useState(true);
  const devId = navigation.getParam('user');

  async function handleLike() {
    const [user, ...rest] = users;

    await api.post(`/devs/${user._id}/likes`, null, {
      headers: {
        user: devId,
      },
    });

    setUsers(rest);
  }

  async function handleDislike() {
    const [user, ...rest] = users;

    await api.post(`/devs/${user._id}/dislikes`, null, {
      headers: {
        user: devId,
      },
    });

    setUsers(rest);
  }

  async function handleLogout() {
    await AsyncStorage.clear();

    navigation.navigate('Login');
  }

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get('/devs', {
        headers: {
          user: devId,
        },
      });
      setUsers(response.data);
      setFirstCharge(false);
    }
    loadUsers();
  }, [devId]);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={handleLogout}>
        <Image style={styles.logo} source={logo} />
      </TouchableOpacity>
      <View style={styles.cardsContainer}>
        {firstCharge && !users.length ? (
          <Text style={styles.empty}>Carregando...</Text>
        ) : (
          <Text style={styles.empty}>Acabou :(</Text>
        )}
        {!!users.length &&
          users.map((user, index) => (
            <View
              key={user._id}
              style={[styles.card, {zIndex: users.length - index}]}>
              {console.log(user)}
              <Image
                style={styles.avatar}
                source={{
                  uri: user.avatar,
                }}
              />
              <View style={styles.footer}>
                <Text style={styles.name}>{user.name}</Text>
                <Text style={styles.bio} numberOfLines={3}>
                  {user.bio}
                </Text>
              </View>
            </View>
          ))}
      </View>

      {!!users.length && (
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={handleDislike} style={styles.button}>
            <Image source={imgDislike} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLike} style={styles.button}>
            <Image source={imgLike} />
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  cardsContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    maxHeight: 500,
  },

  card: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    margin: 30,
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },

  avatar: {
    flex: 1,
    height: 300,
  },

  footer: {
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },

  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },

  bio: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
    lineHeight: 18,
  },

  logo: {
    marginTop: 30,
  },

  buttonsContainer: {
    flexDirection: 'row',
    marginBottom: 30,
  },

  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  empty: {
    alignSelf: 'center',
    color: '#999',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
