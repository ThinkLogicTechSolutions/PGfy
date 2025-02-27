import React, {useState} from 'react';
import PGroomsImg from '../../assets/Owner/PGrooms.png';
import {useForm} from 'react-hook-form';
import {colors} from '../../styles/Theme';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {setPgCreateStep, submitRoomDetails} from '../../reducer/slices/pgSlice';
import {useDispatch} from 'react-redux';

const PGrooms = ({route, navigation}) => {
  const dispatch = useDispatch();
  const {
    formState: {errors},
  } = useForm();
  const [floors, setFloors] = useState([]);
  const [pricing, setPricing] = useState({
    nonAcRoomPricing: {
      oneSeater: '',
      twoSeater: '',
      threeSeater: '',
      fourSeater: '',
      fiveSeater: '',
      sixSeater: '',
    },
    acRoomPricing: {
      oneSeater: '',
      twoSeater: '',
      threeSeater: '',
      fourSeater: '',
      fiveSeater: '',
      sixSeater: '',
    },
  });

  const addFloor = () => {
    setFloors([...floors, {rooms: []}]);
  };

  const removeFloor = floorIndex => {
    const updatedFloors = [...floors];
    updatedFloors.splice(floorIndex, 1);
    setFloors(updatedFloors);
  };

  const addRoom = floorIndex => {
    const updatedFloors = [...floors];
    updatedFloors[floorIndex].rooms.push({
      beds: '',
      cots: [],
      isAC: false,
      seater: null,  // Added seater type for the room
    });
    setFloors(updatedFloors);
  };

  const removeRoom = (floorIndex, roomIndex) => {
    const updatedFloors = [...floors];
    updatedFloors[floorIndex].rooms.splice(roomIndex, 1);
    setFloors(updatedFloors);
  };

  const updateBeds = (floorIndex, roomIndex, value) => {
    const updatedFloors = [...floors];
    const bedsCount = parseInt(value, 10) || 0;

    // Determine the SeaterType based on the number of cots
    let seaterType = null;
    if (bedsCount === 1) seaterType = 'OneSeater';
    else if (bedsCount === 2) seaterType = 'TwoSeater';
    else if (bedsCount === 3) seaterType = 'ThreeSeater';
    else if (bedsCount === 4) seaterType = 'FourSeater';
    else if (bedsCount === 5) seaterType = 'FiveSeater';
    else if (bedsCount === 6) seaterType = 'SixSeater';

    updatedFloors[floorIndex].rooms[roomIndex].beds = value;
    updatedFloors[floorIndex].rooms[roomIndex].cots = Array.from(
      {length: bedsCount},
      (_, i) => `Cot-${i + 1}`,
    );
    updatedFloors[floorIndex].rooms[roomIndex].seater = seaterType;  // Set the calculated SeaterType

    setFloors(updatedFloors);
  };

  const toggleAC = (floorIndex, roomIndex) => {
    const updatedFloors = [...floors];
    updatedFloors[floorIndex].rooms[roomIndex].isAC =
      !updatedFloors[floorIndex].rooms[roomIndex].isAC;
    setFloors(updatedFloors);
  };

  const updatePricing = (type, seater, value) => {
    setPricing(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        [seater]: value,
      },
    }));
  };

  const handleBackPress = () => {
    console.log('Back button pressed');
    navigation.goBack();
  };

  const onSubmit = async () => {
    const preparedFloors = floors.map(floor => ({
      rooms: floor.rooms.map(room => ({
        cots: room.cots,
        isAC: room.isAC,
        seater: room.seater, // Include the SeaterType here
      })),
    }));

    const roomDetails = {
      floors: preparedFloors,
      nonAcRoomPricing: pricing.nonAcRoomPricing,
      acRoomPricing: pricing.acRoomPricing,
    };

    console.log('Prepared data for backend:', JSON.stringify(roomDetails));
    await dispatch(submitRoomDetails(roomDetails));
    setFloors([]);
    await dispatch(setPgCreateStep(3));
  };

  const renderPricingSection = (type, title) => (
    <View style={styles.pricingContainer}>
      <Text style={styles.pricingTitle}>{title}</Text>
      <View style={styles.pricingGrid}>
        {Object.entries(pricing[type]).map(([seater, price]) => (
          <View key={seater} style={styles.pricingItem}>
            <Text style={styles.seaterText}>
              {seater
                .replace(/([A-Z])/g, ' $1')
                .toLowerCase()
                .replace(/^./, str => str.toUpperCase())}
            </Text>
            <TextInput
              style={styles.pricingInput}
              placeholder="Price"
              keyboardType="numeric"
              value={price}
              onChangeText={value => updatePricing(type, seater, value)}
            />
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={PGroomsImg} style={styles.image} />
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Provide your PG information</Text>
        </View>

        {/* Pricing Section */}
        <View style={styles.pricingSectionContainer}>
          <Text style={styles.sectionHeader}>Room Pricing Details</Text>
          {renderPricingSection('nonAcRoomPricing', 'Non-AC Room Pricing')}
          {renderPricingSection('acRoomPricing', 'AC Room Pricing')}
        </View>

        {floors.map((floor, floorIndex) => (
          <View key={floorIndex} style={styles.floorContainer}>
            <View style={styles.floorHeaderContainer}>
              <Text style={styles.floorHeader}>Floor {floorIndex + 1}</Text>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => removeFloor(floorIndex)}>
                <Icon name="trash" size={24} color="red" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.addButton}
              onPress={() => addRoom(floorIndex)}>
              <Text style={styles.addButtonText}>+ Add Room</Text>
            </TouchableOpacity>

            {floor.rooms.map((room, roomIndex) => (
              <View key={roomIndex} style={styles.roomContainer}>
                <Text style={styles.roomText}>Room {roomIndex + 1}</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Number of beds"
                  keyboardType="numeric"
                  value={room.beds}
                  onChangeText={value =>
                    updateBeds(floorIndex, roomIndex, value)
                  }
                />

                <TouchableOpacity
                  style={[
                    styles.toggleButton,
                    room.isAC && styles.toggleButtonActive,
                  ]}
                  onPress={() => toggleAC(floorIndex, roomIndex)}>
                  <Text style={styles.toggleButtonText}>AC</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => removeRoom(floorIndex, roomIndex)}>
                  <Icon name="trash" size={20} color="red" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ))}

        <TouchableOpacity style={styles.addFloorButton} onPress={addFloor}>
          <Text style={styles.addFloorText}>+ Add Floor</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.submitButton} onPress={onSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.color_white,
    padding: 10,
    width: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 15,
    zIndex: 10,
  },
  logoText: {
    color: colors.color_purple,
    fontSize: 24,
    fontWeight: '700',
    marginTop: 20,
    textAlign: 'center',
  },
  image: {
    alignSelf: 'center',
    width: 280,
    height: 280,
    marginBottom: 20,
    marginTop: 25,
  },
  headerContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  headerText: {
    fontSize: 22,
    fontWeight: '600',
  },
  pricingSectionContainer: {
    marginVertical: 20,
    padding: 15,
    backgroundColor: colors.color_white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
    color: colors.color_dark_black,
    textAlign: 'center',
  },
  pricingContainer: {
    marginVertical: 10,
  },
  pricingTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: colors.color_purple,
  },
  pricingGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  pricingItem: {
    width: '48%',
    marginBottom: 10,
  },
  seaterText: {
    fontSize: 14,
    marginBottom: 5,
    color: colors.color_dark_black,
  },
  pricingInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    fontSize: 14,
  },
  floorContainer: {
    width: '100%',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 8,
  },
  floorHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  floorHeader: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    flex: 1,
  },
  roomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  roomText: {
    fontSize: 16,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    width: '50%',
  },
  toggleButton: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    color: colors.color_dark_black,
  },
  toggleButtonActive: {
    backgroundColor: colors.color_red_orange,
    borderColor: colors.color_red_orange,
    color: 'white',
  },
  toggleButtonText: {
    fontWeight: '700',
  },
  addButton: {
    alignSelf: 'flex-start',
    marginVertical: 5,
  },
  addButtonText: {
    color: colors.color_purple,
    fontSize: 16,
    fontWeight: '600',
  },
  deleteButton: {
    marginLeft: 10,
  },
  addFloorButton: {
    backgroundColor: colors.color_purple,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  addFloorText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: colors.color_dark_blue,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default PGrooms;
