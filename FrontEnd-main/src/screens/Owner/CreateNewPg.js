import React, { useState } from 'react'
import { ScrollView, View } from 'react-native'
import NavigationButton from '../../components/Common/NavigationButton';
import ProgressIndicator from '../../components/Owner/ProgressIndicator';
import PGinfoScreen from './PGinfo';
import PGrooms from './PGrooms';
import PGamenities from './PGamenities';
import { useSelector } from 'react-redux';

const CreateNewPg = () => {

    const {pgCreateStep} = useSelector((state) => state.pgInfo.pgInfo);
    console.log("PG",pgCreateStep);
    const fetchData = async () => {

    }

  return (
    <ScrollView contentContainerStyle={{display:"flex", flexDirection:"column",justifyContent:"center",alignItems:"center", width:"100%", paddingVertical:20, backgroundColor:"white"}}>
        <ProgressIndicator />

        <View style={{width:"100%", marginHorizontal:"auto", marginVertical:0, display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", borderWidth:0, borderRadius:0, borderColor:"black", paddingHorizontal:0, paddingVertical:0}}>
            {
                pgCreateStep===1 && <PGinfoScreen />
            }
            {
                pgCreateStep===2 && <PGrooms />
            }
            {
                pgCreateStep===3 && <PGamenities />
            }
            {/* {
                pgCreateStep===4 && <AwaitingConfirmation />
            } */}
        </View>
        
    </ScrollView>
  )
}

export default CreateNewPg