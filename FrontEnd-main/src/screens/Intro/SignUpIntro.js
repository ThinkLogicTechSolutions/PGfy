import React from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import {colors} from '../../styles/Theme';
import NavigationButton from '../../components/Common/NavigationButton';

const SignUpIntro = ({navigation}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.header}>
          <Text
            style={{
              color: colors.color_purple,
              fontSize: 24,
              fontWeight: '900',
            }}>
            PGfy
          </Text>
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              gap: 20,
            }}></View>
        </View>
        <Image
          style={styles.image}
          source={require('../../assets/welcome.png')}
        />
        <Text style={styles.heading}>Welcome to PGfy</Text>
        <Text style={styles.subHeading}>
          We help you get the most out of your property, while providing a great
          experience for guests.
        </Text>

        <Text style={styles.registerText}>Register As</Text>
        <View style={styles.buttonContainer}>
          <NavigationButton
            text={'Owner'}
            onPress={() => navigation.navigate('Owner Mobile Number')}
          />
          <NavigationButton
            text={'Tenant'}
            onPress={() => navigation.navigate('Tenant Signup')}
            color={colors.color_red_orange}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <Text>Already have an account ? </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('LoginIntro')}
            style={{flexDirection: 'row'}}>
            <Text
              style={{
                color: 'red',
                textDecorationLine: 'underline',
                fontWeight: 'bold',
              }}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpIntro;

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    width: '90%',
    marginHorizontal: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
  },
  safeArea: {
    paddingTop: 15,
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollView: {
    backgroundColor: '#ffffff',
    paddingVertical: 20,
  },
  image: {
    width: '100%',
    height: 200,
    backgroundColor: '#0553',
  },
  heading: {
    textAlign: 'center',
    fontWeight: '600',
    color: colors.color_dark_black,
    fontSize: 32,
  },
  subHeading: {
    width: '90%',
    marginHorizontal: 'auto',
    textAlign: 'center',
    color: colors.color_light_black,
    fontWeight: '600',
    fontSize: 15,
  },
  registerText: {
    fontWeight: '500',
    color: colors.color_dark_black,
    textAlign: 'center',
    fontSize: 30,
    marginTop: 20,
  },
  buttonContainer: {
    display: 'flex',
    marginHorizontal: 'auto',
    gap: 10,
    marginTop: 20,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'col',
  },
});
