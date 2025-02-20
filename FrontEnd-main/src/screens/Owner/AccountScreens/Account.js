import Feather from 'react-native-vector-icons/Feather';
import React, { useState } from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import cutlery from '../../../assets/cutlery.png';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { colors } from '../../../styles/Theme';
import { launchImageLibrary } from 'react-native-image-picker';

const Account = () => {
  const [image, setImage] = useState(null);
  const navigation = useNavigation();

  const LogoutHandler = () => {
    Alert.alert('Confirm Logout', 'Are you sure you want to log out?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Logout Cancelled'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () =>
          navigation.reset({
            index: 0,
            routes: [{ name: 'LoginIntro' }],
          }),
      },
    ]);
  };
  

  const pickImage = async () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 300,
      quality: 1,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.error('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        setImage(response.assets[0].uri); // Save the selected image URI
      }
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.header}>
          <View style={styles.heading}>
            <View style={styles.subHeading}>
              <Feather
                name="chevron-left"
                size={24}
                color="white"
                onPress={() => {
                  navigation.navigate('Owner Dashboard');
                }}
              />
              <Text style={styles.headingText}>Account</Text>
            </View>
            <Feather name="bell" size={24} color="white" />
          </View>

          <View style={styles.container}>
            <View style={styles.profileImage}>
              <View style={styles.imageContainer}>
                {image ? (
                  <Image source={{ uri: image }} style={styles.image} />
                ) : (
                  <View style={styles.image1}></View>
                )}
              </View>
              <TouchableOpacity onPress={pickImage} style={styles.camera}>
                <Feather name="camera" size={24} color="white" />
              </TouchableOpacity>
            </View>
            <View style={styles.section}>
              <TouchableOpacity
                style={styles.subSection}
                onPress={() => {
                  navigation.navigate('My Profile');
                }}>
                <View style={styles.innerSection}>
                  <Feather name="user" size={24} color="black" />
                  <Text style={styles.subText}>My Profile</Text>
                </View>
                <Feather name="chevron-right" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.subSection}
                onPress={() => {
                  navigation.navigate('PGdetails');
                }}>
                <View style={styles.innerSection}>
                  <Feather name="home" size={24} color="black" />
                  <Text style={styles.subText}>PG details</Text>
                </View>
                <Feather name="chevron-right" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.subSection}
                onPress={() => {
                  navigation.navigate();
                }}>
                <View style={styles.innerSection}>
                  <Image source={cutlery} style={styles.foodIcon} />
                  <Text style={styles.subText}>Mess Off</Text>
                </View>
                <Feather name="chevron-right" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.subSection}
                onPress={() => {
                  navigation.navigate();
                }}>
                <View style={styles.innerSection}>
                  <Feather name="bell" size={24} color="black" />
                  <Text style={styles.subText}>Notifications</Text>
                </View>
                <Feather name="chevron-right" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.subSection}
                onPress={() => {
                  navigation.navigate('Booking History');
                }}>
                <View style={styles.innerSection}>
                  <Feather name="layers" size={24} color="black" />
                  <Text style={styles.subText}>Booking History</Text>
                </View>
                <Feather name="chevron-right" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.subSection}
                onPress={() => {
                  navigation.navigate('Payment History');
                }}>
                <View style={styles.innerSection}>
                  <Feather name="credit-card" size={24} color="black" />
                  <Text style={styles.subText}>Payment History</Text>
                </View>
                <Feather name="chevron-right" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.subSection}
                onPress={() => {
                  navigation.navigate('Enquire');
                }}>
                <View style={styles.innerSection}>
                  <Feather name="alert-circle" size={24} color="black" />
                  <Text style={styles.subText}>Recent Enquires</Text>
                </View>
                <Feather name="chevron-right" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.logout}
                onPress={() => navigation.navigate('LoginIntro')}>
                <Text style={styles.logoutText}>Logout</Text>
                <Feather
                  name="log-out"
                  size={24}
                  color="red"
                  onPress={LogoutHandler}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Account;
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.color_grey,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flex: 1,
    width: 'full',
    display: 'flex',
    flexDirection: 'column',
  },
  heading: {
    backgroundColor: colors.color_dark_blue,
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
  },
  subHeading: {
    display: 'flex',
    flexDirection: 'row',
    gap: 40,
  },
  headingText: {
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontSize: 18,
  },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  profileImage: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    gap: 5,
  },
  imageContainer: {
    width: 150,
    height: 150,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
    marginLeft: 40,
  },
  image: {
    borderRadius: 100,
    width: 120,
    height: 120,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 'auto',
    marginVertical: 'auto',
  },
  image1: {
    backgroundColor: colors.color_grey,
    width: 120,
    height: 120,
    marginHorizontal: 'auto',
    marginVertical: 'auto',
    borderRadius: 100,
  },
  camera: {
    backgroundColor: colors.color_dark_black,
    width: 35,
    height: 35,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: colors.color_white,
    gap: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    paddingBottom: 20,
    marginTop: 30,
  },
  subSection: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 20,
    justifyContent: 'space-between',
  },
  innerSection: {
    display: 'flex',
    flexDirection: 'row',
    gap: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subText: {
    fontSize: 15,
    fontWeight: '400',
  },
  foodIcon: {
    width: 24,
    height: 24,
  },
  logout: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 20,
  },
  logoutText: {
    fontSize: 17,
    fontWeight: '400',
  },
});
