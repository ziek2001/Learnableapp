import React, { useEffect, useState } from "react";
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView, 
  StatusBar,
  Image 
} from "react-native";
import * as Speech from "expo-speech";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [isSpeaking, setIsSpeaking] = useState(false);

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

  useEffect(() => {
    speak("Welcome to LearnAble, your inclusive learning companion!");
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        {/* HEADER / HERO */}
        <View style={styles.heroSection}>
          <View style={styles.mascotContainer}>
            <View style={styles.mascotCircle}>
              <Ionicons name="school" size={60} color="#0066CC" />
            </View>

            <Text style={styles.mascotText}>
              Click on LearnAble to hear welcome message!
            </Text>

            <TouchableOpacity
              style={styles.mascotButton}
              onPress={() =>
                speak(
                  "Welcome to LearnAble! Let's start learning together with accessible technology for everyone!"
                )
              }
            >
              <Text style={styles.mascotButtonText}>🎯 Welcome Message</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.mainTitle}>LearnAble</Text>
          <Text style={styles.subtitle}>Inclusive Learning Platform</Text>
          <Text style={styles.description}>
            Empowering children and persons with disabilities through accessible
            technology
          </Text>
        </View>

        {/* LEARNING SECTIONS */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeader}>
            Let's start with interactive learning!
          </Text>

          {/* QUIZ CARD */}
          <View style={styles.learningCard}>
            <View style={styles.cardHeader}>
              <View style={styles.iconBadge}>
                <Ionicons name="book" size={24} color="#0066CC" />
              </View>
              <Text style={styles.cardTitle}>Learning Quiz</Text>
            </View>

            <Text style={styles.cardDescription}>
              Interactive quizzes with detailed explanations and audio support
            </Text>

            <View style={styles.previewImages}>
              <Image
                source={{
                  uri:
                    "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=100",
                }}
                style={styles.previewImage}
              />
              <Image
                source={{
                  uri:
                    "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=100",
                }}
                style={styles.previewImage}
              />
              <Image
                source={{
                  uri:
                    "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=100",
                }}
                style={styles.previewImage}
              />
            </View>

            <TouchableOpacity
              style={styles.startButton}
              onPress={() => navigation.navigate("Quiz")}
            >
              <Text style={styles.startButtonText}>Start Learning Quiz</Text>
              <Ionicons name="arrow-forward" size={20} color="white" />
            </TouchableOpacity>
          </View>

          {/* SIGN LANGUAGE CARD */}
          <View style={styles.learningCard}>
            <View style={styles.cardHeader}>
              <View style={[styles.iconBadge, { backgroundColor: "#F3E5F5" }]}>
                <Ionicons name="hand-left" size={24} color="#7B1FA2" />
              </View>
              <Text style={styles.cardTitle}>Sign Language Learning</Text>
            </View>

            <Text style={styles.cardDescription}>
              Learn essential sign language with step-by-step visual guides
            </Text>

            <TouchableOpacity
              style={[styles.startButton, { backgroundColor: "#7B1FA2" }]}
              onPress={() => navigation.navigate("Sign Language")}
            >
              <Text style={styles.startButtonText}>Learn Sign Language</Text>
              <Ionicons name="arrow-forward" size={20} color="white" />
            </TouchableOpacity>
          </View>

          {/* ROUTINE CARD */}
          <View style={styles.learningCard}>
            <View style={styles.cardHeader}>
              <View style={[styles.iconBadge, { backgroundColor: "#E8F5E8" }]}>
                <Ionicons name="calendar" size={24} color="#388E3C" />
              </View>
              <Text style={styles.cardTitle}>Daily Routine Manager</Text>
            </View>

            <Text style={styles.cardDescription}>
              Organize daily tasks with helpful reminders and audio support
            </Text>

            <TouchableOpacity
              style={[styles.startButton, { backgroundColor: "#388E3C" }]}
              onPress={() => navigation.navigate("Routine")}
            >
              <Text style={styles.startButtonText}>Manage Routines</Text>
              <Ionicons name="arrow-forward" size={20} color="white" />
            </TouchableOpacity>
          </View>
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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffffff" },
  scrollContainer: { paddingHorizontal: 20, paddingBottom: 30 },

  /* HERO */
  heroSection: {
    alignItems: "center",
    paddingVertical: 30,
    borderBottomWidth: 2,
    borderBottomColor: "#E3F2FD",
    marginBottom: 30,
  },
  mascotContainer: { alignItems: "center", marginBottom: 20 },
  mascotCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#E3F2FD",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  mascotText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
    textAlign: "center",
  },
  mascotButton: {
    backgroundColor: "#0066CC",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  mascotButtonText: { color: "white", fontWeight: "600" },
  mainTitle: { fontSize: 42, fontWeight: "bold", color: "#0066CC" },
  subtitle: { fontSize: 20, fontWeight: "600", color: "#333" },
  description: {
    color: "#666",
    textAlign: "center",
    maxWidth: 300,
    marginTop: 6,
  },

  /* SECTION */
  sectionContainer: { marginTop: 10 },
  sectionHeader: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },

  /* CARDS */
  learningCard: {
    backgroundColor: "#f8f9fa",
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: "#e9ecef",
    marginBottom: 20,
  },
  cardHeader: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  iconBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E3F2FD",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  previewImages: { flexDirection: "row", gap: 8, marginBottom: 16 },
  previewImage: { width: 60, height: 50, borderRadius: 8 },
  cardTitle: { fontSize: 20, fontWeight: "bold" },
  cardDescription: { color: "#555", marginBottom: 16 },

  startButton: {
    backgroundColor: "#0066CC",
    paddingVertical: 14,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  startButtonText: { color: "white", fontWeight: "bold" },

  speakingIndicator: {
    marginTop: 16,
    backgroundColor: "#E3F2FD",
    padding: 12,
    borderRadius: 20,
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  speakingText: { color: "#0066CC", fontWeight: "600" },
});
