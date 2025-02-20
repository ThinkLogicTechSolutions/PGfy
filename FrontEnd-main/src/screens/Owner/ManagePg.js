import React, { useState } from 'react'
import { ScrollView, View } from 'react-native'
import NavigationButton from '../../components/Common/NavigationButton';
import { useDispatch } from 'react-redux';
import {setPgCreateStep} from '../../reducer/slices/pgSlice';

const ManagePg = ({navigation}) => {

    const {pgList, setPgList} = useState(null);
    const dispatch = useDispatch();

    const fetchData = async () => {
        
    }

    const moveToPgCreation = async () => {
        console.log("JERE");
        await dispatch(setPgCreateStep(1));
        console.log("HERE");
        navigation.navigate("CreateNewPg");
    }

  return (
    <ScrollView style={{display:"flex", flexDirection:"column", padding:20}}>
        <NavigationButton text={"Add PG"} onPress={moveToPgCreation} />
    </ScrollView>
  )
}

export default ManagePg