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
import {useList} from '../../contexts/UserProvider';

const EmployeeInfo = ({navigation}) => {
  const [userName, setUserName] = useState('');
  const [userAge, setAge] = useState('');
  const [userAddress, setAddress] = useState('');
  const [userCity, setCity] = useState('');

  const {users, setUsers, findUsers} = useList();

  const handleOnSubmit = (name, age, address, city) => {
    const user = {id: Date.now(), name, age, address, city};
    const updatedUsers = [...users, user];
    setUsers(updatedUsers);
    AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
    navigation.navigate('HomeScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Add Employee Details</Text>
      <View style={styles.sectionStyle}>
        <TextInput
          name="name"
          style={styles.inputStyle}
          onChangeText={userName => setUserName(userName)}
          placeholder="Enter Name"
          keyboardType="default"
        />
      </View>
      <View style={styles.sectionStyle}>
        <TextInput
          name="age"
          style={styles.inputStyle}
          onChangeText={userAge => setAge(userAge)}
          placeholder="Enter Age"
          keyboardType="numeric"
        />
      </View>
      <View style={styles.sectionStyle2}>
        <TextInput
          name="address"
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
          name="city"
          style={styles.inputStyle}
          onChangeText={userCity => setCity(userCity)}
          placeholder="Enter City"
          keyboardType="default"
        />
      </View>

      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => handleOnSubmit(userName, userAge, userAddress, userCity)}
        style={styles.buttonStyle}>
        <Text style={styles.buttonTextStyle}>SUBMIT</Text>
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
  textStyle: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});

export default EmployeeInfo;
