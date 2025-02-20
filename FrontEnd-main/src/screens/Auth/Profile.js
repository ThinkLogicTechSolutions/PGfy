import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Alert,
  Platform,
  Image,
} from "react-native";
import ModalDropdown from 'react-native-modal-dropdown';  // Import ModalDropdown
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/MaterialIcons"; // Back arrow
import Icon1 from "react-native-vector-icons/Ionicons";
import { launchImageLibrary } from 'react-native-image-picker';
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { createProfile } from "../../services/operations/TenantAPI";

const Profile = ({ navigation }) => {
  const [name, setName] = useState(""); // Add name state
  const [contactNumber, setContactNumber] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [emergencyContact, setEmergencyContact] = useState("");
  const [address, setAddress] = useState("");
  const [profession, setProfession] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [image, setImage] = useState(null); // State to hold the selected image

  // Handle image selection

  // Function to select an image
  const selectImage = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 1 }, response => {
      if (response.didCancel) {
        console.log('User canceled image picker');
      } else if (response.errorCode) {
        console.log('Image Picker Error: ', response.errorMessage);
      } else {
        setImage(response.assets[0].uri); // Set the selected image URI
      }
    });
  };

  const dispatch = useDispatch()
  const navigate = useNavigation()

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    if (
      !name ||
      !contactNumber ||
      !gender ||
      !dateOfBirth ||
      !emergencyContact ||
      !address ||
      !profession ||
      !bloodGroup
    ) {
      Alert.alert("Error", "Please fill all the fields before submitting.");
      return;
    }
    const formattedDate = dateOfBirth.toISOString().split('T')[0]; // Get the date in 'YYYY-MM-DD' format

    const formData = {
      name,
      contactNumber,
      gender,
      dateOfBirth: formattedDate,
      emergencyContact,
      address,
      profession,
      bloodGroup,
      image:"",
    };

    console.log("Form Data Submitted:", formData);

    try{

        dispatch(createProfile(name,contactNumber,gender,dateOfBirth,emergencyContact,address,profession,bloodGroup,navigation.navigate))

    }
    catch(e){
        console.log("error in profile",e.message)
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView}>
        <View>
          {/* Header */}
          <View style={[styles.headerContainer, { paddingBlock: 20, paddingBlockStart: 40 }]}>
            <View style={styles.backAndTitle}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name="arrow-back" size={24} color="white" />
              </TouchableOpacity>
              <Text style={styles.title}>My Profile</Text>
            </View>
            <TouchableOpacity onPress={() => alert("Notification clicked")}>
              <Icon1 name="notifications-outline" size={30} color="white" />
            </TouchableOpacity>
          </View>

          {/* Input Fields */}
          <View style={styles.formContainer}>
            <Text style={styles.detailText}>Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              value={name}
              onChangeText={setName}
            />

            <Text style={styles.detailText}>Contact Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter contact number"
              keyboardType="phone-pad"
              value={contactNumber}
              onChangeText={setContactNumber}
            />

            <Text style={styles.detailText}>Gender</Text>
            <View style={styles.pickerContainer}>
              <ModalDropdown
                options={['Male', 'Female', 'Other']} // Dropdown options
                onSelect={(index, value) => setGender(value)} // Handle selection
                defaultValue={gender || "Select Gender"} // Default selected value
                style={styles.dropdown}
                textStyle={styles.dropdownText}
                dropdownStyle={styles.dropdownStyle}
              />
            </View>

            <Text style={styles.detailText}>Date of Birth</Text>
            <TouchableOpacity
              style={styles.input}
              onPress={() => setShowDatePicker(true)}
            >
              <Text>{dateOfBirth.toLocaleDateString()}</Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={dateOfBirth}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false);
                  if (selectedDate) setDateOfBirth(selectedDate);
                }}
              />
            )}

            <Text style={styles.detailText}>Emergency Contact</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter emergency contact"
              keyboardType="phone-pad"
              value={emergencyContact}
              onChangeText={setEmergencyContact}
            />

            <Text style={styles.detailText}>Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter address"
              value={address}
              onChangeText={setAddress}
            />

            <Text style={styles.detailText}>Profession</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter profession"
              value={profession}
              onChangeText={setProfession}
            />

            <Text style={styles.detailText}>Blood Group</Text>
            <View style={styles.pickerContainer}>
              <ModalDropdown
                options={['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']} // Dropdown options for blood group
                onSelect={(index, value) => setBloodGroup(value)} // Handle selection
                defaultValue={bloodGroup || "Select Blood Group"} // Default selected value
                style={styles.dropdown}
                textStyle={styles.dropdownText}
                dropdownStyle={styles.dropdownStyle}
              />
            </View>

            {/* Image Upload Section */}
            <Text style={styles.detailText}>Profile Image</Text>
            <TouchableOpacity
              style={[styles.input, { alignItems: 'center' }]}
              onPress={selectImage}
            >
              {image ? (
                <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />
              ) : (
                <Text>Choose an image</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={{ color: "white", fontSize: 16 }}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scrollView: {
    backgroundColor: "#ffffff",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    backgroundColor: "#FF4B3E",
  },
  backAndTitle: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  formContainer: {
    paddingHorizontal: 16,
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    paddingHorizontal: 10,
    height: 40,
    marginBottom: 15,
    justifyContent: "center",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    marginBottom: 15,
    overflow: "hidden",
  },
  dropdown: {
    height: 40,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  dropdownText: {
    fontSize: 16,
    color: "#333",
  },
  dropdownStyle: {
    width: 200,
  },
  detailText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  submitButton: {
    backgroundColor: "#FF4B3E",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
});
