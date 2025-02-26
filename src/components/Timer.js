import React, { useState, useEffect } from "react";
import { Text, StyleSheet } from "react-native";

export const Timer = ({ reset, gameOver }) => {
  const [seconds, setSeconds] = useState(0);

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

  return <Text style={styles.timer}>{formatTime()}</Text>;
};

const styles = StyleSheet.create({
  timer: {
    color: "#FFF",
    fontSize: 32,
    marginBottom: 5,
    fontFamily: "Poppins-Bold",
  },
});
