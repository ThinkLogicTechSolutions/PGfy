import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  TextInput,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import {setSignupData} from '../../reducer/slices/authSlice';
import {sendOtp} from '../../services/operations/AuthAPI';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

function TenantMobileNum() {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const {signupData} = useSelector(state => state.Auth);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {email, accountType, name, password} = signupData;

  const handleBackPress = () => {
    navigation.goBack();
  };
  const onSubmit = async data => {
    console.log('email', email);
    console.log('Account1', accountType);
    const phone = data?.mobileNumber;
    dispatch(setSignupData({name, email, password, accountType, phone: phone}));
    console.log('mobile number', phone);
    dispatch(sendOtp(phone, navigation.navigate));
  };

  return (
    <SafeAreaView style={{flex: 1, padding: 10}}>
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 30,
          }}>
          <TouchableOpacity
            onPress={handleBackPress}
            style={styles.backButton}>
            <Icon name="arrow-back" size={28} color="black" />
          </TouchableOpacity>
          <Text
            style={{
              flex: 1,
              textAlign: 'center',
              fontSize: 30,
              fontWeight: 'bold',
              color: 'red',
              fontWeight: 700,
            }}>
            PGfy
          </Text>
        </View>

        {/* Main Content */}
        <View style={{marginTop: 100, flex: 1}}>
          <Text style={{fontSize: 28, marginBottom: 20, fontWeight: 600}}>
            Can we get your number?
          </Text>

          {/* Controller for managing the input */}
          <Controller
            control={control}
            name="mobileNumber"
            rules={{
              required: 'Mobile number is required',
              pattern: {
                value: /^[0-9]{10}$/,
                message: 'Mobile number must be 10 digits',
              },
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: errors.mobileNumber ? 'red' : '#ccc',
                  padding: 10,
                  borderRadius: 5,
                  marginBottom: 10,
                }}
                placeholder="Enter 10-digit phone number"
                placeholderTextColor="#adb5bd"
                keyboardType="numeric"
                maxLength={10}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          {/* Display error messages */}
          {errors.mobileNumber && (
            <Text style={{color: 'red', marginBottom: 10}}>
              {errors.mobileNumber.message}
            </Text>
          )}

          <Text style={{paddingBlock: 30}}>
            We’ll text you a code to verify you’re really you. Message and data
            rates may apply.
            <Text
              style={{
                color: 'red',
                textDecorationLine: 'underline',
                fontWeight: 'bold',
              }}>
              What happens if your number changes?
            </Text>
          </Text>

          {/* Submit Button */}
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default TenantMobileNum;

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: 10,
    left: 15,
    zIndex: 10,
  },
});
