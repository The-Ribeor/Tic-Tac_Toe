// import React, { useState, useEffect } from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   Image,
//   Modal,
//   Dimensions,
// } from "react-native";
// import iconCircle from "../../assets/icons/iconCircle.png";
// import IconX from "../../assets/icons/IconX.png";
// import userHands from "../../assets/icons/userHands.png";
// import userHandUp from "../../assets/icons/userHandUp.png";
// import machineOnStandby from "../../assets/icons/machineOnStandby.png";
// import activeMachine from "../../assets/icons/activeMachine.png";
// import { Timer } from "../components/Timer";
// import { useNavigation } from "@react-navigation/native";

// const { width, height } = Dimensions.get("window");

// export const GameScreen = ({ route }) => {
//   const navigation = useNavigation();
//   const [resetTimer, setResetTimer] = useState(false);
//   const { mode } = route.params;
//   const [board, setBoard] = useState(Array(9).fill(null));
//   const [currentPlayer, setCurrentPlayer] = useState("O");
//   const [wins, setWins] = useState({ O: 0, X: 0 });
//   const [gameOver, setGameOver] = useState(false);
//   const [message, setMessage] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [winnerIcon, setWinnerIcon] = useState(null);

//   const handlePress = (index) => {
//     if (board[index] || checkWinner()) return;
//     const newBoard = [...board];
//     newBoard[index] = currentPlayer;
//     setBoard(newBoard);
//     if (!checkWinner(newBoard)) {
//       setCurrentPlayer(currentPlayer === "O" ? "X" : "O");
//     }
//   };

//   const aiMove = () => {
//     let availableSpots = board
//       .map((val, idx) => (val === null ? idx : null))
//       .filter((val) => val !== null);
//     if (availableSpots.length > 0) {
//       let randomIndex =
//         availableSpots[Math.floor(Math.random() * availableSpots.length)];
//       handlePress(randomIndex);
//     }
//   };

//   const checkWinner = (updatedBoard = board) => {
//     const winningCombos = [
//       [0, 1, 2],
//       [3, 4, 5],
//       [6, 7, 8],
//       [0, 3, 6],
//       [1, 4, 7],
//       [2, 5, 8],
//       [0, 4, 8],
//       [2, 4, 6],
//     ];
//     for (let combo of winningCombos) {
//       const [a, b, c] = combo;
//       if (
//         updatedBoard[a] &&
//         updatedBoard[a] === updatedBoard[b] &&
//         updatedBoard[a] === updatedBoard[c]
//       ) {
//         setWins((prev) => ({
//           ...prev,
//           [updatedBoard[a]]: prev[updatedBoard[a]] + 1,
//         }));
//         setGameOver(true);
//         setMessage(`¡Ha ganado!`);
//         setWinnerIcon(updatedBoard[a] === "O" ? iconCircle : IconX);
//         setShowModal(true);
//         return updatedBoard[a];
//       }
//     }
//     if (!updatedBoard.includes(null)) {
//       setGameOver(true);
//       setMessage("¡Tablas!");
//       setWinnerIcon(null);
//       setShowModal(true);
//     }
//     return null;
//   };

//   const resetGame = () => {
//     setBoard(Array(9).fill(null));
//     setCurrentPlayer("O");
//     setResetTimer((prev) => !prev);
//     setGameOver(false);
//     setMessage(null);
//     setWinnerIcon(null);
//     setShowModal(false);
//   };

//   const imageSource =
//     mode === "AI"
//       ? currentPlayer === "X"
//         ? machineOnStandby
//         : activeMachine
//       : currentPlayer === "X"
//       ? userHandUp
//       : userHands;

//   const goToGameModeScreen = () => {
//     navigation.navigate("GameModeScreen");
//     setShowModal(false);
//   };

//   useEffect(() => {
//     if (mode === "AI" && currentPlayer === "X" && !gameOver) {
//       setTimeout(() => aiMove(), 500);
//     }
//   }, [currentPlayer, gameOver]);

//   return (
//     <View style={styles.container}>
//       <Timer reset={resetTimer} gameOver={gameOver} />
//       <View style={styles.scoreBoard}>
//         <View style={styles.contentBox}>
//           <View
//             style={[
//               styles.scoreBox,
//               currentPlayer === "O" && styles.activeTurn,
//             ]}
//           >
//             <Image
//               source={currentPlayer === "O" ? userHandUp : userHands}
//               style={styles.userImage}
//             />
//             <Image source={iconCircle} style={styles.playerSheet} />
//             <Text style={styles.scoreText}>{wins.O}</Text>
//           </View>
//           <Text style={styles.userTitle}>Jugador 1</Text>
//         </View>

