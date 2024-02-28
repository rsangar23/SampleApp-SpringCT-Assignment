import {createRef, useState} from 'react';
import React from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPasswaord, setPassword] = useState('');
  const [error, setError] = useState('');

  const passwaordInputRef = createRef();

  const onLoginPress = () => {
    if (!userEmail) {
      Alert.alert('please enter email');
      return;
    }
    if (!userPasswaord) {
      Alert.alert('please enter password');
      return;
    }

    let data = {email: userEmail, passwaord: userPasswaord};
    let formBody = [];

    for (let key in data) {
      let encodedKey = encodeURIComponent(key);
      let encodedValue = encodeURIComponent(data[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }

    formBody = formBody.join('&');

    fetch('https://reqres.in/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: formBody,
    })
      .then(response => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]).then(res => ({
          statusCode: res[0],
          data: res[1],
        }));
      })
      .then(res => {
        const {statusCode, data} = res;

        if (statusCode === '200') {
          const storeData = async data => {
            try {
              await AsyncStorage.setItem('token', data.token);
            } catch (error) {
              console.log(error);
            }
          };
          navigation.navigate('HomeScreen');
        } else {
          setError(data.error);
          Alert.alert('Unable to login : ' + data.error);
        }
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View style={styles.sectionStyle}>
          <TextInput
            style={styles.inputStyle}
            onChangeText={userEmail => setUserEmail(userEmail)}
            placeholder="Enter Username"
            keyboardType="email-address"
            onSubmitEditing={() =>
              passwaordInputRef.current && passwaordInputRef.current.focus()
            }
          />
        </View>
        <View style={styles.sectionStyle}>
          <TextInput
            style={styles.inputStyle}
            onChangeText={userPasswaord => setPassword(userPasswaord)}
            ref={passwaordInputRef}
            secureTextEntry={true}
            returnKeyType="next"
            placeholder="Enter Password"
            keyboardType="default"
          />
        </View>

        <TouchableOpacity
          activeOpacity={0.5}
          onPress={onLoginPress}
          style={styles.buttonStyle}>
          <Text style={styles.buttonTextStyle}>Login</Text>
        </TouchableOpacity>
      </ScrollView>
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
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
});

export default Login;
