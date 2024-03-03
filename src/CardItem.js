import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Alert} from 'react-native';
import {useList} from '../src/contexts/UserProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CardItem = ({user, onPress}) => {
  const {name, age, address, city} = user;
  const {setUsers} = useList();

  const deleteNote = () => {
    let users = [];

    AsyncStorage.getItem('users').then(res => {
      res ? (users = JSON.parse(res)) : [];

      const newUsers = users.filter(n => n.id !== user.id);
      setUsers(newUsers);
      AsyncStorage.setItem('users', JSON.stringify(newUsers));
    });
  };

  const displayDeleteAlert = () => {
    Alert.alert(
      'Are You Sure!',
      'This action will delete your user permanently!',
      [
        {
          text: 'Delete',
          onPress: deleteNote,
        },
        {
          text: 'No Thanks',
          onPress: () => console.log('no thanks'),
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={onPress}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 10,
          }}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.otherTitle}>Age : {age}</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.otherTitle}>{address}</Text>
          <Text style={styles.otherTitle}>{city}</Text>
        </View>
        <Text onPress={() => displayDeleteAlert()} style={styles.buttonTextStyle}>
          Delete
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
  },
  card: {
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    margin: 10,
  },
  otherTitle: {
    fontWeight: 'normal',
    fontSize: 16,
    color: 'black',
  },
  buttonTextStyle: {
    color: 'red',
    alignSelf: 'center',
    fontSize: 16,
    marginTop: 20,
    fontWeight: 'bold',
  },
});

export default CardItem;
