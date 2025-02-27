import React from "react";
import { SafeAreaView, Text, View, FlatList, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import RazorpayCheckout from 'react-native-razorpay';  // Import Razorpay

const RommDetailPage = ({ route }) => {
  const { room } = route.params; // Get the room details from navigation params

  const handlePayment = () => {
    var options = {
      description: 'PGfy Rent Payment',
      image: 'https://res.cloudinary.com/dwt1vmf2u/image/upload/v1730114353/Icon_vp1jef.jpg',
      currency: 'INR',
      key: '<KeyID>', // Replace with your Razorpay Key ID
      amount: '10000', // Amount in paise (100 INR = 10000 paise)
      name: 'PG Monthly Rent Payment',
      order_id: 'order_PxG1LGgvqKhNgZ', // Replace with your generated order ID
      prefill: {
        email: 'ralfdsf@example.com',
        contact: '9191919191',
        name: 'Abhiram T',
      },
      theme: { color: '#53a20e' }
    };

    RazorpayCheckout.open(options)
      .then((data) => {
        alert(`Success: ${data.razorpay_payment_id}`);
      })
      .catch((error) => {
        alert(`Error: ${error.code} | ${error.description}`);
      });
  };

  const renderCotItem = ({ item }) => {
    const cotColor = item.isOccupied ? "red" : "green"; // Red if occupied, Green if not

    return (
      <TouchableOpacity onPress={handlePayment}> 
        <View 
          style={{ 
            flexDirection: "row", 
            alignItems: "center", 
            marginBottom: 15, // Increased spacing between cots
            padding: 10, // Added padding inside each cot block
            backgroundColor: "#FFFFFF", // Optional: White background for separation
            borderRadius: 10, // Optional: Rounded corners for better UI
            shadowColor: "#000", // Optional: Shadow for a card-like effect
            shadowOpacity: 0.1,
            shadowRadius: 5,
            elevation: 3
          }}
        >
          <Icon name="bed" size={20} color={cotColor} style={{ marginRight: 10 }} />
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>{item.cotNumber}</Text>
          <Text style={{ color: cotColor, marginLeft: 10, fontSize: 14 }}>
            {item.isOccupied ? "Occupied" : "Available"}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F5F5F5", padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}>
        Details for {room.roomNumber} (Floor {room.floorNumber})
      </Text>

      <Text style={{ fontSize: 16, marginBottom: 10 }}>Seater: {room.seater}</Text>
      <Text style={{ fontSize: 16, marginBottom: 10 }}>
        {room.hasAc ? "Has AC" : "No AC"}
      </Text>

      <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 10 }}>Cots:</Text>
      <FlatList
        data={room.cots}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderCotItem}
        contentContainerStyle={{ paddingBottom: 20 }} // Add padding for better scrolling
      />
    </SafeAreaView>
  );
};

export default RommDetailPage;
