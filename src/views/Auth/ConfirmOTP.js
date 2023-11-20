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
import {MainStyle} from '../../AppStyles';
import {AuthStyle} from './authStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {useState} from 'react';
import {verifyUser} from '../../storages/actions/authAction';

export default function ConfirmOTPView({navigation}) {
  const data = useSelector(state => state.reqotp.data);
  const dataotp = useSelector(state => state.verify);
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
    dispatch(verifyUser(formData)).then(() => {
      setTimeout(() => {
        navigation.navigate('Login');
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
        {data.isLoading && (
          <View style={{marginVertical: 16}}>
            <View>
              <ActivityIndicator
                size={'large'}
                color={'#EFC81A'}
                style={{alignSelf: 'center'}}
              />
            </View>
          </View>
        )}
        {/* <Text>{data.data.data.otp}</Text> */}
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
      {dataotp.isError && (
        <Text>OTP Verification failed, please try again</Text>
      )}
      <TouchableOpacity
        style={[AuthStyle.btn, {marginBottom: 32}]}
        onPress={formSubmit}>
        <Text style={AuthStyle.btnlabel}>
          {dataotp.isLoading ? (
            <ActivityIndicator size="large" color="white" />
          ) : (
            'Verify Account'
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
