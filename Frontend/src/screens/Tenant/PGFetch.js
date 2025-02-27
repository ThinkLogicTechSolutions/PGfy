import React, { useEffect, useState } from "react";
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import LOGO from '../../assets/ExploreResi.png';
import { apiConnector } from "../../services/apiconnector";
import { tenantEndpoints } from "../../services/apis";
import { useNavigation } from "@react-navigation/native";

const { GET_PG_DETAILS } = tenantEndpoints;

const PGFetch = ({ route, navigation }) => {
  const { PGid } = route.params;
  const [showMenu, setShowMenu] = useState({});
  const [response, setResponse] = useState(null);  // Changed to hold a single object
const navigate = useNavigation();
  useEffect(() => {
    const getuniquePg = async () => {
      try {
        console.log("Id", PGid);
        const response = await apiConnector('POST', GET_PG_DETAILS, { id: PGid });
        if (!response.data.success) {
          // Handle failure case (if necessary)
        }
        console.log("response", response);
        setResponse(response.data);  // Set the response directly as an object
      } catch (error) {
        console.log(error.message);
      }
    };

    getuniquePg();
  }, [PGid]);

  const toggleMenu = (id) => {
    setShowMenu((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Render PG details and amenities
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <ScrollView>
        <View style={{ padding: 16 }}>
          {response && response.data && (
            <View key={response.data.id} style={{ marginBottom: 20, backgroundColor: "#FFFFFF" }}>
              <View>
                <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 8 }}>
                  {response.data.name}
                </Text>
                <Text style={{ fontSize: 14, color: "#555", marginBottom: 12 }}>
                  {`${response.data.landmark}, ${response.data.locality}, ${response.data.streetName}, ${response.data.city}, ${response.data.state}`}
                </Text>
              </View>

              {/* Image section, uncomment if image data exists */}
              {/* <View>
                <Image source={response.data.image ? {uri: response.data.image} : LOGO} 
                  style={{ height: 200, width: "100%", borderRadius: 10, marginBottom: 12 }} />
              </View> */}

              <View style={{ marginBottom: 16, flexDirection: "row" }}>
                <View>
                  <Text style={{ fontSize: 14, color: "#777" }}>Starts from</Text>
                  <Text style={{ fontSize: 18, fontWeight: "bold", color: "#FF4B3E" }}>
                    {response.data.seaterPrice.acRoomPricing.oneSeater} {/* Example of pricing */}
                  </Text>
                </View>
              </View>

              <Text>Amenities</Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap", marginBottom: 16 }}>
                {response.data.amenities[0] && Object.keys(response.data.amenities[0]).map((key, index) => {
                  if (response.data.amenities[0][key]) {
                    return (
                      <View
                        key={index}
                        style={{
                          borderWidth: 1,
                          borderColor: "gray",
                          borderRadius: 20,
                          paddingVertical: 5,
                          paddingHorizontal: 10,
                          marginRight: 10,
                          marginBottom: 10,
                          backgroundColor: "#F5F5F5",
                        }}
                      >
                        <Text style={{ fontSize: 12 }}>{key}</Text>
                      </View>
                    );
                  }
                  return null;
                })}
              </View>

              <View style={{ marginBottom: 16 }}>
                <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 8 }}>
                  Available Occupancies
                </Text>
                <View style={{ flexDirection: "row", gap: 10, justifyContent: "space-evenly" ,flexWrap:"wrap"}}>
                  {/* Example Occupancy View */}

                  <View>

                    {
                      response.data.seaterPrice.nonAcRoomPricing.oneSeater && (
                        <View style={{
                          width: 100,
                          height: 70,
                          backgroundColor: "#D7EDFF",
                          borderRadius: 12,
                          justifyContent: "center",
                          alignItems: "center",
                          gap:"10px"
                        }}>
                          <Text>One Seater</Text>
                          <Text style={{fontSize:11}}>Starts from</Text>

                          <Text style={{ fontSize: 14 }}>{response.data.seaterPrice.nonAcRoomPricing.oneSeater}/-</Text>
                        </View>
                      )
                    }
                  </View>


                    <View>
                          {
                            response.data.seaterPrice.nonAcRoomPricing.twoSeater &&(
                              <View style={{
                                width: 100,
                                height: 70,
                                backgroundColor: "#D7EDFF",
                                borderRadius: 12,
                                justifyContent: "center",
                                alignItems: "center",
                                gap:"10px"
                              }}>
                                <Text>Two Seater</Text>
                                <Text style={{fontSize:11}}>Starts from</Text>

                                <Text style={{ fontSize: 14 }}>{response.data.seaterPrice.nonAcRoomPricing.twoSeater}/-</Text>
                              </View>
          
                            )
                          }
                    </View>


                    <View>
                          {
                            response.data.seaterPrice.nonAcRoomPricing.threeSeater &&(

                              <View style={{
                                width: 100,
                                height: 70,
                                backgroundColor: "#D7EDFF",
                                borderRadius: 12,
                                justifyContent: "center",
                                alignItems: "center",
                                gap:"10px"
                              }}>
                                <Text>Three Seater</Text>
                                <Text style={{fontSize:11}}>Starts from</Text>
                                <Text style={{ fontSize: 14 }}>{response.data.seaterPrice.nonAcRoomPricing.threeSeater}/-</Text>
                              </View>
          
          
                            )
                          }
                    </View>

                    <View>
                          {
                            response.data.seaterPrice.nonAcRoomPricing.fourSeater &&(

                              <View style={{
                                width: 100,
                                height: 70,
                                backgroundColor: "#D7EDFF",
                                borderRadius: 12,
                                justifyContent: "center",
                                alignItems: "center",
                                gap:"10px"
                              }}>
                                <Text>Four Seater</Text>
                                <Text style={{fontSize:11}}>Starts from</Text>

                                <Text style={{ fontSize: 14 }}>{response.data.seaterPrice.nonAcRoomPricing.fourSeater}/-</Text>
                              </View>
          
          
                            )
                          }
                    </View>
                    <View>
                          {
                            response.data.seaterPrice.nonAcRoomPricing.fiveSeater &&(
                              <View style={{
                                width: 100,
                                height: 70,
                                backgroundColor: "#D7EDFF",
                                borderRadius: 12,
                                justifyContent: "center",
                                alignItems: "center",
                                gap:"10px"
                              }}>
                                <Text>Five Seater</Text>
                                <Text style={{fontSize:11}}>Starts from</Text>

                                <Text style={{ fontSize: 14 }}>{response.data.seaterPrice.nonAcRoomPricing.fiveSeater}/-</Text>
                              </View>
          
                            )
                          }
                    </View>
                    <View>
                          {
                            response.data.seaterPrice.nonAcRoomPricing.sixSeater &&(
                              <View style={{
                                width: 100,
                                height: 70,
                                backgroundColor: "#D7EDFF",
                                borderRadius: 12,
                                justifyContent: "center",
                                alignItems: "center",
                                gap:"10px"
                              }}>
                                <Text>Six Seater</Text>
                                <Text style={{fontSize:11}}>Starts from</Text>

                                <Text style={{ fontSize: 14 }}>{response.data.seaterPrice.nonAcRoomPricing.sixSeater}/-</Text>
                              </View>
          
                            )
                          }
                    </View>










                </View>
              </View>

              <View style={{ marginBottom: 16 }}>
                <TouchableOpacity
                  onPress={() => toggleMenu(response.data.id)}
                  style={{
                    paddingVertical: 10,
                    borderRadius: 3,
                    marginBottom: 8,
                    borderWidth: 1,
                    alignItems: "flex-start",
                    paddingLeft: 20,
                  }}
                >
                  <Text style={{ fontSize: 16, color: "black" }}>
                    {showMenu[response.data.id] ? "Hide Food Menu" : "Show Food Menu"}
                  </Text>
                </TouchableOpacity>
                {showMenu[response.data.id] && (
                  <View style={{ marginLeft: 20, marginBottom: 16 }}>
                    {response.data.foodMenu && response.data.foodMenu.map((menu, index) => (
                      <View key={index} style={{ marginBottom: 10 }}>
                        <Text style={{ fontSize: 14, fontWeight: "bold" }}>{menu.day}</Text>
                        <Text style={{ fontSize: 12 }}>Breakfast: {menu.meals.breakfast}</Text>
                        <Text style={{ fontSize: 12 }}>Lunch: {menu.meals.lunch}</Text>
                        <Text style={{ fontSize: 12 }}>Snacks: {menu.meals.snacks}</Text>
                        <Text style={{ fontSize: 12 }}>Dinner: {menu.meals.dinner}</Text>
                      </View>
                    ))}
                  </View>
                )}

                <TouchableOpacity
                  style={{
                    paddingVertical: 10,
                    borderRadius: 3,
                    marginBottom: 8,
                    borderWidth: 1,
                    alignItems: "flex-start",
                    paddingLeft: 20,
                  }}
                >
                  <Text style={{ fontSize: 16, color: "black" }}>More Details</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    paddingVertical: 10,
                    borderRadius: 3,
                    borderWidth: 1,
                    alignItems: "flex-start",
                    paddingLeft: 20,
                  }}
                >
                  <Text style={{ fontSize: 16, color: "black" }}>Policies and Rules</Text>
                </TouchableOpacity>
              </View>

              <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
                <TouchableOpacity onPress={()=>navigation.navigate("PG room",{PGid})}>
                  <Text style={{ color: "white", paddingVertical: 10, paddingHorizontal: 40, borderRadius: 5, backgroundColor: "#FF4B3E" }}>
                    Book Now
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text
                    style={{
                      color: "#FF4B3E",
                      borderColor: "#FF4B3E",
                      borderWidth: 1,
                      paddingVertical: 10,
                      paddingHorizontal: 35,
                      borderRadius: 5,
                      backgroundColor: "white",
                      textAlign: "center",
                    }}
                  >
                    Schedule a Visit
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PGFetch;
