import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {PGdetails, GetOwnerDetails} from '../../services/operations/OwnerAPI';
import {fetchPGDetailsSuccess,setSelectedPG} from '../../reducer/slices/pgSlice';
import HeaderSection from '../../components/Owner/Header';
import FooterSection from '../../components/Owner/Footer';
import Icon from 'react-native-vector-icons/Ionicons';
import {TextInput} from 'react-native-gesture-handler';
import qr_scan from '../../assets/Owner/body/qr_code_scanner.png';
import {colors} from '../../styles/Theme';
import {useToast} from 'react-native-toast-notifications';

const Dashboard = ({navigation}) => {
  const dispatch = useDispatch();
  const toast = useToast();

  const [isInitialDataLoaded, setIsInitialDataLoaded] = useState(false);
  const { pgDetails, loading, error, selectedPG, pgName } = useSelector(state => state.pgInfo.pgInfo);
  // const pgName = useSelector(state => state.pgInfo.pgInfo.pgName);
  // const selectedPG = useSelector(state => state.pgInfo.pgInfo.selectedPG);
  const ownerName = useSelector(state => state.owner.ownerName);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        if (!isInitialDataLoaded) {
          const pgData = await dispatch(PGdetails(navigation, toast));

          if (pgData && Array.isArray(pgData) && pgData.length > 0) {
            dispatch(fetchPGDetailsSuccess(pgData));
            if (pgData[0]?.pgBuilding?.ownerId) {
              await dispatch(
                GetOwnerDetails(
                  pgData[0].pgBuilding.ownerId,
                  navigation,
                  toast,
                ),
              );
            }

            setIsInitialDataLoaded(true);
          } else {
            console.log('No PG data found or invalid data structure');
          }
        }
      } catch (error) {
        console.error('Error in fetchInitialData:', error);
      }
    };

    fetchInitialData();
  }, [dispatch, navigation, isInitialDataLoaded]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if ((!pgDetails || pgDetails.length === 0) && isInitialDataLoaded) {
        dispatch(PGdetails(navigation, toast));
      }
    });

    return unsubscribe;
  }, [navigation, pgDetails, isInitialDataLoaded]);

  const handleSelectPG = pg => {
    if (pg?.pgBuilding?.name) {
      dispatch(setSelectedPG(pg));

      if (pg.pgBuilding?.ownerId) {
        dispatch(GetOwnerDetails(pg.pgBuilding.ownerId, navigation, toast));
      }
    }
  };
  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: '#F5F5F5'}}>
      <HeaderSection ownerName={ownerName} pgName={pgName} />

      <ScrollView
        contentContainerStyle={styles.bodyContainer}
        showsVerticalScrollIndicator={false}>
        {/* PG Selection */}
        <View style={styles.pgSelectionContainer}>
          <Text style={styles.selectionTitle}>Your Building:</Text>
          {Array.isArray(pgDetails) && pgDetails.length > 0 ? (
            pgDetails.map((pg, index) => (
              <TouchableOpacity
                key={pg.pgBuilding?.id || `pg-${index}`}
                onPress={() => handleSelectPG(pg)}
                style={[
                  styles.pgButton,
                  pg.pgBuilding?.name === pgName && styles.selectedPgButton,
                ]}>
                <Text
                  style={[
                    styles.pgButtonText,
                    pg.pgBuilding?.name === pgName &&
                      styles.selectedPgButtonText,
                  ]}>
                  {pg.pgBuilding?.name || 'Unnamed PG'}
                </Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text>No PG details available</Text>
          )}
        </View>

        {/* Summary Section */}
        {selectedPG && (
          <View style={styles.summaryContainer}>
            <View style={styles.summaryBox}>
              <Icon name="bed" size={24} color="#777" />
              <Text style={styles.summaryNumber}>
                {selectedPG?.summary?.totalBeds || 0}
              </Text>
              <Text style={styles.summaryLabel}>Total Beds</Text>
            </View>
            <View style={styles.summaryBox}>
              <Icon name="checkmark-circle" size={24} color="#777" />
              <Text style={styles.summaryNumber}>
                {selectedPG?.summary?.occupiedBeds || 0}
              </Text>
              <Text style={styles.summaryLabel}>Occupied Beds</Text>
            </View>
            <View style={styles.summaryBox}>
              <Icon name="bed-outline" size={24} color="#777" />
              <Text style={styles.summaryNumber}>
                {selectedPG?.summary?.vacantBeds || 0}
              </Text>
              <Text style={styles.summaryLabel}>Vacant Beds</Text>
            </View>
            <View style={styles.summaryBox}>
              <Icon name="stats-chart" size={24} color="#777" />
              <Text style={styles.summaryNumber}>
                {selectedPG?.summary?.occupancyRate || '0.00%'}
              </Text>
              <Text style={styles.summaryLabel}>Occupancy Rate</Text>
            </View>
          </View>
        )}

        {/* Booking Section */}
        <View style={styles.bookingContainer}>
          <Text style={styles.bookingText}>Confirm Booking Here</Text>
          <TouchableOpacity style={styles.scanButton}>
            <Image source={qr_scan} />
            <Text style={styles.scanButtonText}>Scan QR</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <FooterSection navigation={navigation} />
    </View>
  );
};

export default Dashboard;
const styles = StyleSheet.create({
  bodyContainer: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 50,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    height: 45,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    padding: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
    textAlign: 'center',
  },
  bookingContainer: {
    backgroundColor: '#E3F2FD',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  scanButton: {
    flexDirection: 'row',
    backgroundColor: colors.color_dark_blue,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: 246,
    height: 49,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  pgSelectionContainer: {
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  summaryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  summaryBox: {
    width: '45%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#777',
    marginTop: 4,
  },
  summaryNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.color_dark_blue,
  },
  pgButton: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    width: '80%',
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  selectedPgButton: {
    backgroundColor: colors.color_dark_blue,
  },
  selectedPgButtonText: {
    color: '#fff',
  },
});
