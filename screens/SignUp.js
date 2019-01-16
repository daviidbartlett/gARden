import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView
} from 'react-native';
import { firebase } from '../config/index';

const backGroundImage = require('../assets/splash.jpg');

export default class Login extends Component {
  state = {
    email: '',
    password: '',
    confirmPassword: '',
    confirmEmail: ''
  };

  onClickListener = () => {
    const {
      confirmEmail, email, password, confirmPassword
    } = this.state;
    const { navigation } = this.props;
    if (confirmEmail !== email || confirmPassword !== password) {
      Alert.alert('Alert', 'Password is not equal to confirmed password');
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          navigation.navigate('HomeScreen');
        })
        .catch(() => {
          Alert.alert('Alert', 'Something went wrong, please try again');
        });
    }
  };

  render() {
    const { navigation } = this.props;
    return (
      <KeyboardAvoidingView
        keyboardVerticalOffset={-130}
        style={{ flex: 1 }}
        behavior="padding"
        enabled
      >
        <ScrollView contentContainerStyle={styles.container}>
          <ImageBackground style={styles.bgImage} source={backGroundImage}>
            <View style={styles.imCover}>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.inputs}
                  placeholder="Email"
                  keyboardType="email-address"
                  underlineColorAndroid="transparent"
                  onChangeText={email => this.setState({ email })}
                />
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.inputs}
                  placeholder="Confirm Email"
                  keyboardType="email-address"
                  underlineColorAndroid="transparent"
                  onChangeText={confirmEmail => this.setState({ confirmEmail })}
                />
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.inputs}
                  placeholder="Password"
                  secureTextEntry
                  underlineColorAndroid="transparent"
                  onChangeText={password => this.setState({ password })}
                />
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.inputs}
                  placeholder="Confirm Password"
                  secureTextEntry
                  underlineColorAndroid="transparent"
                  onChangeText={confirmPassword => this.setState({ confirmPassword })}
                />
              </View>

              <TouchableOpacity
                style={[styles.buttonContainer, styles.loginButton]}
                onPress={() => this.onClickListener('login')}
              >
                <Text style={styles.loginText}>Sign up</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => navigation.navigate('SignIn')}
              >
                <Text style={styles.btnText}>Already have an account? Login in here.</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const resizeMode = 'center';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC'
  },
  imCover: {
    backgroundColor: 'rgba(0, 0, 0, 0.456)',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 300,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',

    shadowColor: '#808080',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginRight: 15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 300,
    borderRadius: 30,
    backgroundColor: 'transparent'
  },
  btnForgotPassword: {
    height: 15,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: 10,
    width: 300,
    backgroundColor: 'transparent'
  },
  loginButton: {
    backgroundColor: 'rgb(203,122,91)',

    shadowColor: '#808080',
    shadowOffset: {
      width: 0,
      height: 9
    },
    shadowOpacity: 0.5,
    shadowRadius: 12.35,

    elevation: 19
  },
  loginText: {
    color: 'white',
    fontSize: 18
  },
  bgImage: {
    flex: 1,
    resizeMode,
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',

    alignItems: 'center'
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold'
  }
});
