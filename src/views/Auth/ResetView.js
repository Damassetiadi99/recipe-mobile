/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {MainStyle} from '../../AppStyles';
import {AuthStyle} from './authStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {changePass} from '../../storages/actions/authAction';
import {useEffect} from 'react';
export default function ResetView({navigation}) {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const dataPass = useSelector(state => state.changepw);
  const confirmotp = useSelector(state => state.confirmotp);

  useEffect(() => {
    if (auth.data == null) {
      setEmail(confirmotp.data?.data[0].email);
    }
    setEmail(auth.data.data.email);
  }, [auth.data, confirmotp.data?.data]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const formData = {
    email: email,
    password: password,
    confirm: confirm,
  };
  const formSubmit = () => {
    if (password.trim() === '') {
      Alert.alert('Error', 'Please enter your password');
      return;
    }
    if (confirm.trim() === '') {
      Alert.alert('Error', 'Confirmed password didnt match');
      return;
    }
    dispatch(changePass(formData)).then(() => {
      setTimeout(() => {
        if (auth.data == null) {
          navigation.navigate('Login');
        }
        navigation.navigate('Profile');
      }, 1000);
    });
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.lock}>
          <Image
            style={{height: 200, width: 200}}
            source={require('../../assets/images/lock.png')}
          />
          <Text style={MainStyle.headerText}>Reset Password</Text>
        </View>
        {/* <Text>{email}</Text> */}
        <View style={styles.inputSection}>
          <Icon name="lock-closed-outline" size={16} />
          <TextInput
            style={styles.input}
            placeholder="New Password"
            underlineColorAndroid="transparent"
            value={password}
            onChangeText={value => setPassword(value)}
          />
        </View>
        <View style={styles.inputSection}>
          <Icon name="lock-open-outline" size={16} />
          <TextInput
            style={styles.input}
            placeholder="Confirm New Password"
            underlineColorAndroid="transparent"
            value={confirm}
            onChangeText={value => setConfirm(value)}
          />
        </View>
      </View>
      <TouchableOpacity
        style={[AuthStyle.btn, {marginBottom: 32}]}
        onPress={formSubmit}>
        <Text style={AuthStyle.btnlabel}>
          {dataPass.isLoading ? (
            <ActivityIndicator size="large" color="white" />
          ) : (
            'Change Password'
          )}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  lock: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
  },
  title: {
    marginTop: 20,
    color: '#EFC81A',
    fontSize: 20,
    fontWeight: 'bold',
  },
  inputSection: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    width: 319,
    height: 50,
    borderRadius: 15,
    margin: 10,
    marginTop: 20,
    borderColor: '#EFC81A',
    color: '#EFC81A',
  },
  input: {
    flex: 1,
    minWidth: '70%',
    height: 40,
    borderColor: '#EFC81A',
  },
  imageStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
  btn: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: '78%',
    marginBottom: 10,
  },
});
