import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {useToast} from 'react-native-toast-notifications';
import {colors} from '../../../styles/Theme';
import {GetRoomChart} from '../../../services/operations/OwnerAPI'; // adjust path as needed

import vacantCotImage from '../../../assets/Owner/greenbed.png';
import occupiedCotImage from '../../../assets/Owner/redbed.png';

const RoomChart = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const toast = useToast();
  const {pgBuildingId} = route.params || {};
  const [expandedFloors, setExpandedFloors] = useState({});

  // Get data from Redux store
  const roomChart = useSelector(state => state.pgInfo.pgInfo.roomChart);
  const loading = useSelector(state => state.pgInfo.loading);
  const error = useSelector(state => state.pgInfo.error);

  useEffect(() => {
    if (!pgBuildingId) {
      toast.show('PG Building ID is missing!', {type: 'danger'});
      return;
    }

    dispatch(GetRoomChart(pgBuildingId, navigation, toast));
  }, [pgBuildingId, dispatch]);

  useEffect(() => {
    if (roomChart.length > 0) {
      const initialExpandedState = {};
      roomChart.forEach(floor => {
        initialExpandedState[floor.floorNumber] = true;
      });
      setExpandedFloors(initialExpandedState);
    }
  }, [roomChart]);

  const toggleFloor = floorNumber => {
    setExpandedFloors(prevState => ({
      ...prevState,
      [floorNumber]: !prevState[floorNumber],
    }));
  };

  // Your existing renderRooms function remains the same
  const renderRooms = (floor) => {
    const isExpanded = expandedFloors[floor.floorNumber];
  
    return (
      <View key={floor.floorNumber} style={styles.floorContainer}>
        <TouchableOpacity
          style={styles.floorHeader}
          onPress={() => toggleFloor(floor.floorNumber)}>
          <Text style={styles.floorTitle}>Floor {floor.floorNumber}</Text>
          <Text style={styles.expandIcon}>{isExpanded ? '−' : '+'}</Text>
        </TouchableOpacity>
        {isExpanded && (
          <View style={styles.roomsContainer}>
            {floor.rooms.map((room, index) => {
              // Generate the room number dynamically
              const roomNumber = `${floor.floorNumber}${(index + 1)
                .toString()
                .padStart(2, '0')}`;
  
              return (
                <View key={room.roomNumber} style={styles.roomContainer}>
                  <Text style={styles.roomTitle}>Room {roomNumber}</Text>
                  <View style={styles.bedsContainer}>
                    {room.cots.map((cot) => (
                      <View key={cot.cotNumber} style={styles.bed}>
                        <Image
                          source={
                            cot.isOccupied ? occupiedCotImage : vacantCotImage
                          }
                          style={styles.bedImage}
                          resizeMode="contain"
                        />
                        <Text style={styles.bedText}>{cot.cotNumber}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              );
            })}
          </View>
        )}
      </View>
    );
  };
  

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  if (!roomChart.length) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          No data available for this PG building.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Vacancy Overview</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        {roomChart.map(renderRooms)}
      </ScrollView>

      <TouchableOpacity
        style={styles.updateButton}
        onPress={() => dispatch(GetRoomChart(pgBuildingId, navigation, toast))}>
        <Text style={styles.updateButtonText}>Update</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RoomChart;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f8f9fa',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.color_dark_blue,
      height: 50,
      paddingHorizontal: 10,
    },
    backArrow: {
      fontSize: 22,
      color: '#fff',
      marginLeft: 10,
    },
    title: {
      fontSize: 18,
      color: '#fff',
      fontWeight: 'bold',
      marginLeft: 30,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    errorText: {
      color: 'red',
      fontSize: 16,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptyText: {
      fontSize: 16,
      color: '#333',
    },
    scrollView: {
      paddingHorizontal: 10,
      marginTop: 10,
    },
    floorContainer: {
      marginBottom: 20,
    },
    floorHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#e6e6e6',
      padding: 10,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#ccc',
    },
    floorTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      
    },
    expandIcon: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
    },
    roomsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-evenly',
      gap: 10,
    },
    roomContainer: {
      width: '30%',
      minWidth: 100,
      padding: 10,
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 5,
      marginBottom: 10,
    },
    roomTitle: {
      fontSize: 12,
      fontWeight: 'bold',
      marginBottom: 5,
      textAlign: 'center',
    },
    bedsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: 5,
    },
    bed: {
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 5,
    },
    bedImage: {
      width: 25,
      height: 25,
    },
    bedText: {
      marginTop: 5,
      color: '#333',
      fontSize: 10,
      textAlign: 'center',
    },
    updateButton: {
      backgroundColor: colors.color_dark_blue,
      padding: 10,
      alignItems: 'center',
      margin: 20,
      borderRadius: 5,
    },
    updateButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
  
