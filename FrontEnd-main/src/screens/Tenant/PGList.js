import React from "react";
import { TouchableOpacity, View, Image, Text, SafeAreaView } from "react-native";
import LOGO from "../../assets/ExploreResi.png";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useEffect } from "react";
import { apiConnector } from "../../services/apiconnector";
import {  tenantEndpoints } from "../../services/apis";
import { FlatList } from "react-native";
const{ALL_PG_DETAILS} = tenantEndpoints;



const PGList = ({navigation}) => {
    const navigate = useNavigation();
    const[response,setResponse] = useState([]);

    useEffect(()=>{
      const ftechAllPgsDetails =async ()=>{
        try{
          const pgDetails = await apiConnector("GET",ALL_PG_DETAILS,{});
          if(!pgDetails.data.success){
              console.log("data not present");
          }
          console.log(pgDetails);
          setResponse(pgDetails.data.data);
          console.log("response",response);
        }
        catch(error){
          console.log(error.message);
        }
      }
      ftechAllPgsDetails();
    },[])


    const trueAmenities = response && response.length > 0
    ? Object.keys(response[0]).filter(
        (key) => typeof response[0][key] === "boolean" && response[0][key]
      )
    : [];
  return (

    <ScrollView>
        <SafeAreaView>
        <View style={{ padding: 10 }}>
      {response && response.map((data) => {
        return (
          <View
            key={data.id}
            style={{
              borderRadius: 10,
              borderWidth: 2,
              borderColor: "black",
              padding: 10,
              marginVertical: 10,
              backgroundColor: "white",
            }}
          >
            {/* Image Section */}
            {/* <Image
              source={data.image}
              style={{
                height: 200,
                width: 320,
                borderRadius: 5,
                objectFit:"cover"
              }}
            /> */}

<View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: '100%' }}>
  {/* Name Section (Left-aligned) */}
  <Text style={{ fontSize: 16, fontWeight: "bold", marginVertical: 5, flex: 1 }}>
    {data.name}
  </Text>

  {/* Price Section (Right-aligned) */}
  <View style={{ flexDirection: "column", alignItems: "center", paddingLeft: 10 }}>
    <Text style={{ fontWeight: "bold", marginRight: 5,color:"#868686" }}>
      Starts from:
    </Text>
    {/* <Text>{data.price}</Text> */}
  </View>
</View>





            {/* Address Section */}
            <Text style={{ marginVertical: 5 }}>
              {data.landmark}, {data.streetName}, {data.locality}, {data.city},{" "}
              {data.state}
            </Text>

            {/* Amenities Section */}
            <View style={{ marginVertical: 10 }}>

              {/* <View style={{ padding: 20 }}>
                  <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
                    Available Amenities:
                  </Text>
                  <FlatList
                    data={trueAmenities}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                      <Text style={{ fontSize: 16, marginVertical: 2 }}>• {item}</Text>
                    )}
                  />
              </View> */}
            </View>

            {/* Buttons Section */}
            <View
              style={{
                flexDirection: "row", // Arrange buttons in a row
                justifyContent: "space-between", // Space between buttons
                marginTop: 10,
              }}
            >
              <TouchableOpacity onPress={()=>navigation.navigate("PG Fetch",{PGid:data.id})}>
                <Text style={{ color: "white",paddingBlock:10,paddingLeft:30,paddingRight:30,borderRadius:5,backgroundColor:"#FF4B3E" }}>Book Now</Text>
              </TouchableOpacity>
              <TouchableOpacity>
  <Text
    style={{
      color: "#FF4B3E",
      borderColor: "#FF4B3E", // Set the border color
      borderWidth: 1,       // Required to make borderColor visible
      paddingVertical: 10,  // Use paddingVertical instead of paddingBlock
      paddingHorizontal: 30, // Horizontal padding
      borderRadius: 5,
      backgroundColor: "white",
      textAlign: "center",  // Centers the text horizontally
    }}
  >
    Schedule a Visit
  </Text>
</TouchableOpacity>

            </View>
          </View>
        );
      })}
    </View>
        </SafeAreaView>
    </ScrollView>

  );
};

export default PGList;
