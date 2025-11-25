import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import * as Speech from "expo-speech";
import { Ionicons } from "@expo/vector-icons";

export default function QuizScreen() {
  // ------------------------
  // QUIZ DATA (your original)
  // ------------------------
  const [quizData, setQuizData] = useState({
    categories: ["Math", "Science", "Colors"],
    currentCategory: "Math",
    currentQuestion: 0,
    score: 0,
    questions: {
      Math: [
        {
          question: "What is 2 + 2?",
          options: ["3", "4", "5"],
          correct: 1,
          image:
            "https://static.vecteezy.com/system/resources/previews/001/942/017/non_2x/group-of-four-animals-cartoon-characters-vector.jpg",
          explanation:
            "Two plus two equals four. This is a basic addition problem.",
        },
        {
          question: "What is 5 - 3?",
          options: ["1", "2", "3"],
          correct: 1,
          image:
            "https://i.pinimg.com/736x/75/42/dc/7542dcbf7fdaf4402b7a089da29c4d32.jpg",
          explanation:
            "Five minus three equals two. This is a basic subtraction problem.",
        },
        {
          question: "What is 3 × 2?",
          options: ["5", "6", "7"],
          correct: 1,
          image:
            "https://upload.wikimedia.org/wikipedia/commons/e/e0/Dissected_rectangle-3x2.png",
          explanation:
            "Three times two equals six. This is a basic multiplication problem.",
        },
      ],

      Science: [
        {
          question: "What color is the sky?",
          options: ["Red", "Blue", "Green"],
          correct: 1,
          image:
            "https://i.pinimg.com/originals/24/08/73/240873ffd25b81318a3093f4560787ca.gif",
          explanation:
            "The sky appears blue due to the scattering of sunlight by molecules in the atmosphere.",
        },
        {
          question: "How many legs does a cat have?",
          options: ["2", "4", "6"],
          correct: 1,
          image:
            "https://assets.dochipo.com/editor/animations/cat/7f35e703-ad26-45cd-8f4f-62da09bb22e4.gif",
          explanation:
            "Cats are mammals with four legs, which help them walk, run, and climb.",
        },
        {
          question: "What do plants need to grow?",
          options: ["Water", "Fire", "Ice"],
          correct: 0,
          image:
            "https://media.giphy.com/media/d9Hhu2N1KTF0uW76WQ/giphy.gif",
          explanation:
            "Plants need water, sunlight, and nutrients from soil to grow through photosynthesis.",
        },
      ],

      Colors: [
        {
          question: "What color do you get mixing red and blue?",
          options: ["Purple", "Green", "Yellow"],
          correct: 0,
          image:
            "https://i.pinimg.com/originals/9b/36/b6/9b36b69686dbfc694ec7cb567fa6356b.gif",
          explanation:
            "When you mix red and blue paint or light, you get purple or violet.",
        },
        {
          question: "What color is the sun?",
          options: ["Blue", "Yellow", "Green"],
          correct: 1,
          image:
            "https://i.pinimg.com/originals/46/86/f3/4686f30f3b88a46402b5dcd14bd6d777.gif",
          explanation:
            "The sun appears yellow to us on Earth, though it actually emits white light.",
        },
        {
          question: "What color are most leaves?",
          options: ["Red", "Blue", "Green"],
          correct: 2,
          image:
            "https://i.pinimg.com/originals/3e/41/9d/3e419de254373fda06cd9a8213f77366.gif",
          explanation:
            "Most leaves are green because of chlorophyll, which helps plants make food from sunlight.",
        },
      ],
    },
  });

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showQuizExplanation, setShowQuizExplanation] = useState(null);

  // ------------------------
  // SPEECH HELPER
  // ------------------------
  const speak = async (text) => {
    try {
      await Speech.stop();
      setIsSpeaking(true);

      await Speech.speak(text, {
        rate: 0.9,
        pitch: 1.0,
        onDone: () => setIsSpeaking(false),
        onStopped: () => setIsSpeaking(false),
        onError: () => setIsSpeaking(false),
      });
    } catch {
      setIsSpeaking(false);
    }
  };

  // ------------------------
  // QUIZ ANSWER HANDLING
  // ------------------------
  const handleAnswerSelect = async (answerIndex) => {
    const q =
      quizData.questions[quizData.currentCategory][quizData.currentQuestion];
    const isCorrect = answerIndex === q.correct;

    setShowQuizExplanation({
      correct: isCorrect,
      explanation: q.explanation,
    });

    if (isCorrect) {
      await speak("Correct! " + q.explanation);
    } else {
      await speak("Incorrect. " + q.explanation);
    }

    setTimeout(() => {
      setQuizData((prev) => ({
        ...prev,
        score: isCorrect ? prev.score + 1 : prev.score,
        currentQuestion: prev.currentQuestion + 1,
      }));
      setShowQuizExplanation(null);
    }, 3000);
  };

  // ------------------------
  // RESET QUIZ
  // ------------------------
  const resetQuiz = () => {
    speak("Quiz reset. Let's try again!");
    setQuizData((prev) => ({
      ...prev,
      score: 0,
      currentQuestion: 0,
    }));
  };

  // ------------------------
  // QUIZ SCREEN LOGIC
  // ------------------------
  const currentQuestions = quizData.questions[quizData.currentCategory];
  const isQuizComplete =
    quizData.currentQuestion >= currentQuestions.length;

  if (isQuizComplete) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.resultCard}>
            <Text style={styles.resultEmoji}>🎉</Text>
            <Text style={styles.resultTitle}>Quiz Complete!</Text>

            <Text style={styles.resultSubtitle}>
              You completed the {quizData.currentCategory} quiz!
            </Text>

            <View style={styles.scoreCard}>
              <Text style={styles.scoreText}>Your Score</Text>
              <Text style={styles.scoreBig}>
                {quizData.score} / {currentQuestions.length}
              </Text>
              <Text style={styles.scorePercent}>
                {Math.round((quizData.score / currentQuestions.length) * 100)}%
              </Text>
            </View>

            <TouchableOpacity style={styles.primaryButton} onPress={resetQuiz}>
              <Text style={styles.primaryButtonText}>Try Again</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // ------------------------
  // MAIN QUIZ UI
  // ------------------------
  const q =
    quizData.questions[quizData.currentCategory][quizData.currentQuestion];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* TITLE */}
        <Text style={styles.pageTitle}>Learning Quiz</Text>

        {/* CATEGORY SELECTOR */}
        <View style={styles.categorySection}>
          <Text style={styles.sectionTitle}>Choose Category:</Text>

          <View style={styles.categoryButtons}>
            {quizData.categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryButton,
                  quizData.currentCategory === category &&
                    styles.activeCategoryButton,
                ]}
                onPress={() =>
                  setQuizData((prev) => ({
                    ...prev,
                    currentCategory: category,
                    currentQuestion: 0,
                    score: 0,
                  }))
                }
              >
                <Text
                  style={[
                    styles.categoryButtonText,
                    quizData.currentCategory === category &&
                      styles.activeCategoryText,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* QUESTION */}
        <View style={styles.questionCard}>
          <Text style={styles.questionNumber}>
            Question {quizData.currentQuestion + 1} of{" "}
            {currentQuestions.length}
          </Text>

          {/* IMAGE */}
          <Image source={{ uri: q.image }} style={styles.questionImage} />

          <Text style={styles.questionText}>{q.question}</Text>

          <TouchableOpacity
            style={styles.audioButton}
            onPress={() =>
              speak(
                `Question: ${q.question}. The options are: ${q.options.join(
                  ", "
                )}`
              )
            }
          >
            <Ionicons name="volume-high" size={20} color="#0066CC" />
            <Text style={styles.audioButtonText}>Listen to Question</Text>
          </TouchableOpacity>

          {/* ANSWERS */}
          {!showQuizExplanation ? (
            <View style={styles.optionsContainer}>
              <Text style={styles.optionsLabel}>Choose your answer:</Text>

              {q.options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.optionButton}
                  onPress={() => handleAnswerSelect(index)}
                >
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <View style={styles.explanationCard}>
              <Text
                style={[
                  styles.explanationResult,
                  {
                    color: showQuizExplanation.correct
                      ? "#4CAF50"
                      : "#F44336",
                  },
                ]}
              >
                {showQuizExplanation.correct ? "✔ Correct" : "✘ Incorrect"}
              </Text>

              <Text style={styles.explanationText}>
                {showQuizExplanation.explanation}
              </Text>
            </View>
          )}
        </View>

        {isSpeaking && (
          <View style={styles.speakingIndicator}>
            <Ionicons name="volume-high" size={20} color="#0066CC" />
            <Text style={styles.speakingText}>Speaking...</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

// ------------------------------
// STYLES (clean + organized)
// ------------------------------
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scrollContainer: { padding: 20 },

  pageTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0066CC",
    marginBottom: 20,
    textAlign: "center",
  },

  // CATEGORY SELECTOR
  categorySection: {
    backgroundColor: "#f8f9fa",
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#eee",
  },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 12 },
  categoryButtons: { flexDirection: "row", gap: 8 },
  categoryButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#ccc",
  },
  categoryButtonText: {
    textAlign: "center",
    fontWeight: "600",
    color: "#555",
  },
  activeCategoryButton: {
    backgroundColor: "#0066CC",
    borderColor: "#0066CC",
  },
  activeCategoryText: { color: "white" },

  // QUESTION CARD
  questionCard: {
    backgroundColor: "#f8f9fa",
    padding: 20,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#eee",
  },
  questionNumber: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0066CC",
    marginBottom: 12,
    textAlign: "center",
  },
  questionImage: {
    width: "100%",
    height: 200,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 20,
  },
  questionText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },

  audioButton: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#E3F2FD",
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  audioButtonText: {
    color: "#0066CC",
    fontWeight: "600",
  },

  optionsContainer: { gap: 12 },
  optionsLabel: {
    textAlign: "center",
    fontSize: 16,
    marginBottom: 8,
  },
  optionButton: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#eee",
  },
  optionText: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
  },

  explanationCard: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#eee",
  },
  explanationResult: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  explanationText: {
    textAlign: "center",
    fontSize: 16,
    color: "#555",
  },

  // RESULTS SCREEN
  resultCard: {
    alignItems: "center",
    padding: 20,
    borderRadius: 20,
    backgroundColor: "#f8f9fa",
    borderWidth: 2,
    borderColor: "#eee",
  },
  resultEmoji: { fontSize: 48 },
  resultTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 8,
  },
  resultSubtitle: {
    textAlign: "center",
    color: "#666",
    marginBottom: 16,
  },
  scoreCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#eee",
    alignItems: "center",
    marginBottom: 20,
  },
  scoreText: { fontSize: 16, color: "#555" },
  scoreBig: { fontSize: 36, fontWeight: "bold", color: "#0066CC" },
  scorePercent: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4CAF50",
  },

  primaryButton: {
    backgroundColor: "#0066CC",
    padding: 16,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
  },
  primaryButtonText: { color: "white", fontWeight: "bold", fontSize: 18 },

  speakingIndicator: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    alignItems: "center",
    padding: 10,
    marginTop: 20,
    backgroundColor: "#E3F2FD",
    borderRadius: 20,
  },
  speakingText: { color: "#0066CC", fontWeight: "600" },
});
