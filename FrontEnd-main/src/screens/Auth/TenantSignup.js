import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import Icon from 'react-native-vector-icons/Ionicons';
import { RadioButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { setSignupData } from '../../reducer/slices/authSlice';

const TenantSignup = ({navigation}) => {
  
  const { control, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const [passwordVisible, setPasswordVisible] = useState(false);
  
  const onSubmit = (data) => {
    const payload = { ...data, accountType:"Tenant" };
    dispatch(setSignupData(payload))
    console.log('Signup Data Submitted:', payload);
    navigation.navigate('Tenant Mobile Number')    
  };

  const [checked, setChecked] = useState('second');

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ paddingHorizontal: 20, paddingTop: '25%' }}>
        <View style={{ flex: 2, justifyContent: 'center', width: '100%' }}>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.title}>Create account</Text>
            <Text style={styles.subtitle}>Please sign up with your mail to</Text>
            <Text style={styles.subtitle}>continue using the app</Text>
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
            {/* Name */}
            <View>
              <Text style={styles.label}>
                Name<Text style={styles.required}>*</Text> :
              </Text>
              <Controller
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.input}
                      placeholder="Name"
                      placeholderTextColor="#adb5bd"
                      onChangeText={onChange}
                      value={value}
                      onBlur={onBlur}
                    />
                  </View>
                )}
                name="name"
                defaultValue=""
              />
              {errors.name && <Text style={styles.errorText}>Name is required.</Text>}
            </View>

            {/* Email */}
            <View>
              <Text style={styles.label}>
                Email<Text style={styles.required}>*</Text> :
              </Text>
              <Controller
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.input}
                      placeholder="Email"
                      placeholderTextColor="#adb5bd"
                      onChangeText={onChange}
                      value={value}
                      onBlur={onBlur}
                    />
                  </View>
                )}
                name="email"
                defaultValue=""
              />
              {errors.email && <Text style={styles.errorText}>Email is required.</Text>}
            </View>

            {/* Password */}
            <View>
              <Text style={styles.label}>
                Password<Text style={styles.required}>*</Text> :
              </Text>
              <Controller
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View style={[styles.inputContainer, { alignItems: 'center' }]}>
                    <TextInput
                      style={[styles.input, { flex: 1 }]}
                      placeholder="Enter your password"
                      placeholderTextColor="#adb5bd"

                      secureTextEntry={!passwordVisible}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                    <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
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
              {errors.password && <Text style={styles.errorText}>Password is required.</Text>}
            </View>

            {/* Terms & Conditions */}
            <View style={styles.termsContainer}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <RadioButton
                  value="first"
                  status={checked === 'first' ? 'checked' : 'unchecked'}
                  onPress={() => setChecked('first')}
                />
                <Text>I agree to </Text>
                <TouchableOpacity onPress={() => console.log('Terms & Conditions pressed')}>
                  <Text style={styles.link}>Terms & Conditions</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Submit Button */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.button}>
                <Text style={styles.buttonText}>Sign Up</Text>
              </TouchableOpacity>
            </View>


            <View style={{flexDirection:'row'}}>
              <Text style={{alignContent:'center',alignItems:'center'}}>
                Already have an account? 
              </Text>

              <TouchableOpacity  onPress={()=>navigation.navigate("Loginuser")}><Text style={{color:'red',textDecorationLine:'underline',fontWeight:'bold'}}>  log in</Text></TouchableOpacity>
            </View>
          </View>


        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TenantSignup;

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    marginTop: 10,
  },
  formContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  required: {
    fontSize: 10,
    color: 'red',
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
    color: 'black',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  termsContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '80%',
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    width: 'full',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
  },
  button: {
    backgroundColor: 'red',
    paddingVertical: 12,
    paddingHorizontal: 100,
    borderRadius: 10,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