//         <Text style={styles.vs}>vs</Text>
//         <View style={styles.contentBox}>
//           <View
//             style={[
//               styles.scoreBox,
//               currentPlayer === "X" && styles.activeTurn,
//             ]}
//           >
//             <Image source={imageSource} style={styles.userImage} />
//             <Image source={IconX} style={styles.playerSheet} />
//             <Text style={styles.scoreText}>{wins.X}</Text>
//           </View>
//           <Text style={styles.userTitle}>
//             {mode === "AI" ? "Máquina" : "Jugador 2"}
//           </Text>
//         </View>
//       </View>
//       <View style={styles.board}>
//         {board.map((value, index) => (
//           <TouchableOpacity
//             key={index}
//             style={styles.cell}
//             onPress={() => handlePress(index)}
//           >
//             {value && (
//               <Image
//                 source={value === "O" ? iconCircle : IconX}
//                 style={styles.cellImage}
//               />
//             )}
//           </TouchableOpacity>
//         ))}
//       </View>
//       <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
//         <Text style={styles.resetText}>Reiniciar</Text>
//       </TouchableOpacity>

//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={showModal}
//         onRequestClose={() => setShowModal(false)}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             {winnerIcon ? (
//               <View style={styles.winnerIconContainer}>
//                 <Image source={winnerIcon} style={styles.winnerIcon} />
//                 <Text style={styles.modalTitle}>¡Ha ganado!</Text>
//               </View>
//             ) : (
//               <Text style={styles.modalTitle}>{message}</Text>
//             )}
//             <Text style={styles.modalSubtitle}>
//               {message === "¡Tablas!"
//                 ? "Ambos jugaron bien."
//                 : `Eres el campeón del${"\n"}Tic Tac Toe.`}
//             </Text>
//             <TouchableOpacity style={styles.modalButton} onPress={resetGame}>
//               <Text style={styles.modalButtonText}>¿Otra ronda?</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.modalFooterButton}
//               onPress={goToGameModeScreen}
//             >
//               <Text style={styles.modalFooterButtonText}>Salir del juego</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#191B1F",
//     padding: 10,
//   },
//   contentBox: {
//     alignItems: "center",
//     width: "40%", // Ancho relativo para ambos lados
//   },
//   userTitle: {
//     color: "#FFF",
//     fontSize: 13,
//     fontFamily: "Poppins-Semibold",
//     marginTop: 10,
//     backgroundColor: "#252A34",
//     padding: 8,
//     borderRadius: 20,
//     textAlign: "center",
//   },
//   scoreBoard: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     width: "90%", // Ancho relativo
//     marginBottom: 20,
//   },

//   scoreBox: {

//     padding:15,
//     borderRadius: 50, // Ajustar el borderRadius para mantener la forma
//     backgroundColor: "#252A34",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   vs: {
//     color: "#FFF",
//     fontSize: 20,
//     fontFamily: "Poppins-Bold",
//   },
//   userImage: {
//     width: width * 0.09, // 9% del ancho de la pantalla
//     height: width * 0.09,
//     aspectRatio: 1, // Proporción cuadrada
//     marginBottom: 10,
//   },
//   playerSheet: {
//     width: width * 0.10, // 10% del ancho de la pantalla
//     height: width * 0.10, // Mantener proporción cuadrada
//     marginBottom: height * 0.01
//   },
//   activeTurn: {
//     borderColor: "#FFD700",
//     borderWidth: 1,
//   },
//   scoreText: {
//     color: "#FFF",
//     fontSize: 20,
//     fontFamily: "Poppins-Bold",
//   },
//   board: {
//     width: "90%",
//     aspectRatio: 1,
//     flexDirection: "row",
//     flexWrap: "wrap",
//     backgroundColor: "#252A34",
//     borderRadius: 20,
//     padding: 10,
//     justifyContent: "center",
//     alignItems: "center",
//     gap: 10,
//   },
//   cell: {
//     width: "30%",
//     aspectRatio: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 20,
//     backgroundColor: "#161A22",
//   },
//   cellImage: {
//     width: "80%",
//     aspectRatio: 1,
//   },
//   resetButton: {
//     marginTop: 10,
//     padding: 10,
//     width: "40%",
//     backgroundColor: "#3C4FFF",
//     borderRadius: 10,
//   },
//   resetText: {
//     textAlign: "center",
//     color: "#FFF",
//     fontFamily: "Poppins-Semibold",
//     fontSize: 16,
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//   },
//   modalContent: {
//     width: "90%",
//     backgroundColor: "#252A34",
//     borderRadius: 20,
//     padding: 20,
//     alignItems: "center",
//   },
//   modalTitle: {
//     color: "#FFF",
//     fontSize: 30,
//     fontFamily: "Poppins-Bold",
//     marginVertical: 10,
//   },
//   modalSubtitle: {
//     color: "#FFF",
//     fontSize: 18,
//     fontFamily: "Poppins-Bold",
//     marginVertical: 10,
//     textAlign: "center",
//   },
//   modalButton: {
//     width: "100%",
//     backgroundColor: "#3C4FFF",
//     padding: 10,
//     borderRadius: 10,
//     alignItems: "center",
//     marginVertical: 10,
//   },
//   modalButtonText: {
//     color: "#FFF",
//     fontSize: 18,
//     fontFamily: "Poppins-Semibold",
//   },
//   modalFooterButton: {
//     width: "100%",
//     marginTop: 10,
//     borderWidth: 1,
//     borderColor: "#fff",
//     padding: 5,
//     borderRadius: 20,
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   modalFooterButtonText: {
//     color: "#FFF",
//     fontSize: 16,
//     fontFamily: "Poppins-Semibold",
//   },
//   winnerIconContainer: {
//     alignItems: "center",
//   },
//   winnerIcon: {
//     width: 50,
//     height: 50,
//     resizeMode: "contain",
//     marginBottom: 10,
//   },
// });

import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal,
  Dimensions,
  ScrollView,
  SafeAreaView,
} from "react-native";
import iconCircle from "../../assets/icons/iconCircle.png";
import IconX from "../../assets/icons/IconX.png";
import userHands from "../../assets/icons/userHands.png";
import userHandUp from "../../assets/icons/userHandUp.png";
import machineOnStandby from "../../assets/icons/machineOnStandby.png";
import activeMachine from "../../assets/icons/activeMachine.png";
import { Timer } from "../components/Timer";
import { useNavigation } from "@react-navigation/native";
import { Footer } from "../components/Footer";

