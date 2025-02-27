import React, { useState } from "react";
import BasicImg from "../../assets/Owner/BasicInfo.png";
import { useForm, Controller } from "react-hook-form";
import { colors } from "../../styles/Theme";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Icon1 from "react-native-vector-icons/FontAwesome6";
import {useDispatch} from 'react-redux';
import {useToast} from 'react-native-toast-notifications';
import {OwnerSignup1} from '../../services/operations/AuthAPI';

const OwnerSignup = ({ navigation }) => {
  const [secureTextPassword, setSecureTextPassword] = useState(true);
  const [secureTextConfirmPassword, setSecureTextConfirmPassword] = useState(true);
  const dispatch = useDispatch();
  const toast = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = async data => {
    const formData = {
      ...data,
      accountType: "Owner",
    };
    console.log(formData);
    const response = await dispatch(
      OwnerSignup1(
        formData.email,
        formData.phone,
        formData.password,
        formData.fullName,
        // formData.countryCode,
        navigation,
        toast,
        dispatch
      ),
    );
    if(!response){
      Alert.alert('Error', 'Signup Failed');
    }

  };

  const handlePrevious = () => {
    console.log("Previous pressed");
    navigation.navigate("Owner Mobile Number");
  };
  const handleBackPress = () => {
    console.log("Back button pressed");
    navigation.goBack();
  };
  const password = watch("password");
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <Icon name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text
            style={{
              color: colors.color_purple,
              fontSize: 24,
              fontWeight: "700",
              marginTop: 20,
              marginLeft: 125,
            }}
          >
            PGfy
          </Text>
          <Image source={BasicImg} style={styles.image} />

          <View style={styles.headerContainer}>
            <Text style={styles.headertext}>
              Provide your basic information
            </Text>
          </View>

          {/* Full Name */}
          <View>
            <Text style={{ marginTop: 19, fontSize: 16, fontWeight: "600" }}>
              Full Name
              <Text style={{ color: "red" }}>*</Text>
            </Text>

            <Controller
              control={control}
              name="fullName"
              rules={{ required: "Full name is required" }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Full Name"
                  placeholderTextColor={colors.color_light_black}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
              )}
            />
            {errors.fullName && (
              <Text style={styles.errorText}>{errors.fullName.message}</Text>
            )}
          </View>

          {/* Email */}
          <View>
            <Text style={{ marginTop: 5, fontSize: 16, fontWeight: "600" }}>
              Email
              <Text style={{ color: "red" }}>*</Text>
            </Text>
            <Controller
              control={control}
              name="email"
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Email Address"
                  placeholderTextColor={colors.color_light_black}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
              )}
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email.message}</Text>
            )}
          </View>

          {/* Phone Details */}
          <View>
            <Text style={{ marginTop: 5, fontSize: 16, fontWeight: "600" }}>
              Phone Number
              <Text style={{ color: "red" }}>*</Text>
            </Text>
            <View style={styles.phonedetailsContainer}>
              <Controller
                control={control}
                name="countryCode"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.input2}
                    placeholder="+91"
                    placeholderTextColor={colors.color_light_black}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    readOnly={true}
                  />
                )}
              />
              <Controller
                control={control}
                name="phone"
                rules={{ required: "Phone number is required" }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.input3}
                    placeholder="Phone Number"
                    placeholderTextColor={colors.color_light_black}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
            </View>
            {errors.phone && (
              <Text style={styles.errorText}>{errors.phone.message}</Text>
            )}
          </View>

          <View style={styles.passwordContainer}>
            {/* Password */}
            <Text style={{ marginTop: 3, fontSize: 16, fontWeight: "600" }}>
              Password
              <Text style={{ color: "red" }}>*</Text>
            </Text>
            <Controller
              control={control}
              name="password"
              rules={{
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View>
                  <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor={colors.color_light_black}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    secureTextEntry={secureTextPassword}
                  />
                  <TouchableOpacity
                    style={styles.iconContainer}
                    onPress={() => setSecureTextPassword(!secureTextPassword)}
                  >
                    <Icon1
                      name={secureTextPassword ? "eye-slash" : "eye"}
                      size={20}
                      color="#adb5bd"
                    />
                  </TouchableOpacity>
                </View>
              )}
            />
            {errors.password && (
              <Text style={styles.errorText}>{errors.password.message}</Text>
            )}

            {/* Confirm Password */}
            <Text style={{ marginTop: 3, fontSize: 16, fontWeight: "600" }}>
              Confirm Password
              <Text style={{ color: "red" }}>*</Text>
            </Text>

            <Controller
              control={control}
              name="confirmPassword"
              rules={{
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View>
                  <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    placeholderTextColor={colors.color_light_black}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    secureTextEntry={secureTextConfirmPassword}
                  />
                  <TouchableOpacity
                    style={styles.iconContainer}
                    onPress={() =>
                      setSecureTextConfirmPassword(!secureTextConfirmPassword)
                    }
                  >
                    <Icon1
                      name={secureTextConfirmPassword ? "eye-slash" : "eye"}
                      size={20}
                      color="#adb5bd"
                    />
                  </TouchableOpacity>
                </View>
              )}
            />
            {errors.confirmPassword && (
              <Text style={styles.errorText}>
                {errors.confirmPassword.message}
              </Text>
            )}
          </View>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.button1]}
              onPress={handlePrevious}
            >
              <Text style={styles.buttonText}>Previous</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.button2]}
              onPress={handleSubmit(onSubmit)}
            >
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default OwnerSignup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 15,
    zIndex: 10,
  },
  image: {
    top: 25,
    width: "100%",
    height: 200,
    backgroundColor: "#0553",
  },
  headerContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  headertext: {
    top: 30,
    fontSize: 22,
    fontWeight: "600",
  },
  input: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#727070",
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
    fontWeight: "600",
    color: '#000',
  },
  errorText: {
    color: "red",
  },
  input2: {
    width: 77,
    height: 43.72,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#727070",
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
    fontWeight: "600",
    
  },
  input3: {
    left: 3,
    marginTop: 10,
    width: 239.57,
    height: 43.72,
    borderWidth: 1,
    borderColor: "#727070",
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
    fontWeight: "600",
  },
  phonedetailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconContainer: {
    position: "absolute",
    right: 10,
    zIndex: 10,
    elevation: 100,
    marginTop: 24,
  },
  passwordContainer: {
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "center",
    paddingBottom: 20,
  },

  button: {
    width: 162,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.color_dark_blue,
    borderRadius: 8,
    marginHorizontal: 10,
  },
  buttonText: {
    color: colors.color_white,
    fontSize: 16,
    fontWeight: "bold",
  },
});
