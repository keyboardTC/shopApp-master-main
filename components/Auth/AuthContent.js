import { useState } from 'react';
import { Alert, StyleSheet, View, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import FlatButton from '../ui/FlatButton';
import AuthForm from './AuthForm';
import { Colors } from '../../constants/styles';

function AuthContent({ isLogin, onAuthenticate, signInHandler }) {
  const navigation = useNavigation();

  const [credentialsInvalid, setCredentialsInvalid] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
    phoneNum: false,
    address: false
  });

  function switchAuthModeHandler() {
    if (isLogin) {
      navigation.replace('Signup');
    } else {
      navigation.replace('Login');
    }
  }

  function submitHandler(credentials) {
    let { name, email, password, confirmPassword, phoneNum, address } = credentials;

    email = email.trim();
    password = password.trim();

    const nameIsValid = name.length > 12
    const emailIsValid = email.includes('@');
    const passwordIsValid = password.length > 6;
    const phoneNumIsValid = phoneNum.length === 10
    const addressIsValid = address.length > 5
    const passwordsAreEqual = password === confirmPassword;

    if (
      !emailIsValid ||
      !passwordIsValid  ||
      (!isLogin && !passwordsAreEqual && !nameIsValid && !phoneNumIsValid && !addressIsValid)
    ) {
      Alert.alert('Invalid input', 'Please check your entered credentials.');
      setCredentialsInvalid({
        name: !nameIsValid,
        email: !emailIsValid,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
        phoneNum: !phoneNumIsValid,
        address: !addressIsValid
      });
      return;
    }

    if (isLogin) {
      signInHandler({ email, password });
    }else{
      onAuthenticate({ name, email, password, phoneNum, address });
    }
  }

  return (
    <ScrollView style={styles.authContent}>
      <AuthForm
        isLogin={isLogin}
        onSubmit={submitHandler}
        credentialsInvalid={credentialsInvalid}
      />
      <View style={styles.buttons}>
        <FlatButton onPress={switchAuthModeHandler}>
          {isLogin ? 'Create a new user' : 'Log in instead'}
        </FlatButton>
      </View>
    </ScrollView>
  );
}

export default AuthContent;

const styles = StyleSheet.create({
  authContent: {
    marginTop: 64,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 8,
    backgroundColor: Colors.primary800,
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  buttons: {
    marginTop: 8,
  },
});
