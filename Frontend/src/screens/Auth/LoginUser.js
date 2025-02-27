import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  Button,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import Icon from 'react-native-vector-icons/Ionicons';
import Signup from './TenantSignup';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {login} from '../../services/operations/AuthAPI';
const LoginUser = ({navigation}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const navigate = useNavigation();
  const dispatch = useDispatch();

  const onSubmit = async data => {
    try {
      dispatch(login(data.email, data.password, navigation.navigate));
      console.log('res', req.user.id);
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <SafeAreaView style={{backgroundColor: '#FFFFFF', height: '100%'}}>
      <ScrollView>
        <View
          style={{flex: 1, alignItems: 'center', backgroundColor: '#FFFFFF'}}>
          <View>
            <Image
              source={require('../../assets/welcome2.png')}
              style={{width: 350, height: 200}}
            />
          </View>

          <View style={{alignItems: 'center'}}>
            <View>
              <Text style={{fontSize: 40, color: 'red', fontWeight: 'bold'}}>
                Welcome Back
              </Text>
            </View>
            <View>
              <Text style={{fontSize: 17}}>Login to your account</Text>
            </View>
          </View>

          <View style={{marginBlockStart: 30, alignItems: 'center'}}>
            <View>
              <Text style={styles.label}>
                Phone Number<Text style={{fontSize: 10, color: 'red'}}>*</Text>{' '}
                :
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
                        width: '80%',
                      },
                    ]}>
                    <TextInput
                      style={styles.input}
                      placeholder="Phone Number"
                      onChangeText={onChange}
                      value={value}
                      onBlur={onBlur}
                      placeholderTextColor={'#adb5bd'}
                    />
                  </View>
                )}
                name="email"
                defaultValue=""
              />
              {errors.email && <Text>Email or Phone Number is Required</Text>}
            </View>
            <View>
              <Text style={styles.label}>
                Password<Text style={{fontSize: 10, color: 'red'}}>*</Text> :
              </Text>
              <Controller
                control={control}
                rules={{required: true}} // Set validation rule
                render={({field: {onChange, onBlur, value}}) => (
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your password"
                      placeholderTextColor={'#adb5bd'}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      secureTextEntry={!passwordVisible} // Toggle visibility
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
                <TouchableOpacity onPress={() => console.log('Login Pressed')}>
                  <Text>Forgot Password?</Text>
                </TouchableOpacity>
              </View>
            </View>

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

          <View style={{flexDirection: 'row'}}>
            <Text>Don't have an account?</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('SignupUser')}
              style={{flexDirection: 'row'}}>
              <Text
                style={{
                  color: 'red',
                  textDecorationLine: 'underline',
                  fontWeight: 'bold',
                }}>
                Signup
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default LoginUser;

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
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    width: '80%',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#333',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'red',
    paddingVertical: 12,
    paddingHorizontal: 100,
    borderRadius: 10,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    // Shadow for Android
    elevation: 5,
    alignContent: 'center',
    whiteSpace: 'nowrap',
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
    shadowColor: '#000', // shadow color
    shadowOffset: {width: 0, height: 2}, // x and y offset
    shadowOpacity: 0.25, // opacity of shadow
    shadowRadius: 3.5, // blur radius
    elevation: 5, // height of shadow on Android
  },
});
