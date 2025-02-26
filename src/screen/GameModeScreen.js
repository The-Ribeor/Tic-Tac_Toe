import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Footer } from "../components/Footer";

export const GameModeScreen = () => {
  const navigation = useNavigation();

  const goToGame = (mode) => {
    navigation.navigate("GameScreen", { mode });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Elige cómo{"\n"}quieres jugar</Text>
      <Text style={styles.subTitle}>Modos de juego</Text>
      <View style={styles.content}>
        <TouchableOpacity style={styles.button} onPress={() => goToGame("PVP")}>
          <Text style={styles.buttonText}>Uno VS Uno</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => goToGame("AI")}>
          <Text style={styles.buttonText}>Uno VS Máquina</Text>
        </TouchableOpacity>
      </View>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#191B1F",
  },
  title: {
    color: "#FFF",
    fontFamily: "Poppins-Bold",
    fontSize: 31,
    textAlign: "center",
    marginBottom: 70,
  },
  subTitle: {
    color: "#FFF",
    fontFamily: "Poppins-Semibold",
    fontSize: 26,
    textAlign: "center",
    marginBottom: 40,
  },
  content: {
    backgroundColor: "#252A34",
    borderRadius: 20,
    height: 250,
    width: "80%",
    padding: 40,
    justifyContent: "space-between",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#161A22",
    padding: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 23,
    fontFamily: "Poppins-SemiBold",
    textAlign: "center",
  },
});
