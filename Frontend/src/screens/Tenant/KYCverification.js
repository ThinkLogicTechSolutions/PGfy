import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';
import {NativeModules} from 'react-native';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../../styles/Theme';
 
const {Hyperkyc} = NativeModules;

const KYCverification = () => {
  if (!Hyperkyc) {
    Alert.alert('Error', 'Hyperkyc is not available.');
    return;
  }
  const navigation = useNavigation();

  const userId = useSelector(state => state.Auth.userId);
  const [configDictionary, setConfigDictionary] = useState(null);

  useEffect(() => {
    if (userId) {
      const appID = 'x1kcyv';
      const appKey = 'mtq642n0lm7vpemq0rhy';
      const transactionId = String(userId);
      const workflowId = 'kyc';

      const configDictionary = {};
      configDictionary['appId'] = appID;
      configDictionary['appKey'] = appKey;
      configDictionary['transactionId'] = transactionId;
      configDictionary['workflowId'] = workflowId;
      setConfigDictionary(configDictionary);
    } else {
      Alert.alert('Error', 'User not logged in');
    }
  }, [userId]);

  const verifyKYC = () => {
    if (Hyperkyc.launch) {
      Hyperkyc.launch(configDictionary, function (result) {
        console.log(result);

        switch (result.status) {
          case 'auto_approved':
            Alert.alert('Success', 'KYC automatically approved!', [
              {text: 'OK', onPress: () => navigation.navigate('Explore')},
            ]);
            break;

          case 'auto_declined':
            Alert.alert('Failure', 'KYC automatically declined.');
            break;

          case 'needs_review':
            Alert.alert('Review Required', 'KYC needs manual review.');
            break;

          case 'user_cancelled':
            Alert.alert('Cancelled', 'KYC process was cancelled.');
            break;

          case 'error':
            Alert.alert('Error', 'An error occurred during the KYC process.');
            break;

          default:
            Alert.alert('Unknown Status', 'An unknown status was received.');
            break;
        }
      });
    } else {
      console.error('Hyperkyc.launch is not available.');
    }
  };

  return (
    <View>
      <Text style={styles.heading}>KYC Verification Pending</Text>
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={styles.text1}>Please complete your KYC to start boooking PG</Text>
        <TouchableOpacity onPress={verifyKYC} style={styles.button}>
          <Text style={{fontSize: 16, color: colors.color_white}}>
            Start Now
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Explore')}>
          <Text>Testing Button</Text>
        </TouchableOpacity>

        <View style={{flexDirection: 'col', justifyContent: 'space-center',alignItems:'center', marginTop: 20}}>
          <Image source={require('../../assets/verification/TakeSelfie.jpg')} style={{width:258,height:184,marginBottom:20}}></Image>
          <Image source={require('../../assets/verification/Aadhar.jpg')} style={{width:258,height:184,marginTop:30}}></Image>
        </View>
      </View>
    </View>
  );
};

export default KYCverification;

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    fontWeight: 800,
    textAlign: 'center',
    margin: 20,
    color: colors.color_red_orange,
  },
  button: {
    backgroundColor: colors.color_red_orange,
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    height: 45,
    borderRadius: 8,
  },
  text1:{
    fontSize: 16,
    textAlign: 'center',
    margin: 20,
    fontWeight:600
  }
});
