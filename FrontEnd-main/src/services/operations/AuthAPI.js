import {setUserId,setToken} from '../../reducer/slices/authSlice';
import {apiConnector} from '../apiconnector';
import {authEndpoints} from '../apis';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useToast} from 'react-native-toast-notifications';


const {SENDOTP_API, SIGNUP_API, LOGIN_API, VERIFY_OTP_API, LOGIN_OWNER_API} =
  authEndpoints;

export function sendOtp(phone, navigate) {
  return async () => {
    try {
      console.log('PHONE');
      const response = await apiConnector('POST', SENDOTP_API, {
        phoneNumber: phone,
      });
      console.log('RES', response);
      if (response && response.data && response.data.success) {
        navigate('OtpPage');
      } else {
        throw new Error(response?.data?.message || 'Failed to send OTP');
      }
    } catch (error) {
      if (error.response) {
        console.error(error.response.data);
      } else if (error.request) {
        console.error(error.request);
      } else {
        console.error(error.message);
      }
    }
  };
}

export function verifyOtp(phone, otp, navigate) {
  return async dispatch => {
    let id = toast.show('Please Wait...', {type: 'normal'});
    try {
      const response = await apiConnector('POST', VERIFY_OTP_API, {phone, otp});

      // if(!response.data.success){
      //     toast.hide(id);
      //     toast.show(response.data.message, {type: "danger"});
      //     throw new Error(response.data.message);
      // }

      await dispatch(setToken(response?.data?.token));
      await AsyncStorage.setItem('token', JSON.stringify(response.data.token));
      await AsyncStorage.setItem('user', JSON.stringify(response?.data?.user));
      await dispatch(setUser(response?.data?.user));

      // toast.hide(id);
      // toast.show("Login Successful", {type: "success"});
    } catch (e) {
      const errorMessage = e?.response?.data?.message || 'Login Failed';
      toast.hide(id);
      toast.show(errorMessage, {type: 'danger'});
    }
  };
}

export function signUp(email, name, phone, password, accountType, navigate) {
  return async dispatch => {
    try {
      const response = await apiConnector('POST', SIGNUP_API, {
        email,
        phone,
        password,
        accountType,
        fullName: name,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      dispatch(setUserId(response.data.user.id));
      navigate('Tenant Profile');
    } catch (error) {
      console.error(error.message);
    }
  };
}

export function login(phone, password, navigate) {
  return async dispatch => {
    try {
      const response = await apiConnector('POST', LOGIN_API, { phone, password });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      dispatch(setToken(response.data.token));
      dispatch(setUserId(response.data.userId));

      navigate('Explore');
    } catch (error) {
      console.error(error.message);
    }
  };
}


export function OwnersendOtp(phone, navigation, toast) {
  return async () => {
    try {
      const response = await apiConnector('POST', SENDOTP_API, {
        phoneNumber: phone,
      });
      console.log('RES', response);
      if (response && response.data && response.data.success) {
        navigation.navigate('Verify OTP', {phoneNumber: phone});
      } else {
        throw new Error(response?.data?.message || 'Failed to send OTP');
      }
    } catch (error) {
      if (error.response) {
        console.error(error.response.data);
      } else if (error.request) {
        console.error(error.request);
      } else {
        console.error(error.message);
      }
    }
  };
}
export function OwnerverifyOtp(phoneNumber, otp, navigation, toast) {
  return async dispatch => {
    let id = toast.show('Please Wait...', {type: 'normal'});
    try {
      console.log('first');
      const response = await apiConnector('POST', VERIFY_OTP_API, {
        phoneNumber,
        otp,
      });

      if (!response.data.success) {
        toast.hide(id);
        toast.show(response.data.message, {type: 'danger'});
        throw new Error(response.data.message);
      }
      console.log('second');

      await dispatch(setToken(response?.data?.token));
      console.log('third');
      toast.hide(id);
      toast.show('Login Successful', {type: 'success'});
      navigation.navigate('Owner Signup');
    } catch (e) {
      const errorMessage = e?.response?.data?.message;
      toast.hide(id);
      toast.show(errorMessage, {type: 'danger'});
    }
  };
}
export function loginOwner(phone, password, navigation, toast) {
  return async dispatch => {
    let id = toast.show('Please Wait...', {type: 'normal'});
    try {
      const response = await apiConnector('POST', LOGIN_API, {
        phone,
        password,
      });

      if (!response.data.success) {
        toast.hide(id);
        toast.show(response.data.message, {type: 'danger'});
        throw new Error(response.data.message);
      }

      toast.hide(id);
      toast.show('Login Successful', {type: 'success'});
      navigation.navigate('Owner Dashboard');
      return true;
    } catch (e) {
      const errorMessage = e?.response?.data?.message || 'Login Failed';
      toast.hide(id);
      toast.show(errorMessage, {type: 'danger'});
      return false;
    }
  };
}

export function OwnerSignup1(
  email,
  phone,
  password,
  fullName,
  // countryCode,
  navigation,
  toast,
  dispatch  // Add dispatch as an argument
) {
  return async dispatch => {
    let id = toast.show('Please Wait...', { type: 'normal' });
    try {
      const response = await apiConnector('POST', SIGNUP_API, {
        email,
        phone,
        password,
        // countryCode,
        fullName,
        accountType: 'Owner',
      });

      if (!response.data.success) {
        toast.hide(id);
        toast.show(response.data.message, { type: 'danger' });
        throw new Error(response.data.message);
      }

      toast.hide(id);
      toast.show('Signup Successful', { type: 'success' });

      // Assuming the response contains the token you need
      const token = response.data.token;  // Adjust based on your API response

      // Dispatch the token to Redux store
      dispatch(setToken(token));

      // Navigate to the next screen after setting the token
      navigation.navigate('CreateNewPg');
      return true;
    } catch (e) {
      console.error(e);
      const errorMessage = e?.response?.data?.message || 'Signup Failed';
      toast.hide(id);
      toast.show(errorMessage, { type: 'danger' });
      return false;
    }
  };
}

