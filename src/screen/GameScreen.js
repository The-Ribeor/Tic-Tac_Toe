import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal,
} from "react-native";
import iconCircle from "../../assets/icons/iconCircle.png";
import IconX from "../../assets/icons/IconX.png";
import userHands from "../../assets/icons/userHands.png";
import userHandUp from "../../assets/icons/userHandUp.png";
import machineOnStandby from "../../assets/icons/machineOnStandby.png";
import activeMachine from "../../assets/icons/activeMachine.png";
import { Footer } from "../components/Footer";
import { Timer } from "../components/Timer";
import { useNavigation } from "@react-navigation/native";

export const GameScreen = ({ route }) => {
  const navigation = useNavigation();
  const [resetTimer, setResetTimer] = useState(false);
  const { mode } = route.params;
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState("O");
  const [wins, setWins] = useState({ O: 0, X: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [winnerIcon, setWinnerIcon] = useState(null);

  const handlePress = (index) => {
    if (board[index] || checkWinner()) return;
    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    if (!checkWinner(newBoard)) {
      setCurrentPlayer(currentPlayer === "O" ? "X" : "O");
    }
  };

  const aiMove = () => {
    let availableSpots = board
      .map((val, idx) => (val === null ? idx : null))
      .filter((val) => val !== null);
    if (availableSpots.length > 0) {
      let randomIndex =
        availableSpots[Math.floor(Math.random() * availableSpots.length)];
      handlePress(randomIndex);
    }
  };

  const checkWinner = (updatedBoard = board) => {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let combo of winningCombos) {
      const [a, b, c] = combo;
      if (
        updatedBoard[a] &&
        updatedBoard[a] === updatedBoard[b] &&
        updatedBoard[a] === updatedBoard[c]
      ) {
        setWins((prev) => ({
          ...prev,
          [updatedBoard[a]]: prev[updatedBoard[a]] + 1,
        }));
        setGameOver(true);
        setMessage(`¡Ha ganado!`);
        setWinnerIcon(updatedBoard[a] === "O" ? iconCircle : IconX);
        setShowModal(true);
        return updatedBoard[a];
      }
    }
    if (!updatedBoard.includes(null)) {
      setGameOver(true);
      setMessage("¡Tablas!");
      setWinnerIcon(null);
      setShowModal(true);
    }
    return null;
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("O");
    setResetTimer((prev) => !prev);
    setGameOver(false);
    setMessage(null);
    setWinnerIcon(null);
    setShowModal(false);
  };

  const imageSource =
    mode === "AI"
      ? currentPlayer === "X"
        ? machineOnStandby
        : activeMachine
      : currentPlayer === "X"
      ? userHandUp
      : userHands;

  const goToGameModeScreen = () => {
    navigation.navigate("GameModeScreen");
    setShowModal(false)
  };

  useEffect(() => {
    if (mode === "AI" && currentPlayer === "X" && !gameOver) {
      setTimeout(() => aiMove(), 500);
    }
  }, [currentPlayer, gameOver]);

  return (
    <View style={styles.container}>
      <Timer reset={resetTimer} gameOver={gameOver} />
      <View style={styles.scoreBoard}>
        <View style={styles.contentBox}>
          <View
            style={[
              styles.scoreBox,
              currentPlayer === "O" && styles.activeTurn,
            ]}
          >
            <Image
              source={currentPlayer === "O" ? userHandUp : userHands}
              style={styles.userImage}
            />
            <Image source={iconCircle} style={styles.playerSheet} />
            <Text style={styles.scoreText}>{wins.O}</Text>
          </View>
          <Text style={styles.userTitle}>Jugador 1</Text>
        </View>

        <Text style={styles.vs}>vs</Text>
        <View style={styles.contentBox}>
          <View
            style={[
              styles.scoreBox,
              currentPlayer === "X" && styles.activeTurn,
            ]}
          >
            <Image source={imageSource} style={styles.userImage} />
            <Image source={IconX} style={styles.playerSheet} />
            <Text style={styles.scoreText}>{wins.X}</Text>
          </View>
          <Text style={styles.userTitle}>
            {mode === "AI" ? "Máquina" : "Jugador 2"}
          </Text>
        </View>
      </View>
      <View style={styles.board}>
        {board.map((value, index) => (
          <TouchableOpacity
            key={index}
            style={styles.cell}
            onPress={() => handlePress(index)}
          >
            {value && (
              <Image
                source={value === "O" ? iconCircle : IconX}
                style={styles.cellImage}
              />
            )}
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
        <Text style={styles.resetText}>Reiniciar</Text>
      </TouchableOpacity>
      <Footer />

      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {winnerIcon ? (
              <View style={styles.winnerIconContainer}>
                <Image source={winnerIcon} style={styles.winnerIcon} />
                <Text style={styles.modalTitle}>¡Ha ganado!</Text>
              </View>
            ) : (
              <Text style={styles.modalTitle}>{message}</Text>
            )}
            <Text style={styles.modalSubtitle}>
              {message === "¡Tablas!"
                ? "Ambos jugaron bien."
                : `Eres el campeón del${"\n"}Tic Tac Toe.`}
            </Text>
            <TouchableOpacity style={styles.modalButton} onPress={resetGame}>
              <Text style={styles.modalButtonText}>¿Otra ronda?</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalFooterButton}
              onPress={goToGameModeScreen}
            >
              <Text style={styles.modalFooterButtonText}>Salir del juego</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#191B1F",
    padding: 20,
  },
  contentBox: {
    alignItems: "center",
  },
  userTitle: {
    color: "#FFF",
    fontSize: 13,
    fontFamily: "Poppins-Semibold",
    marginTop: 15,
    backgroundColor: "#252A34",
    padding: 12,
    borderRadius: 20,
  },
  scoreBoard: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "80%",
    marginBottom: 20,
  },
  scoreBox: {
    width: 86,
    height: 148,
    borderRadius: 50,
    backgroundColor: "#252A34",
    alignItems: "center",
    justifyContent: "center",
  },
  vs: {
    color: "#FFF",
    fontSize: 25,
    fontFamily: "Poppins-Bold",
  },
  userImage: {
    width: 39,
    height: 38,
    marginBottom: 15,
  },
  playerSheet: {
    width: 30,
    height: 30,
  },
  activeTurn: {
    borderColor: "#FFD700",
    borderWidth: 1,
  },
  scoreText: {
    color: "#FFF",
    fontSize: 25,
    fontFamily: "Poppins-Bold",
  },
  board: {
    width: "100%",
    height: 380,
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#252A34",
    borderRadius: 25,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
  },
  cell: {
    width: 95,
    height: 95,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    backgroundColor: "#161A22",
    margin: 5,
  },
  cellImage: {
    width: 69,
    height: 69,
    resizeMode: "contain",
  },
  resetButton: {
    marginTop: 20,
    padding: 10,
    width: "30%",
    backgroundColor: "#3C4FFF",
    borderRadius: 5,
  },
  resetText: {
    textAlign: "center",
    color: "#FFF",
    fontFamily: "Poppins-Semibold",
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#252A34",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    color: "#FFF",
    fontSize: 47,
    fontFamily: "Poppins-Bold",
    marginVertical: 20,
  },
  modalSubtitle: {
    color: "#FFF",
    fontSize: 23,
    fontFamily: "Poppins-Bold",
    marginVertical: 20,
    textAlign: "center",
  },
  modalButton: {
    width: "100%",
    backgroundColor: "#3C4FFF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 20,
  },
  modalButtonText: {
    color: "#FFF",
    fontSize: 20,
    fontFamily: "Poppins-Semibold",
  },
  modalFooterButton: {
    width: "100%",
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#fff",
    padding: 5,
    borderRadius: 23,
    alignItems: "center",
    marginBottom: 10,
  },
  modalFooterButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontFamily: "Poppins-Semibold",
  },
  winnerIconContainer: {
    alignItems: "center",
  },
  winnerIcon: {
    width: 69,
    height: 69,
    resizeMode: "contain",
    marginBottom: 10,
  },
});
