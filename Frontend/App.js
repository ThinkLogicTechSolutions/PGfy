import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import LoginIntro from './src/screens/Intro/LoginIntro';
import SignUpIntro from './src/screens/Intro/SignUpIntro';
import Intro from './src/screens/Intro';
import rootReducer from './src/reducer';
import {configureStore} from '@reduxjs/toolkit';
import RazorPayCheck from './src/screens/Testing/RazorPayCheck';
import TenantSignup from './src/screens/Auth/TenantSignup';
import TenantMobileNum from './src/screens/Auth/TenantMobileNum';
import VerifyOtp from './src/screens/Auth/Verifyotp';
import Profile from './src/screens/Auth/Profile';
import LoginOwner from './src/screens/Auth/LoginOwner';
import Dashboard from './src/screens/Owner/Dashboard';
import OwnerMobileNum from './src/screens/Auth/OwnerMobileNum';
import OtpScreen from './src/screens/Auth/OwnerVerifyOtp';
import OwnerSignup from './src/screens/Auth/OwnerSignup';
import LoginUser from './src/screens/Auth/LoginUser';
import ExploreResidences from './src/screens/Tenant/ExploreResidences';
import PGinfoScreen from './src/screens/Owner/PGinfo';
import PGrooms from './src/screens/Owner/PGrooms';
import CreateNewPg from './src/screens/Owner/CreateNewPg';
import PGamenities from './src/screens/Owner/PGamenities';
import PGSummaryScreen from './src/screens/Owner/AddPG';
import Account from './src/screens/Owner/AccountScreens/Account';
import PGdetails from './src/screens/Owner/AccountScreens/PGdetails';
import RoomChart from './src/screens/Owner/AccountScreens/RoomChart';
import KYCverification from './src/screens/Tenant/KYCverification';
import PGList from './src/screens/Tenant/PGList';
import PGFetch from './src/screens/Tenant/PGFetch';
import PGRooms from './src/screens/Tenant/PGRooms';
import RoomDetailPage from './src/screens/Tenant/RommDetailPage';
const Stack = createStackNavigator();

const App = () => {
  return (
    <>
      <NavigationContainer independent={true} initialRouteName={'LoginIntro'}>
        <Stack.Navigator>

          <Stack.Screen
            name="LoginIntro"
            component={LoginIntro}
            options={{headerShown: false}}
            />
          <Stack.Screen
            name="SignUpIntro"
            component={SignUpIntro}
            options={{headerShown: false}}
          />

          <Stack.Screen
            options={{headerShown: false}}
            name="Tenant Signup"
            component={TenantSignup}
          />
          <Stack.Screen
            name="Tenant Mobile Number"
            component={TenantMobileNum}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Owner Mobile Number"
            component={OwnerMobileNum}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Owner Login"
            component={LoginOwner}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="OtpPage"
            component={VerifyOtp}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Verify OTP"
            component={OtpScreen}
            options={{headerShown: false}}
            />
          <Stack.Screen
            name="Tenant Profile"
            component={Profile}
            options={{headerShown: false}}
            />

          <Stack.Screen
            name="Owner Signup"
            component={OwnerSignup}
            options={{headerShown: false}}
            />
          <Stack.Screen
            name="LoginUser"
            component={LoginUser}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="Explore"
            component={ExploreResidences}
            options={{headerShown: false}}
            />
            <Stack.Screen
              name="RazorPayCheck"
              component={RazorPayCheck}
              options={{ headerShown: false }}
            />
          <Stack.Screen
            name="PGinfo"
            component={PGinfoScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="CreateNewPg"
            component={CreateNewPg}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="PG Amenities"
            component={PGamenities}
            options={{headerShown: false}}
          />

          {/* <Stack.Screen
            name="Manage PG"
            component={ManagePg}
            options={{headerShown: false}}
          /> */}
          <Stack.Screen
            name="PG Summary"
            component={PGSummaryScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Owner Dashboard"
            component={Dashboard}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Account"
            component={Account}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="PGrooms"
            component={PGrooms}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="PGdetails"
            component={PGdetails}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Room Chart"
            component={RoomChart}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="KYCverify"
            component={KYCverification}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="PG List"
            component={PGList}
            options={{headerShown:false}}
          />

          <Stack.Screen
            name="PG Fetch"
            component={PGFetch}
            options={{headerShown:false}}
          />
          <Stack.Screen
           name="PG room"
           component={PGRooms}
           options={{headerShown:false}}
          />

          <Stack.Screen
            name="RoomDetailPage"
            component={RoomDetailPage}
            options={{headerShown:false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
