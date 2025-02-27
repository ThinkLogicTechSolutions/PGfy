import React, {useState, useEffect} from 'react';
import OtpImg from '../../assets/Owner/OtpPage.png';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '../../styles/Theme';
import {useDispatch} from 'react-redux';
import {useToast} from 'react-native-toast-notifications';
import {OwnerverifyOtp, OwnersendOtp} from '../../services/operations/AuthAPI';

const OtpScreen = ({route, navigation}) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const dispatch = useDispatch();
  const toast = useToast();
  const {phoneNumber} = route.params;
  let lastFourDigits = phoneNumber.toString().slice(-4);

  useEffect(() => {
    let timer;
    if (resendTimer > 0) {
      timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
    } else {
      setCanResend(true);
    }
    return () => clearTimeout(timer);
  }, [resendTimer]);

  const handleBackPress = () => {
    console.log('Back button pressed');
    navigation.navigate('Owner Mobile Number');
  };

  const handleInputChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      const nextInput = index + 1;
      inputs[nextInput]?.focus();
    }

    if (value === '' && index > 0) {
      const prevInput = index - 1;
      inputs[prevInput]?.focus();
    }

    if (value) setError(false);
  };

  const inputs = [];

  const handleVerify = async () => {
    if (otp.includes('') || otp.join('').length < 4) {
      setError(true);
      Alert.alert('Error', 'Please enter all 4 digits of the OTP.');
      return;
    }

    setLoading(true);
    setError(false);

    try {
      console.log(phoneNumber, otp.join(''));
      const response = await dispatch(
        OwnerverifyOtp(phoneNumber,otp.join(''), navigation, toast),
      );
    } catch (error) {
      Alert.alert('Error', 'An error occurred while verifying OTP.', error);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!canResend) return;

    try {
      setLoading(true);
      setCanResend(false);
      setResendTimer(30);
      // Call the ResendOTP API here
      const response = await dispatch(OwnersendOtp(phoneNumber, navigation, toast));
      if (response) {
        toast.show('OTP Resent Successfully', {type: 'success'});
        Alert.alert('OTP Resent', 'A new OTP has been sent to your mobile.');
      } else {
        toast.show('Failed to Resend OTP. Try again.', {type: 'danger'});
        Alert.alert('OTP Resent UnSuccessful', 'Please try again.');
      }
    } catch (err) {
      console.error('Error resending OTP:', err);
      toast.show('An error occurred while resending OTP.', {type: 'danger'});
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <Icon name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
      <Text
        style={{
          color: colors.color_purple,
          fontSize: 24,
          fontWeight: '700',
          marginTop: 20,
          marginLeft: 125,
        }}>
        PGfy
      </Text>
      <Image source={OtpImg} style={styles.image} />
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Enter verification code</Text>
        <Text style={styles.subHeaderText}>
          Thank you for registering with us. Please type the OTP as shared on
          your mobile number xxxxxx<Text>{lastFourDigits}</Text>
        </Text>
      </View>
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            style={[
              styles.otpInput,
              error && digit === '' && styles.errorBorder,
            ]}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={value => handleInputChange(value, index)}
            ref={input => (inputs[index] = input)}
          />
        ))}
      </View>
      <Text style={styles.resendSideText}>
        Didn't get the OTP? No worries, try again.
      </Text>
      <TouchableOpacity onPress={handleResendOtp} disabled={!canResend}>
        <Text style={styles.resendText}>
          {canResend ? 'Resend' : `Resend in ${resendTimer}s`}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.verifyButton}
        onPress={handleVerify}
        disabled={loading}>
        <Text style={styles.verifyText}>
          {loading ? 'Verifying...' : 'Verify'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.color_white,
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 15,
    zIndex: 10,
  },
  headerContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  headerText: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 10,
    top: 30,
  },
  subHeaderText: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    top: 35,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 30,
    top: 10,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#ABABAB',
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 18,
  },
  resendSideText: {
    textAlign: 'center',
  },
  resendText: {
    color: colors.color_dark_blue,
    textAlign: 'center',
    marginVertical: 10,
    textDecorationLine: 'underline',
  },
  verifyButton: {
    backgroundColor: colors.color_dark_blue,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 20,
    width: 270,
    left: 27,
  },
  verifyText: {
    color: colors.color_white,
    fontSize: 22,
    fontWeight: 'bold',
  },
  image: {
    top: 25,
    width: '100%',
    height: 200,
    backgroundColor: '#0553',
  },
  errorBorder: {
    borderColor: 'red',
  },
});
