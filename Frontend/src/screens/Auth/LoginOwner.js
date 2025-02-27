import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  Button,
  Alert,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import Icon from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../../styles/Theme';
import {loginOwner} from '../../services/operations/AuthAPI';
import {useDispatch} from 'react-redux';
import {useToast} from 'react-native-toast-notifications';

const LoginOwner = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const toast = useToast();

  const onSubmit = async data => {
    const response = await dispatch(
      loginOwner(data.phone, data.password, navigation, toast),
    );
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  return (
    <SafeAreaView style={{backgroundColor: '#FFFFFF', height: '100%'}}>
      <ScrollView>
        <View
          style={{flex: 1, alignItems: 'center', backgroundColor: '#FFFFFF'}}>
          <View>
            <Image
              source={require('../../assets/Owner/welcome2.png')}
              style={{width: 345, height: 205}}
            />
          </View>

          <View style={{alignItems: 'center'}}>
            <View>
              <Text
                style={{
                  fontSize: 24,
                  color: colors.color_dark_blue,
                  fontWeight: '700',
                  width: 300,
                  height: 48,
                  textAlign: 'center',
                }}>
                PGfy
              </Text>
              <Text
                style={{
                  fontSize: 32,
                  color: colors.color_dark_blue,
                  fontWeight: 'bold',
                  width: 300,
                  height: 48,
                  textAlign: 'center',
                }}>
                Welcome Back
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 17,
                  textAlign: 'center',
                  marginBottom: 20,
                  color: colors.color_light_black,
                  fontWeight: '600',
                }}>
                Login to your account
              </Text>
            </View>
          </View>

          <View style={{marginBlockStart: 20, alignItems: 'center'}}>
            <View>
              <Text style={styles.label}>
                Email / Phone Number
                <Text style={{fontSize: 10, color: 'red'}}>*</Text> :
              </Text>
              <Controller
                control={control}
                rules={{required: true}}
                render={({field: {onChange, onBlur, value}}) => (
                  <View
                    style={[
                      styles.inputContainer,
                      {
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '85%',
                        borderRadius: 3,
                      },
                    ]}>
                    <TextInput
                      style={styles.input}
                      placeholder="Email/Phone Number"
                      onChangeText={onChange}
                      value={value}
                      onBlur={onBlur}
                      placeholderTextColor={'#adb5bd'}
                    />
                  </View>
                )}
                name="phone"
                defaultValue=""
              />
              {errors.email && <Text>Email or Phone Number is Required</Text>}
            </View>

            <View>
              <Text style={styles.label}>
                Password
                <Text style={{fontSize: 10, color: 'red', borderRadius: 3}}>
                  *
                </Text>{' '}
                :
              </Text>
              <Controller
                control={control}
                rules={{required: true}}
                render={({field: {onChange, onBlur, value}}) => (
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your password"
                      placeholderTextColor={'#adb5bd'}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      secureTextEntry={!passwordVisible}
                    />
                    <TouchableOpacity
                      onPress={() => setPasswordVisible(!passwordVisible)}>
                      <Icon
                        name={passwordVisible ? 'eye-off' : 'eye'}
                        size={20}
                        color="gray"
                      />
                    </TouchableOpacity>
                  </View>
                )}
                name="password"
                defaultValue=""
              />
              {errors.password && (
                <Text style={styles.errorText}>Password is required.</Text>
              )}
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '80%',
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}></View>
              <View>
                <TouchableOpacity onPress={handleForgotPassword}>
                  <Text>Forgot Password?</Text>
                </TouchableOpacity>
              </View>
            </View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '400',
                color: colors.color_light_black,
                marginTop: 10,
              }}>
              Login via OTP
            </Text>
            <View
              style={{
                width: '80%',
                justifyContent: 'center',
                alignItems: 'center',
                marginBlock: 30,
              }}>
              <TouchableOpacity
                onPress={handleSubmit(onSubmit)}
                style={styles.button}>
                <Text
                  style={[
                    styles.buttonText,
                    {alignContent: 'center', justifyContent: 'center'},
                  ]}>
                  Log In
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Text>Don't have an account? </Text>
            <TouchableOpacity
              
              style={{flexDirection: 'row'}}>
              <Text
                style={{
                  color: colors.color_dark_blue,
                  textDecorationLine: 'underline',
                  fontWeight: 'bold',
                }}>
                Sign up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default LoginOwner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 3,
    paddingHorizontal: 10,
    width: '80%' || '85%',
    marginBottom: 20,
    },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#000',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  button: {
    backgroundColor: colors.color_dark_blue,
    paddingVertical: 12,
    paddingHorizontal: 100,
    borderRadius: 4,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    // Shadow for Android
    elevation: 5,
    alignContent: 'center',
    whiteSpace: 'nowrap',
    marginTop: -20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  shadowContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
