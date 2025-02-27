import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '../../styles/Theme';
import {useDispatch} from 'react-redux';
import {useToast} from 'react-native-toast-notifications';
import {OwnersendOtp} from '../../services/operations/AuthAPI';

const OwnerMobileNum = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const toast = useToast();

  const handleBackPress = () => {
    navigation.navigate('SignUpIntro');
  };

  const handleNext = async () => {
    if (!phoneNumber) {
      setError(true);
      Alert.alert('Error', 'Phone number is required.');
      return;
    }

    setLoading(true);
    setError(false);

    try {
      const response = await dispatch(
        OwnersendOtp(phoneNumber, navigation, toast),
      );
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'An error occurred while sending OTP.');
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
          marginRight: 10,
        }}>
        PGfy
      </Text>
      <Text style={styles.title}>Can we get your number?</Text>
      <View style={[styles.phoneContainer, error && styles.errorBorder]}>
        <Text style={styles.countryCode}>IN +91</Text>
        <TextInput
          style={styles.input}
          placeholder="Phone number"
          keyboardType="numeric"
          value={phoneNumber}
          onChangeText={text => {
            setPhoneNumber(text);
            if (text) setError(false);
          }}
          maxLength={10}
        />
      </View>
      {error && <Text style={styles.errorText}>Phone number is required.</Text>}
      <Text style={[styles.infoText,{marginTop:20}]}>
        We'll text you a code to verify you're really you. Message and data
        rates may apply.{' '}
        <Text style={styles.linkText}>
          What happens if your number changes?
        </Text>
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={handleNext}
        disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Sending...' : 'Next'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.color_white,
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 15,
    zIndex: 10,
  },
  title: {
    fontSize: 25,
    top: 20,
    fontWeight: 'bold',
    marginVertical: 50,
    textAlign: 'center',
    width: 372,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent:"center"
  },
  countryCode: {
    fontSize: 15,
    marginRight: 10,
    fontWeight: '600',
    borderBottomWidth: 1,
    marginTop: 10,
    borderBottomColor: colors.color_light_black,
    color: colors.color_light_black,
  },
  input: {
    color: colors.color_light_black,
    flex: 1,
    fontWeight: '600',
    fontSize: 15,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: colors.color_light_black,
  },
  infoText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  linkText: {
    color: colors.color_dark_blue,
    textDecorationLine: 'underline',
  },
  button: {
    backgroundColor: colors.color_dark_blue,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: 270,
    top: 25,
  },
  buttonText: {
    color: colors.color_white,
    fontSize: 20.32,
    fontWeight: '600',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default OwnerMobileNum;
