import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import ComplaintImg from "../../assets/Owner/footer/Complaint.png";
import FeeImg from "../../assets/Owner/footer/Fee.png";
import GuestImg from "../../assets/Owner/footer/Guest.png";
import HomeImg from "../../assets/Owner/footer/Home.png";
import PropertyImg from "../../assets/Owner/footer/Property.png";
const FooterSection = ({ navigation }) => {
  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigation.navigate()}
      >
        <Image source={HomeImg} />
        <Text style={styles.iconText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigation.navigate()}
      >
        <Image source={FeeImg} style={styles.image} />
        <Text style={styles.iconText}>Fee</Text>

      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigation.navigate()}
      >
        <Image source={GuestImg} style={styles.image}/>
        <Text style={styles.iconText}>Guest</Text>

      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigation.navigate()}
      >
        <Image source={PropertyImg} style={styles.image}/>
        <Text style={styles.iconText}>Property</Text>

      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigation.navigate()}
      >
        <Image source={ComplaintImg} style={styles.image}/>
        <Text style={styles.iconText}>Complaint</Text>

      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  iconContainer: {
    alignItems: "center",
  },
  iconText: {
    fontSize: 12,
    fontWeight:"600",
    color: '#777',
    marginTop: 4,
  },
});

export default FooterSection;
