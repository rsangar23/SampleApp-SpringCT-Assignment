import React from 'react';
import {
  Alert,
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useList} from '../../contexts/UserProvider';
import {useState, useRef} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserDetail = props => {
  const [user, setUser] = useState(props.route.params.user);
  const {setUsers} = useList();

  const [name, setName] = useState(user.name);
  const [age, setAge] = useState(user.age);
  const [address, setAddress] = useState(user.address);
  const [city, setCity] = useState(user.city);

  const ageRef = useRef();
  const addressRef = useRef();
  const cityRef = useRef();

  const handleUpdate = (name, age, address, city) => {
    let tempusers = [];

    AsyncStorage.getItem('users').then(res => {
      res ? (tempusers = JSON.parse(res)) : [];

      const newUsers = tempusers.filter(n => {
        if (n.id === user.id) {
          n.name = name;
          n.age = age;
          n.address = address;
          n.city = city;

          setUser(n);
        }
        return n;
      });

      setUsers(newUsers);
      AsyncStorage.setItem('users', JSON.stringify(newUsers));
      Alert.alert('Employee updated Successfully..!!');
      props.navigation.navigate('HomeScreen');
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Update Details</Text>
      <View style={styles.sectionStyle}>
        <TextInput
          value={name}
          name="name"
          style={styles.inputStyle}
          onChangeText={name => setName(name)}
          placeholder="Enter Name"
          keyboardType="default"
          onSubmitEditing={() => {
            ageRef.current.focus();
          }}
          blurOnSubmit={false}
          returnKeyType='next'
          autoFocus={true}
        />
      </View>
      <View style={styles.sectionStyle}>
        <TextInput
        ref={ageRef}
          value={age}
          name="age"
          style={styles.inputStyle}
          onChangeText={age => setAge(age)}
          placeholder="Enter Age"
          keyboardType="numeric"
          onSubmitEditing={() => {
            addressRef.current.focus();
          }}
          blurOnSubmit={false}
          returnKeyType='next'
        />
      </View>
      <View style={styles.sectionStyle2}>
        <TextInput
          name="address"
          ref={addressRef}
          value={address}
          editable
          multiline
          numberOfLines={4}
          maxLength={40}
          style={styles.inputStyle}
          onChangeText={address => setAddress(address)}
          placeholder="Enter Address"
          keyboardType="default"
          onSubmitEditing={() => {
            cityRef.current.focus();
          }}
          blurOnSubmit={false}
          returnKeyType='next'
        />
      </View>
      <View style={styles.sectionStyle}>
        <TextInput
        ref={cityRef}
          value={city}
          name="city"
          style={styles.inputStyle}
          onChangeText={city => setCity(city)}
          placeholder="Enter City"
          keyboardType="default"
          returnKeyType='next'
        />
      </View>

      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => handleUpdate(name, age, address, city)}
        style={styles.buttonStyle}>
        <Text style={styles.buttonTextStyle}>UPDATE</Text>
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

export default UserDetail;