const { width, height } = Dimensions.get("window");

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
    setShowModal(false);
  };

  useEffect(() => {
    if (mode === "AI" && currentPlayer === "X" && !gameOver) {
      setTimeout(() => aiMove(), 500);
    }
  }, [currentPlayer, gameOver]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        bounces={false}
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
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
        
      </ScrollView>

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
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#191B1F",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    paddingBottom: 20,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#191B1F",
    padding: 10,
  },
  contentBox: {
    alignItems: "center",
    width: "40%", // Ancho relativo para ambos lados
  },
  userTitle: {
    color: "#FFF",
    fontSize: 13,
    fontFamily: "Poppins-Semibold",
    marginTop: 10,
    backgroundColor: "#252A34",
    padding: 8,
    borderRadius: 20,
    textAlign: "center",
  },
  scoreBoard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%", // Ancho relativo
    marginBottom: 20,
  },
  scoreBox: {
    padding: 15,
    borderRadius: 50, // Ajustar el borderRadius para mantener la forma
    backgroundColor: "#252A34",
    alignItems: "center",
    justifyContent: "center",
  },
  vs: {
    color: "#FFF",
    fontSize: 20,
    fontFamily: "Poppins-Bold",
  },
  userImage: {
    width: width * 0.09, // 9% del ancho de la pantalla
    height: width * 0.09,
    aspectRatio: 1, // Proporción cuadrada
    marginBottom: 10,
  },
  playerSheet: {
    width: width * 0.1, // 10% del ancho de la pantalla
    height: width * 0.1, // Mantener proporción cuadrada
    marginBottom: height * 0.01,
  },
  activeTurn: {
    borderColor: "#FFD700",
    borderWidth: 1,
  },
  scoreText: {
    color: "#FFF",
    fontSize: 20,
    fontFamily: "Poppins-Bold",
  },
  board: {
    width: "90%",
    aspectRatio: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#252A34",
    borderRadius: 20,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  cell: {
    width: "30%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#161A22",
  },
  cellImage: {
    width: "80%",
    aspectRatio: 1,
  },
  resetButton: {
    marginTop: 10,
    padding: 10,
    width: "40%",
    backgroundColor: "#3C4FFF",
    borderRadius: 10,
    marginBottom:35
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
    width: "90%",
    backgroundColor: "#252A34",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    color: "#FFF",
    fontSize: 30,
    fontFamily: "Poppins-Bold",
    marginVertical: 10,
  },
  modalSubtitle: {
    color: "#FFF",
    fontSize: 18,
    fontFamily: "Poppins-Bold",
    marginVertical: 10,
    textAlign: "center",
  },
  modalButton: {
    width: "100%",
    backgroundColor: "#3C4FFF",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
  },
  modalButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontFamily: "Poppins-Semibold",
  },
  modalFooterButton: {
    width: "100%",
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#fff",
    padding: 5,
    borderRadius: 20,
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
    width: 50,
    height: 50,
    resizeMode: "contain",
    marginBottom: 10,
  },
});
