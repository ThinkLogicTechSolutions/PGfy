import React from 'react'; // Remove useState since we'll use Redux state
import {
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux'; // We only need useSelector here
import mini_logo from '../../assets/Logo/mini_logo.png';
import {colors} from '../../styles/Theme';

const HeaderSection = () => {
  const navigation = useNavigation();

  // Get the selected PG and owner name directly from Redux
  const selectedPG = useSelector(state => state.pgInfo.pgInfo.selectedPG);
  const pgLoading = useSelector(state => state.pgInfo.loading);
  const pgError = useSelector(state => state.pgInfo.error);
  const ownerName = useSelector(state => state.owner.ownerName);

  // Loading state
  if (pgLoading) {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.ownerName}>Loading...</Text>
      </View>
    );
  }

  // Error state
  if (pgError) {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.ownerName}>{pgError || 'Error fetching data'}</Text>
      </View>
    );
  }

  // Get PG name directly from the selected PG in Redux
  const pgName = selectedPG?.pgBuilding?.name || 'Select PG';
  const ownerNameDisplay = ownerName || 'Guest';

  return (
    <>
      <StatusBar
        backgroundColor={colors.color_dark_blue}
        barStyle="light-content"
      />
      <View style={styles.headerContainer}>
        <View>
          <Image source={mini_logo} style={styles.image_logo} />
          <TouchableOpacity>
            <Icon
              name="menu"
              size={28}
              color="#fff"
              onPress={() => navigation.navigate('Account')}
            />
          </TouchableOpacity>
        </View>

        <View>
          <Text style={styles.pgName}>{pgName}</Text>
          <Text style={styles.ownerName}>Namaste {ownerNameDisplay}!</Text>
        </View>

        <TouchableOpacity style={styles.icon}>
          <Icon name="help-circle" size={28} color="#fff" />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.color_dark_blue,
    paddingVertical: 15,
    paddingHorizontal: 20,
    paddingTop: (StatusBar.currentHeight || 20) - 20,
  },
  icon: {
    bottom: 20,
  },
  pgName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    top: 10,
    left: 10,
    marginTop: 3,
  },
  ownerName: {
    color: '#fff',
    fontSize: 18,
    marginTop: 19,
    fontWeight: '600',
    left: 10,
  },
  image_logo: {
    marginTop: 5,
    marginBottom: 5,
  },
});

export default HeaderSection;
