import React, {useState} from 'react';
import {
  Image,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Modal,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useForm, Controller} from 'react-hook-form';
import {CheckBox, Button} from 'react-native-elements';
import {RadioButton} from 'react-native-paper';
import {colors} from '../../styles/Theme';
import MenImg from '../../assets/Owner/mdi_men.png';
import WomenImg from '../../assets/Owner/Women.png';
import CoEdImg from '../../assets/Owner/Co-ed.png';
import plusImg from '../../assets/Owner/plus.png';
import {useDispatch, useSelector} from 'react-redux';
import {finalSubmitPGInfo} from '../../services/operations/OwnerAPI';
import {useToast} from 'react-native-toast-notifications';
import { useNavigation } from '@react-navigation/native';



const PGamenities = () => {
  const {control, handleSubmit, setValue} = useForm({
    defaultValues: {
      typeOfPG: 'Male',
      servicesOffered: [],
      specialAmenities: [],
    },
  });
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const toast = useToast();
  const pgInfo = useSelector(state => state.pgInfo);

  const [services, setServices] = useState([
    'Wi-fi',
    'Meal',
    'Laundry',
    'House keeping',
    'Furnished rooms',
    'Common area',
    'Security guard',
    'CCTV',
  ]);

  const [amenities, setAmenities] = useState([
    'Gym',
    'Parking',
    'Air conditioning',
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [currentField, setCurrentField] = useState('');
  const [newItem, setNewItem] = useState('');
  const [newServices, setNewServices] = useState([]);
  const [newAmenities, setNewAmenities] = useState([]);

  const onSubmit = async data => {
    const amenities = {
      typeOfPG: data.typeOfPG,
      servicesOffered: [...data.servicesOffered, ...newServices],
      specialAmenities: [...data.specialAmenities, ...newAmenities],
      extraItems: [...newServices, ...newAmenities],
    };
  
    const combinedPGInfo = {
      ...pgInfo.pgInfo.basicDetails,
      ...pgInfo.pgInfo.roomDetails,
      amenities: amenities,
    };
    console.log(amenities);
  
    console.log("Sending to API:", combinedPGInfo);
  
    await dispatch(finalSubmitPGInfo(combinedPGInfo, navigation, toast));
  };
  

  const handlePrevious = () => {
    console.log('Previous pressed');
    navigation.navigate('PGrooms');
  };

  const handleCheckboxChange = (arrayName, item) => {
    setValue(arrayName, prev => {
      const updatedValue = prev.includes(item)
        ? prev.filter(existingItem => existingItem !== item)
        : [...prev, item];
      return updatedValue;
    });
  };

  const handleAddItem = () => {
    if (newItem.trim()) {
      if (currentField === "services") {
        setServices((prev) => [...prev, newItem.trim()]);
      } else if (currentField === "amenities") {
        setAmenities((prev) => [...prev, newItem.trim()]);
      }
      setNewItem("");
      setModalVisible(false);
    } else {
      alert("Please enter a valid item.");
    }
  };
  

  const handleBackPress = () => {
    console.log('Back button pressed');
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <Icon name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
      <Text
        style={{
          color: colors.color_purple,
          fontSize: 24,
          fontWeight: '700',
          marginTop: 20,
          marginLeft: 125,
        }}>
        PGfy
      </Text>
      <Text style={styles.heading}>Provide Amenities information</Text>

      {/* Type of PG */}
      <Text style={styles.subheading}>
        Type of PG (Select who your PG accommodates)
      </Text>
      <Controller
        control={control}
        name="typeOfPG"
        render={({field: {onChange, value}}) => (
          <View style={styles.radioContainer}>
            {['Male', 'Female', 'Coed'].map(type => (
              <View key={type} style={styles.radioButton}>
                <RadioButton
                  value={type}
                  status={value === type ? 'checked' : 'unchecked'}
                  onPress={() => onChange(type)}
                />
                <Image
                  source={
                    type === 'Male'
                      ? MenImg
                      : type === 'Female'
                      ? WomenImg
                      : CoEdImg
                  }
                />
                <Text style={styles.radioText}>{type}</Text>
              </View>
            ))}
          </View>
        )}
      />

      {/* Services Offered */}
      <View style={styles.sectionHeader}>
        <Text style={styles.subheading2}>Services Offered</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            setCurrentField('services');
            setModalVisible(true);
          }}>
          <Image source={plusImg} style={styles.plusicon} />
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <Controller
        style={{width: '100%'}}
        control={control}
        name="servicesOffered"
        render={({field: {value = [], onChange}}) => (
          <View>
            {services.map(service => (
              <CheckBox
                key={service}
                title={service}
                checked={value.includes(service)}
                onPress={() => {
                  const updatedValue = value.includes(service)
                    ? value.filter(item => item !== service)
                    : [...value, service];
                  onChange(updatedValue);
                }}
                containerStyle={styles.checkboxContainer}
                textStyle={styles.checkboxText}
              />
            ))}
          </View>
        )}
      />

      {/* Special Amenities */}
      <View style={styles.sectionHeader}>
        <Text style={styles.subheading2}>Special Amenities</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            setCurrentField('amenities');
            setModalVisible(true);
          }}>
          <Image source={plusImg} style={styles.plusicon} />
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <Controller
        control={control}
        name="specialAmenities"
        render={({field: {value = [], onChange}}) => (
          <View>
            {amenities.map(amenity => (
              <CheckBox
                key={amenity}
                title={amenity}
                checked={value.includes(amenity)}
                onPress={() => {
                  const updatedValue = value.includes(amenity)
                    ? value.filter(item => item !== amenity)
                    : [...value, amenity];
                  onChange(updatedValue);
                }}
                containerStyle={styles.checkboxContainer}
                textStyle={styles.checkboxText}
              />
            ))}
          </View>
        )}
      />

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button]} onPress={handlePrevious}>
          <Text style={styles.buttonText}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button]}
          onPress={handleSubmit(onSubmit)}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>

      {/* Modal for Adding New Items */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeading}>
              Add a new {currentField === 'services' ? 'Service' : 'Amenity'}
            </Text>
            <TextInput
              style={styles.modalInput}
              placeholder={`Enter new ${
                currentField === 'services' ? 'service' : 'amenity'
              }`}
              value={newItem}
              onChangeText={setNewItem}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButtonCancel]}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButtonAdd]}
                onPress={handleAddItem}>
                <Text style={styles.buttonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default PGamenities;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: '100%',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    left: 5,
    top: 40,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 15,
    zIndex: 10,
  },
  checkboxContainer: {
    top: 15,
    flexDirection: 'row',
    marginTop: -8,
  },
  checkboxText: {
    fontSize: 15,
  },
  subheading: {fontSize: 13.7, fontWeight: '600', top: 28},
  subheading2: {fontSize: 16, fontWeight: '600', top: 15},
  sectionHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  addButton: {padding: 5, top: 5, right: 10},
  addButtonText: {color: colors.color_light_black, fontSize: 18},
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
  button: {
    width: 100,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.color_dark_blue,
    borderRadius: 8,
    marginHorizontal: 10,
  },
  buttonText: {
    color: colors.color_white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  radioContainer: {
    top: 38,
    flexDirection: 'column',
    alignItems: 'left',
    marginBottom: 20,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  radioText: {
    fontSize: 16,
  },
  checkboxes: {
    height: 16,
    width: 45,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    margin: 20,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalHeading: {fontSize: 18, fontWeight: 'bold', marginBottom: 10},
  modalInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    width: '100%',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    height: 44,
  },
  modalButtonCancel: {
    width: 132,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.color_dark_black,
    borderRadius: 8,
    marginHorizontal: 10,
  },
  modalButtonAdd: {
    width: 132,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.color_dark_blue,
    borderRadius: 8,
    marginHorizontal: 10,
  },
  plusicon: {
    right: 25,
    top: 23,
  },
});
