import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Button from '../ui/Button';
import Input from './Input';

function AuthForm({ isLogin, onSubmit, credentialsInvalid }) {
  const [enteredName, setEnteredName] = useState('');
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPhoneNum, setEnteredPhoneNum] = useState('');
  const [enteredAddress, setEnteredAddress] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState('');

  const {
    name: nameIsInValid,
    email: emailIsInvalid,
    password: passwordIsInvalid,
    confirmPassword: passwordsDontMatch,
    phoneNum: phoneNumIsInValid,
    address: addressIsInValid,
  } = credentialsInvalid;

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case 'name':
        setEnteredName(enteredValue);
        break;
      case 'email':
        setEnteredEmail(enteredValue);
        break;
      case 'phoneNum':
        setEnteredPhoneNum(enteredValue);
        break;
      case 'address':
        setEnteredAddress(enteredValue);
        break;
      case 'password':
        setEnteredPassword(enteredValue);
        break;
      case 'confirmPassword':
        setEnteredConfirmPassword(enteredValue);
        break;
    }
  }

  function submitHandler() {
    onSubmit({
      name: enteredName,
      email: enteredEmail,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
      phoneNum: enteredPhoneNum,
      address: enteredAddress
    });
  }

  return (
    <View style={styles.form}>
      <View>
        {!isLogin && (
          <Input
            label="Full Name"
            onUpdateValue={updateInputValueHandler.bind(this, 'name')}
            value={enteredName}
            // keyboardType=""
            isInvalid={nameIsInValid}
          />
        )}
        
        <Input
          label="Email Address"
          onUpdateValue={updateInputValueHandler.bind(this, 'email')}
          value={enteredEmail}
          keyboardType="email-address"
          isInvalid={emailIsInvalid}
        />
        {!isLogin && (
          <Input
            label="Phone Number"
            onUpdateValue={updateInputValueHandler.bind(this, 'phoneNum')}
            value={enteredPhoneNum}
            keyboardType="numeric"
            isInvalid={phoneNumIsInValid}
          />
        )}
        {!isLogin && (
          <Input
            label="Enter Address"
            onUpdateValue={updateInputValueHandler.bind(this, 'address')}
            value={enteredAddress}
            isInvalid={addressIsInValid}
          />
        )}
        <Input
          label="Password"
          onUpdateValue={updateInputValueHandler.bind(this, 'password')}
          secure
          value={enteredPassword}
          isInvalid={passwordIsInvalid}
        />
        {!isLogin && (
          <Input
            label="Confirm Password"
            onUpdateValue={updateInputValueHandler.bind(
              this,
              'confirmPassword'
            )}
            secure
            value={enteredConfirmPassword}
            isInvalid={passwordsDontMatch}
          />
        )}
        <View style={styles.buttons}>
          <Button onPress={submitHandler}>
            {isLogin ? 'Log In' : 'Sign Up'}
          </Button>
        </View>
      </View>
    </View>
  );
}

export default AuthForm;

const styles = StyleSheet.create({
  buttons: {
    marginTop: 12,
  },
});
