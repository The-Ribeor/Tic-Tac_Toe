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
      <View style={styles.mainContent}>
        <Text style={styles.title}>Elige cómo{"\n"}quieres jugar</Text>
        <Text style={styles.subTitle}>Modos de juego</Text>
        <View style={styles.content}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => goToGame("PVP")}
          >
            <Text style={styles.buttonText}>Uno VS Uno</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => goToGame("AI")}
          >
            <Text style={styles.buttonText}>Uno VS Máquina</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#191B1F",
    paddingBottom: 20,
  },
  mainContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#FFF",
    fontFamily: "Poppins-Bold",
    fontSize: 31,
    textAlign: "center",
    marginBottom: 50,
  },
  subTitle: {
    color: "#FFF",
    fontFamily: "Poppins-Semibold",
    fontSize: 26,
    textAlign: "center",
    marginBottom: 30,
  },
  content: {
    backgroundColor: "#252A34",
    borderRadius: 20,
    width: "80%",
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: "center",
    marginBottom: 20,
    gap: 20, // Añade espacio entre los botones
  },
  button: {
    backgroundColor: "#161A22",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 23,
    fontFamily: "Poppins-SemiBold",
    textAlign: "center",
  },
});

export default GameModeScreen;
