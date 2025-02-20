import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  ScrollView,
  Image
} from 'react-native';


const ExploreResidences=({navigation})=>{
    const navigate= useNavigation();

    const onsubmit=()=>{
        console.log("clicked explore resideces")
        navigation.navigate('PG List');
    }

    return(

    <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView}>
            <View style={{flex:1,alignItems:'center',justifyContent:'space-between',flexDirection:'column',marginBlock:60}}>
                
       

                <View>
                <Image
                source={require('../../assets/ExploreResi.png')}
                style={{width:300,height:200}}
                />
            </View>

            <View style={{paddingBlockStart:'80%'}}>
                <TouchableOpacity style={styles.submitButton} onPress={()=>onsubmit()}>
                    <Text style={{color:'white',fontSize:20,fontWeight:'bold'}}>
                        Explore Residences
                    </Text>
                </TouchableOpacity>
            </View>

                </View>


        </ScrollView>
    </SafeAreaView>
    
)


}
export default ExploreResidences


const styles = StyleSheet.create({
    safeArea: {
      paddingTop: 25,
      flex: 1,
      backgroundColor: '#ffffff',
    },
    scrollView: {
      backgroundColor: '#ffffff',
      paddingVertical: 20,
    },
    submitButton: {
        backgroundColor: 'red',
        paddingVertical: 12,
        paddingHorizontal: '20%',
        borderRadius: 8,
        elevation: 5,
        alignContent:'center',
        whiteSpace:'nowrap',
        color:'white'
      },
})