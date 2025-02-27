import React, {useState, useEffect} from 'react';
import PGinfo from '../../assets/Owner/PGinfo.png';
import {useForm, Controller} from 'react-hook-form';
import {useFocusEffect} from '@react-navigation/native';
import {colors} from '../../styles/Theme';
import {useDispatch} from 'react-redux';
import {useToast} from 'react-native-toast-notifications';
import {submitBasicDetails, setPgCreateStep} from '../../reducer/slices/pgSlice';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const PGinfoScreen = ({navigation}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm();
  const dispatch = useDispatch();
  const toast = useToast();

  useFocusEffect(
    React.useCallback(() => {
      reset();
      return () => {};
    }, [reset]),
  );

  const handlePrevious = () => {
    console.log('Previous pressed');
    navigation.navigate('Owner Signup');
    };

  const onSubmit = async data => {
    console.log("INFO DATA", data);
    dispatch(submitBasicDetails(data));
    dispatch(setPgCreateStep(2));
  };
  

  const handleBackPress = () => {
    console.log('Back button pressed');
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity> */}
        {/* <Text
          style={{
            color: colors.color_purple,
            fontSize: 24,
            fontWeight: '700',
            marginTop: 20,
            marginLeft: 125,
          }}>
          PGfy
        </Text> */}
        <Image source={PGinfo} style={styles.image} />
        <View style={styles.headerContainer}>
          <Text style={styles.headertext}>Provide your PG information</Text>
        </View>

        {/* PG NAME */}
        <Text style={styles.label}>
          PG Name<Text style={styles.required}>*</Text>
        </Text>
        <Controller
          control={control}
          name="pgName"
          rules={{required: 'PG Name is required.'}}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={[styles.input, errors.pgName && styles.errorInput]}
              placeholder="PG Name"
              placeholderTextColor={colors.color_light_black}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />
        {errors.pgName && (
          <Text style={styles.errorText}>{errors.pgName.message}</Text>
        )}

        {/* BUILDING NUMBER */}
        <Text style={styles.label}>
          Building Number<Text style={styles.required}>*</Text>
        </Text>
        <Controller
          control={control}
          name="buildingNumber"
          rules={{required: 'Building Number is required.'}}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={[styles.input, errors.buildingNumber && styles.errorInput]}
              placeholder="Building Number"
              placeholderTextColor={colors.color_light_black}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />
        {errors.buildingNumber && (
          <Text style={styles.errorText}>{errors.buildingNumber.message}</Text>
        )}

        {/* STREET NAME, AREA */}
        <Text style={styles.label}>
          Street Name/ Area/ Village<Text style={styles.required}>*</Text>
        </Text>
        <Controller
          control={control}
          name="streetNameArea"
          rules={{required: 'Street Name/ Area/ Village is required.'}}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={[styles.input, errors.streetNameArea && styles.errorInput]}
              placeholder="Street name/ Area/ Village"
              placeholderTextColor={colors.color_light_black}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />
        {errors.streetNameArea && (
          <Text style={styles.errorText}>{errors.streetNameArea.message}</Text>
        )}

        {/* LANDMARK */}
        <Text style={styles.label}>Landmark</Text>
        <Controller
          control={control}
          name="landmark"
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.input}
              placeholder="Landmark (Optional)"
              placeholderTextColor={colors.color_light_black}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />

        {/* PIN CODE AND CITY/TOWN */}
        <View style={styles.flexContainer}>
          <View>
            <Text style={styles.label}>
              Pincode<Text style={styles.required}>*</Text>
            </Text>
            <Controller
              control={control}
              name="pincode"
              rules={{
                required: 'Pincode is required.',
                pattern: {
                  value: /^[0-9]{6}$/,
                  message: 'Pincode must be a 6-digit number.',
                },
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  style={[styles.input2, errors.pincode && styles.errorInput]}
                  placeholder="PIN code"
                  placeholderTextColor={colors.color_light_black}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  keyboardType="numeric"
                />
              )}
            />
            {errors.pincode && (
              <Text style={styles.errorText}>{errors.pincode.message}</Text>
            )}
          </View>

          <View>
            <Text style={styles.label}>
              City/Town<Text style={styles.required}>*</Text>
            </Text>
            <Controller
              control={control}
              name="cityTown"
              rules={{required: 'City/Town is required.'}}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  style={[styles.input3, errors.cityTown && styles.errorInput]}
                  placeholder="City/Town"
                  placeholderTextColor={colors.color_light_black}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
              )}
            />
            {errors.cityTown && (
              <Text style={styles.errorText}>{errors.cityTown.message}</Text>
            )}
          </View>
        </View>
        <View style={{marginTop: -15}}>
          <Text style={styles.label}>
            State<Text style={styles.required}>*</Text>
          </Text>
          <Controller
            control={control}
            name="state"
            rules={{required: 'State is required.'}}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={[
                  styles.input,
                  errors.streetNameArea && styles.errorInput,
                ]}
                placeholder="State"
                placeholderTextColor={colors.color_light_black}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
          />
          {errors.state && (
            <Text style={styles.errorText}>{errors.state.message}</Text>
          )}
        </View>

        {/* BUTTONS */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.button1]}
            onPress={handlePrevious}>
            <Text style={styles.buttonText}>Previous</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.button2]}
            onPress={handleSubmit(onSubmit)}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default PGinfoScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  addPgButton: {
    marginTop: 20,
    backgroundColor: colors.color_green,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 15,
    zIndex: 10,
  },
  image: {
    alignSelf: 'center',
    width: 231,
    height: 198,
    marginBottom: 20,
  },
  headerContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  headertext: {
    fontSize: 22,
    fontWeight: '600',
  },
  input: {
    height: 43,
    borderWidth: 1,
    borderColor: '#727070',
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
    marginTop: 3,
    fontSize: 16,
  },
  input2: {
    width: 140,
    flex: 1,
    height: 43,
    borderWidth: 1,
    borderColor: '#727070',
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
    marginRight: 10,
    fontSize: 16,
  },
  input3: {
    width: 170,
    flex: 1,
    height: 43,
    borderWidth: 1,
    borderColor: '#727070',
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  flexContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  button: {
    flex: 1,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.color_dark_blue,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  buttonText: {
    color: colors.color_white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  label: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: '600',
  },
  required: {
    color: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 5,
  },
  errorInput: {
    borderColor: 'red',
  },
});
