/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
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
import Icon from 'react-native-vector-icons/Ionicons';

import {AuthStyle} from './authStyles';
import {useDispatch, useSelector} from 'react-redux';
import {useState} from 'react';
import {MainStyle} from '../../AppStyles';
import {confirmOTP} from '../../storages/actions/authAction';
export default function RequestView({navigation}) {
  const data = useSelector(state => state.reqotp.data);
  const confirmotp = useSelector(state => state.confirmotp);
  const dispatch = useDispatch();
  useEffect(() => {
    setEmail(data.data?.email);
    setOtp(data.data?.otp);
  }, [data.data?.email, data.data?.otp]);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const formData = {
    email: email,
    otp: otp,
  };
  const formSubmit = () => {
    if (email.trim() === '') {
      Alert.alert('Error', 'Please enter your email');
      return;
    }
    dispatch(confirmOTP(formData)).then(() => {
      setTimeout(() => {
        navigation.navigate('Reset');
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
          <Text style={MainStyle.headerText}>Confirm OTP</Text>
        </View>
        <View style={styles.inputSection}>
          <Icon name="person-outline" size={16} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            underlineColorAndroid="transparent"
            value={email}
            onChangeText={value => setEmail(value)}
          />
        </View>
        <View style={styles.inputSection}>
          <Icon name="lock-open-outline" size={16} />
          <TextInput
            style={styles.input}
            placeholder="OTP"
            underlineColorAndroid="transparent"
            value={otp}
            onChangeText={value => setOtp(value)}
          />
        </View>
      </View>
      <TouchableOpacity
        style={[AuthStyle.btn, {marginBottom: 32}]}
        onPress={formSubmit}>
        <Text style={AuthStyle.btnlabel}>
          {confirmotp.isLoading ? (
            <ActivityIndicator size="large" color="white" />
          ) : (
            'Request OTP'
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
