import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useToast} from 'react-native-toast-notifications';
import {GetPG} from '../../../services/operations/OwnerAPI';

import {colors} from '../../../styles/Theme';

const PGdetails = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const toast = useToast();
  const pgDetails = useSelector(state => state.pgInfo.pgInfo.pgDetails);

  useEffect(() => {
    const fetchPGDetails = async () => {
      try {
        setLoading(true);
        await dispatch(GetPG({}, navigation, toast));
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPGDetails();
  }, [dispatch, navigation, toast]);


  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text>Loading PG details...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>PG Building's</Text>

      {pgDetails && Array.isArray(pgDetails) && pgDetails.length > 0 ? (
        pgDetails.map((pg, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.cardTitle}>PG Building Details</Text>
            <Text style={styles.detail}>Name: {pg.name}</Text>
            <Text style={styles.detail}>Address: {pg.streetName}</Text>
            <Text style={styles.detail}>Landmark: {pg.landmark}</Text>
            <Text style={styles.detail}>City: {pg.city}</Text>
            <Text style={styles.detail}>State: {pg.state}</Text>
            <Text style={styles.detail}>Pincode: {pg.locationCoordinates}</Text>
            <Text style={styles.detail}>Gender: {pg.genderType}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.navigate('Room Chart', {pgBuildingId: pg.id});
              }}>
              <Text style={styles.buttonText}>Vacancy Overview</Text>
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <Text>No PG details available</Text>
      )}

      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8f9fa',
    flexGrow: 1,
  },
  header: {
    marginTop: 25,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  detail: {
    fontSize: 16,
    marginBottom: 4,
  },

    button: {
      backgroundColor: colors.color_dark_blue,
      padding: 12,
      borderRadius: 5,
      width: 185,
      marginLeft:55,
      alignItems: 'center',
    },

  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: 'red',
    fontSize: 18,
  },
});

export default PGdetails;
