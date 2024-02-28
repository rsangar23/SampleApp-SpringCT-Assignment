import {useState} from 'react';
import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EmployeeInfo = () => {
  const [userName, setUserName] = useState('');
  const [userAge, setAge] = useState('');
  const [userAddress, setAddress] = useState('');
  const [userCity, setCity] = useState('');

  const value = [
    {
      name: userName,
      age: userAge,
      address: userAddress,
      city: userCity,
    },
  ];

  const onAddPress = () => {
    const storeUser = async () => {
      try {
        await AsyncStorage.setItem('user', JSON.stringify(value));
      } catch (error) {
        console.log(error);
      }
    };
  };

  return (
    <View style={styles.container}>
      <View style={styles.sectionStyle}>
        <TextInput
          style={styles.inputStyle}
          onChangeText={userName => setUserName(userName)}
          placeholder="Enter Name"
          keyboardType="default"
        />
      </View>
      <View style={styles.sectionStyle}>
        <TextInput
          style={styles.inputStyle}
          onChangeText={userAge => setAge(userAge)}
          placeholder="Enter Age"
          keyboardType="numeric"
        />
      </View>
      <View style={styles.sectionStyle2}>
        <TextInput
          editable
          multiline
          numberOfLines={4}
          maxLength={40}
          style={styles.inputStyle}
          onChangeText={userAddress => setAddress(userAddress)}
          placeholder="Enter Address"
          keyboardType="default"
        />
      </View>
      <View style={styles.sectionStyle}>
        <TextInput
          style={styles.inputStyle}
          onChangeText={userCity => setCity(userCity)}
          placeholder="Enter City"
          keyboardType="default"
        />
      </View>

      <TouchableOpacity
        activeOpacity={0.5}
        onPress={onAddPress}
        style={styles.buttonStyle}>
        <Text style={styles.buttonTextStyle}>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F6F193',
    alignContent: 'center',
  },
  inputStyle: {
    flex: 1,
    color: 'black',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: 'black',
  },
  buttonStyle: {
    backgroundColor: 'black',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: 'black',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  sectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  sectionStyle2: {
    flexDirection: 'row',
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
});

export default EmployeeInfo;
