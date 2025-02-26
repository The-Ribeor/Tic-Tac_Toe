import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
import { Footer } from "../components/Footer";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const slides = [
  {
    id: "1",
    title: "¡Bienvenido",
    subTitle: "a Tic Tac Toe!",
    description:
      "¿Listo para el desafío? Juega contra un amigo o con la máquina.",
    image: require("../../assets/icons/step-1.png"),
  },
  {
    id: "2",
    title: "Fácil de jugar,",
    subTitle: "difícil de dominar.",
    description: "Piensa bien tus movimientos y conviértete en un maestro.",
    image: require("../../assets/icons/step-2.png"),
  },
  {
    id: "3",
    title: "Tres en línea",
    subTitle: "para ganar.",
    description: "¡Pon a prueba tu estrategia y demuestra quién es el mejor!",
    image: require("../../assets/icons/step-3.png"),
  },
];

export function OnboardingScreen() {
  const navigation = useNavigation();
  const scrollViewRef = useRef(null);
  const [index, setIndex] = useState(0);

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(scrollPosition / width);
    setIndex(newIndex);
  };

  const nextSlide = () => {
    if (index < slides.length - 1) {
      scrollViewRef.current.scrollTo({
        x: (index + 1) * width,
        animated: true,
      });
    } else {
      navigation.navigate("GameModeScreen");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {slides.map((slide, i) => (
          <View key={slide.id} style={styles.slide}>
            <Image source={slide.image} style={styles.image} />

            <View style={styles.indicators}>
              {slides.map((_, j) => (
                <View
                  key={j}
                  style={[
                    styles.dot,
                    { backgroundColor: j === index ? "#fff" : "#666" },
                  ]}
                />
              ))}
            </View>

            <Text style={styles.title}>{slide.title}</Text>
            <Text style={styles.subTitle}>{slide.subTitle}</Text>
            <Text style={styles.description}>{slide.description}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Botón de siguiente */}
      <TouchableOpacity style={styles.button} onPress={nextSlide}>
        <Text style={styles.buttonText}>
          {index < slides.length - 1 ? "Siguiente" : "Comenzar"}
        </Text>
      </TouchableOpacity>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#191B1F",
    paddingBottom: 60,
  },
  slide: {
    width,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  image: {
    width: 320,
    height: 320,
    resizeMode: "contain",
    marginBottom: 10,
    alignSelf: "center",
    marginBottom: 50,
  },
  indicators: {
    flexDirection: "row",
    marginBottom: 30,
  },
  dot: {
    width: 50,
    height: 7,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  title: {
    fontSize: 41,
    fontFamily: "Poppins-Bold",
    color: "#fff",
  },
  subTitle: {
    fontSize: 30,
    fontFamily: "Poppins-Bold",
    color: "#fff",
  },
  description: {
    marginTop: 10,
    fontSize: 20,
    fontFamily: "Poppins-Regular",
    color: "#fff",
  },
  button: {
    backgroundColor: "#3C4FFF",
    padding: 15,
    borderRadius: 10,
    width: "80%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "Poppins-SemiBold",
    textAlign: "center",
  },
});

export default OnboardingScreen;
