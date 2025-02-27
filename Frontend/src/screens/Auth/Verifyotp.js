import React, {useState, useRef} from 'react';
import {
  SafeAreaView,
  TextInput,
  Text,
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native'; // To navigate after successful OTP verification
import axios from 'axios'; // Use axios for making API requests
import {signUp} from '../../services/operations/AuthAPI';
import {authEndpoints} from '../../services/apis';
// import {OtpPage} from '../../assets/OtpPage.png'
import Icon from 'react-native-vector-icons/MaterialIcons';

const {VERIFY_OTP_API} = authEndpoints;

function VerifyOtp() {
  const [otp, setOtp] = useState(['', '', '', '']); // Array to store OTP digits
  const inputRefs = useRef([]);

  const dispatch = useDispatch(); // If you need to dispatch actions, e.g., saving token to Redux store
  const navigation = useNavigation(); // React Navigation to navigate after OTP verification

  const {signupData} = useSelector(state => state.Auth);

  const {phone, email, name, accountType, password} = signupData;
  let lastFourDigits = phone.toString().slice(-4);

  const handleChange = (text, index) => {
    if (/^[0-9]$/.test(text) || text === '') {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);

      // Move to the next input automatically if a number is entered
      if (text !== '' && index < 3) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyPress = (event, index) => {
    if (
      event.nativeEvent.key === 'Backspace' &&
      otp[index] === '' &&
      index > 0
    ) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async () => {
    const otpString = otp.join(''); // Join the OTP array to get the full OTP string

    if (otpString.length === 4) {
      try {
        console.log('Account', accountType);

        const response = await axios.post(
          VERIFY_OTP_API,
          {
            phoneNumber: phone,
            otp: otpString,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );

        if (response.data.success) {
          console.log('responce:', response);
          // Handle success (e.g., save token to Redux, navigate to another screen)
          console.log(email, phone, password, accountType, name);
          dispatch(
            signUp(
              email,
              name,
              phone,
              password,
              accountType,
              navigation.navigate,
            ),
          ); // Navigate to another screen after successful OTP verification
        } else {
          alert('Invalid OTP. Please try again.');
        }
      } catch (error) {
        console.log('Error verifying OTP:', error.message);
        alert('Something went wrong while verifying the OTP.');
      }
    } else {
      alert('Please enter a valid 4-digit OTP.');
    }
  };

  return (
    <ScrollView style={{backgroundColor: '#FFFFFF'}}>
      <SafeAreaView style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 30,
          }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{position: 'absolute', left: 10,zIndex: 10,}}>
            <Icon name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text
            style={{
              flex: 1,
              textAlign: 'center',
              fontSize: 30,
              fontWeight: 'bold',
              color: '#FF4B3E',
            }}>
            PGfy
          </Text>
        </View>
        {/* <Image source={require("../../assets/OtpPage.png")} style={{width:'400',height:'200'}}/> */}
        <Text style={styles.title}>Enter Verification Code</Text>
        <Text style={styles.subtitle}>
          Thank you for registering with us. Please type the OTP as shared on
          your mobile number xxxxxxx<Text>{lastFourDigits}</Text>
        </Text>
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              style={styles.input}
              keyboardType="numeric"
              maxLength={1}
              value={digit}
              onChangeText={text => handleChange(text, index)}
              onKeyPress={event => handleKeyPress(event, index)}
              ref={ref => (inputRefs.current[index] = ref)}
            />
          ))}
        </View>

        <TouchableOpacity
          onPress={handleSubmit}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            width: '80%',
            padding: 15,
            backgroundColor: 'red',
            borderRadius: 8,
            marginVertical: 10,
            marginBlockStart: 50,
          }}>
          <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
            Next
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    padding: 50,
    marginBlock: 50,
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
    textAlign: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    width: 40,
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    textAlign: 'center',
    fontSize: 18,
    marginHorizontal: 5,
    borderRadius: 5,
  },
});

export default VerifyOtp;
