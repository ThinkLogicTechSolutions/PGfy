import 'react-native-gesture-handler';

/**
 * @format
 */

import {AppRegistry, Text, View} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {ToastProvider} from 'react-native-toast-notifications';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import rootReducer from './src/reducer';
import {NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome6';

const store = configureStore({
  reducer: rootReducer,
});

const ReduxApp = () => {
  return (
    <ToastProvider
      duration={5000}
      animationDuration={250}
      animationType="slide-in"
      offset={30}
      swipeEnabled={true}
      renderType={{
        success: toast => (
          <View
            style={{
              display: 'flex',
              maxWidth: '90%',
              minWidth: '50%',
              flexDirection: 'row',
              gap: 10,
              justifyContent: 'space-evenly',
              alignItems: 'center',
              paddingHorizontal: 10,
              paddingVertical: 14,
              borderRadius: 10,
              backgroundColor: 'white',
              shadowColor: 'black',
              shadowOffset: {width: 10, height: 10},
              shadowRadius: 10,
              shadowOpacity: 0.25,
              elevation: 5,
              borderLeftColor: 'green',
              borderLeftWidth: 6,
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 100,
                backgroundColor: 'green',
                width: 30,
                height: 30,
              }}>
              <Icon name="check" size={20} color="white" />
            </View>
            <Text style={{color: 'black', fontWeight: '700', fontSize: 14}}>
              {toast.message}
            </Text>
          </View>
        ),
        danger: toast => (
          <View
            style={{
              display: 'flex',
              maxWidth: '90%',
              minWidth: '50%',
              flexDirection: 'row',
              gap: 10,
              justifyContent: 'space-evenly',
              alignItems: 'center',
              paddingHorizontal: 10,
              paddingVertical: 14,
              borderRadius: 10,
              backgroundColor: 'white',
              shadowColor: 'black',
              shadowOffset: {width: 10, height: 10},
              shadowRadius: 10,
              shadowOpacity: 0.25,
              elevation: 5,
              borderLeftColor: 'red',
              borderLeftWidth: 6,
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 100,
                backgroundColor: 'red',
                width: 30,
                height: 30,
              }}>
              <Icon name="xmark" size={20} color="white" />
            </View>
            <Text style={{color: 'black', fontWeight: '700', fontSize: 14}}>
              {toast.message}
            </Text>
          </View>
        ),
        warning: toast => (
          <View
            style={{
              display: 'flex',
              maxWidth: '90%',
              minWidth: '50%',
              flexDirection: 'row',
              gap: 10,
              justifyContent: 'space-evenly',
              alignItems: 'center',
              paddingHorizontal: 10,
              paddingVertical: 14,
              borderRadius: 10,
              backgroundColor: 'white',
              shadowColor: 'black',
              shadowOffset: {width: 10, height: 10},
              shadowRadius: 10,
              shadowOpacity: 0.25,
              elevation: 5,
              borderLeftColor: 'orange',
              borderLeftWidth: 6,
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 100,
                backgroundColor: 'orange',
                width: 30,
                height: 30,
              }}>
              <Icon name="triangle-exclamation" size={20} color="white" />
            </View>
            <Text style={{color: 'black', fontWeight: '700', fontSize: 14}}>
              {toast.message}
            </Text>
          </View>
        ),
        normal: toast => (
          <View
            style={{
              display: 'flex',
              maxWidth: '90%',
              minWidth: '50%',
              flexDirection: 'row',
              gap: 10,
              justifyContent: 'space-evenly',
              alignItems: 'center',
              paddingHorizontal: 10,
              paddingVertical: 14,
              borderRadius: 10,
              backgroundColor: 'white',
              shadowColor: 'black',
              shadowOffset: {width: 10, height: 10},
              shadowRadius: 10,
              shadowOpacity: 0.25,
              elevation: 5,
              borderLeftColor: 'green',
              borderLeftWidth: 6,
            }}>
            <Text style={{color: 'black', fontWeight: '700', fontSize: 14}}>
              {toast.message}
            </Text>
          </View>
        ),
      }}>
      <Provider store={store}>
        {/* <NavigationContainer> */}
        <App />
        {/* </NavigationContainer> */}
      </Provider>
    </ToastProvider>
  );
};

AppRegistry.registerComponent(appName, () => ReduxApp);
