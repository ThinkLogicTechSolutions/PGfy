import React from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { colors } from '../../styles/Theme'; // Import your colors schema

const ProgressIndicator = () => {
  const { pgCreateStep } = useSelector((state) => state.pgInfo.pgInfo);

  return (
    <View
      style={{
        width: "100%",
        marginVertical: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "flex-start",
        marginHorizontal: 10,
      }}
    >
      {/* Step 1 */}
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 5,
        }}
      >
        <View
          style={{
            display: "flex",
            borderWidth: 2,
            borderColor: colors.color_purple,
            backgroundColor: pgCreateStep === 1 ? "transparent" : colors.color_purple,
            borderRadius: 20,
            width: 40,
            height: 40,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {pgCreateStep === 1 ? (
            <Text style={{ color: colors.color_purple, fontWeight: "800", fontSize: 16 }}>1</Text>
          ) : (
            <Icon name="check" style={{ color: colors.color_white }} size={20} />
          )}
        </View>
        <Text
          style={{
            width: "100%",
            textAlign: "center",
            fontSize: 14,
            fontWeight: "600",
            color: colors.color_purple,
          }}
        >
          Fill Info
        </Text>
      </View>

      {/* Connector */}
      <View
        style={{
          borderStyle: "dotted",
          borderWidth: 1.5,
          width: "20%",
          borderColor: pgCreateStep === 1 ? colors.color_light_cyan : colors.color_purple,
          borderRadius: 1,
          marginTop: 20,
        }}
      />

      {/* Step 2 */}
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 5,
        }}
      >
        <View
          style={{
            display: "flex",
            borderWidth: 2,
            borderColor: pgCreateStep < 2 ? colors.color_light_cyan : colors.color_purple,
            backgroundColor: pgCreateStep <= 2 ? "transparent" : colors.color_purple,
            borderRadius: 20,
            width: 40,
            height: 40,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {pgCreateStep <= 2 ? (
            <Text
              style={{
                color: pgCreateStep < 2 ? colors.color_light_cyan : colors.color_purple,
                fontWeight: "800",
                fontSize: 16,
              }}
            >
              2
            </Text>
          ) : (
            <Icon name="check" style={{ color: colors.color_white }} size={20} />
          )}
        </View>
        <Text
          style={{
            width: "100%",
            textAlign: "center",
            fontSize: 14,
            fontWeight: "600",
            color: pgCreateStep < 2 ? colors.color_light_cyan : colors.color_purple,
          }}
        >
          Add Rooms
        </Text>
      </View>

      {/* Connector */}
      <View
        style={{
          borderStyle: "dotted",
          borderWidth: 1.5,
          width: "20%",
          borderColor: pgCreateStep <= 2 ? colors.color_light_cyan : colors.color_purple,
          borderRadius: 1,
          marginTop: 20,
        }}
      />

      {/* Step 3 */}
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 5,
        }}
      >
        <View
          style={{
            display: "flex",
            borderWidth: 2,
            borderColor: pgCreateStep < 3 ? colors.color_light_cyan : colors.color_purple,
            backgroundColor: pgCreateStep <= 3 ? "transparent" : colors.color_purple,
            borderRadius: 20,
            width: 40,
            height: 40,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {pgCreateStep <= 3 ? (
            <Text
              style={{
                color: pgCreateStep < 3 ? colors.color_light_cyan : colors.color_purple,
                fontWeight: "800",
                fontSize: 16,
              }}
            >
              3
            </Text>
          ) : (
            <Icon name="check" style={{ color: colors.color_white }} size={20} />
          )}
        </View>
        <Text
          style={{
            width: "100%",
            textAlign: "center",
            fontSize: 14,
            fontWeight: "600",
            color: pgCreateStep < 3 ? colors.color_light_cyan : colors.color_purple,
          }}
        >
          Amenities
        </Text>
      </View>
    </View>
  );
};

export default ProgressIndicator;
