import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, View, FlatList, TouchableOpacity } from "react-native";
import { apiConnector } from "../../services/apiconnector";
import { tenantEndpoints } from "../../services/apis";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";

const { GET_PG_DETAILS } = tenantEndpoints;

const PGRooms = ({ route, navigation }) => {
  const { PGid } = route.params;
  const [response, setResponse] = useState(null);

  useEffect(() => {
    const getUniquePg = async () => {
      try {
        const res = await apiConnector('POST', GET_PG_DETAILS, { id: PGid });
        if (res.data.success) {
          setResponse(res.data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getUniquePg();
  }, [PGid]);

  const renderRoomItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('RoomDetailPage', { room: item })}>
      <View style={{ marginBottom: 20, backgroundColor: "#FFFFFF", padding: 16, borderRadius: 10 }}>
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
          <Icon name="bed" size={20} color="#FF4B3E" style={{ marginRight: 10 }} />
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            {item.roomNumber} (Floor {item.floorNumber})
          </Text>
        </View>
        <Text>{item.seater}</Text>
        {item.hasAc ? (
          <Text style={{ fontSize: 14, color: "#FF4B3E" }}>Has AC</Text>
        ) : (
          <Text style={{ fontSize: 14, color: "gray" }}>No AC</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  if (!response) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F5F5F5", padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}>
        Rooms in {response.data.name}
      </Text>
      <FlatList
        data={response.data.rooms}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderRoomItem}
        contentContainerStyle={{ paddingBottom: 20 }} // Adds padding at the bottom for better scrolling
      />
    </SafeAreaView>
  );
};

export default PGRooms;
