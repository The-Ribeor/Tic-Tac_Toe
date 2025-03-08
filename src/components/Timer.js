import React, { useState, useEffect } from "react";
import { Text, StyleSheet, Dimensions } from "react-native";

// Obtenemos las dimensiones de la pantalla
const { width, height } = Dimensions.get("window");

// Función para calcular tamaños responsivos
const responsiveFontSize = (size) => {
  // Tomamos la menor dimensión para que sea responsivo tanto en portrait como landscape
  const screenSize = Math.min(width, height);
  // Base del cálculo en un dispositivo estándar (375 es aproximadamente el ancho de un iPhone 8)
  const baseSize = 375;
  // Factor de escala con un valor mínimo para evitar fuentes demasiado pequeñas
  return Math.max(size * (screenSize / baseSize), size * 0.7);
};

export const Timer = ({ reset, gameOver }) => {
  const [seconds, setSeconds] = useState(0);
  const [dimensions, setDimensions] = useState({ width, height });

  // Listener para cambios de dimensión (rotación de pantalla)
  useEffect(() => {
    const updateDimensions = () => {
      const { width: newWidth, height: newHeight } = Dimensions.get("window");
      setDimensions({ width: newWidth, height: newHeight });
    };

    const subscription = Dimensions.addEventListener(
      "change",
      updateDimensions
    );

    return () => {
      // Versiones más recientes de React Native
      if (subscription?.remove) {
        subscription.remove();
      } else {
        // Para versiones antiguas de React Native
        Dimensions.removeEventListener("change", updateDimensions);
      }
    };
  }, []);

  useEffect(() => {
    if (reset) {
      setSeconds(0);
    }
  }, [reset]);

  useEffect(() => {
    let interval;
    if (!gameOver) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameOver]);

  const formatTime = () => {
    const minutes = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${minutes}:${secs}`;
  };

  return (
    <Text style={[styles.timer, { fontSize: responsiveFontSize(32) }]}>
      {formatTime()}
    </Text>
  );
};

const styles = StyleSheet.create({
  timer: {
    color: "#FFF",
    marginBottom: 5,
    fontFamily: "Poppins-Bold",
    // La propiedad fontSize se aplicará dinámicamente
  },
});
