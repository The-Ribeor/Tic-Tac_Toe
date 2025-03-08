import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Easing,
  Linking,
  Dimensions,
} from "react-native";
import React, { useEffect, useRef } from "react";

const { width } = Dimensions.get("window");

export const Footer = () => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulse = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.2, // Aumenta el tamaño (latido)
            duration: 500,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1, // Vuelve al tamaño normal
            duration: 500,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    pulse();
  }, []);

  const openURL = () => {
    Linking.openURL("https://github.com/Diegoberrio1601");
  };

  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>Designed by </Text>
      <TouchableOpacity onPress={openURL}>
        <Text style={styles.footerButtonText}>The Ribeor</Text>
      </TouchableOpacity>
      <Animated.Text
        style={[styles.heart, { transform: [{ scale: scaleAnim }] }]}
      >
        ❤️
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    position: "absolute",
    bottom: 15, // Asegura margen en dispositivos sin notch
    width: "100%",
    paddingVertical: width * 0.02, // Ajusta dinámicamente según el ancho
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    color: "#FFF",
    fontFamily: "Poppins-Regular",
    fontSize: width * 0.04, // Ajuste responsivo
  },
  footerButtonText: {
    fontFamily: "Poppins-SemiBold",
    color: "#FFF",
    borderBottomColor: "white",
    borderBottomWidth: 1,
    fontSize: width * 0.04, // Ajuste responsivo
  },
  heart: {
    marginLeft: 5,
    fontSize: width * 0.05, // Hace que el corazón no se vea fuera de lugar
  },
});


