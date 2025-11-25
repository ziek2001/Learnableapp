import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Speech from "expo-speech";

export default function SignLanguageScreen() {
  const [selectedSign, setSelectedSign] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // ---------------------------------------------------------
  // SPEECH CONTROLLER
  // ---------------------------------------------------------
  const speak = async (text: string) => {
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

  // ---------------------------------------------------------
  // SIGN LANGUAGE DATA
  // ---------------------------------------------------------
  const signLanguageData = [
    {
      label: "A",
      image:
        "https://i.pinimg.com/originals/31/14/70/311470611e40e330ed6060248819482a.gif",
      pronunciation: "Letter A",
    },
    {
      label: "B",
      image:
        "https://i.pinimg.com/originals/4b/31/f0/4b31f01f615b9f16fab41991194b7a5b.gif",
      pronunciation: "Letter B",
    },
    {
      label: "C",
      image:
        "https://i.pinimg.com/originals/1a/49/6c/1a496cbb6df87592ca9f5ad7881e5341.gif",
      pronunciation: "Letter C",
    },
    {
      label: "D",
      image:
        "https://i.pinimg.com/originals/54/ed/72/54ed729165fc0d6cb44c36a3acae4dab.gif",
      pronunciation: "Letter D",
    },
    {
      label: "E",
      image:
        "https://i.pinimg.com/originals/4b/31/f0/4b31f01f615b9f16fab41991194b7a5b.gif",
      pronunciation: "Letter E",
    },
    {
      label: "F",
      image:
        "https://i.pinimg.com/originals/c3/28/83/c328832cd6d36bc8103dc678f368c3e6.gif",
      pronunciation: "Letter F",
    },
    {
      label: "G",
      image:
        "https://i.pinimg.com/originals/53/fa/82/53fa8297b6e33ad773abd11e6f230bb2.gif",
      pronunciation: "Letter G",
    },
    {
      label: "H",
      image:
        "https://i.pinimg.com/originals/bd/65/e1/bd65e15092dfef4757753ba67c7a606b.gif",
      pronunciation: "Letter H",
    },
    {
      label: "I",
      image:
        "https://i.pinimg.com/originals/2e/fb/d7/2efbd775005f07f3ada594086e64e9d6.gif",
      pronunciation: "Letter I",
    },
    {
      label: "J",
      image:
        "https://i.pinimg.com/originals/fe/3f/ca/fe3fca777364a7123ec1d214fcf4dce5.gif",
      pronunciation: "Letter J",
    },
    {
      label: "K",
      image:
        "https://i.pinimg.com/originals/77/3a/b0/773ab0275e1fc49b4f8cc6d4fbdcb0f6.gif",
      pronunciation: "Letter K",
    },
    {
      label: "L",
      image:
        "https://i.pinimg.com/originals/18/87/e0/1887e00ebd97e7802cdfccd27f903961.gif",
      pronunciation: "Letter L",
    },
    {
      label: "M",
      image:
        "https://i.pinimg.com/originals/d9/29/62/d929627b8588e2b28a39b40a7fdb3a2f.gif",
      pronunciation: "Letter M",
    },
    {
      label: "N",
      image:
        "https://i.pinimg.com/originals/23/38/1a/23381ae1441d9329111dbd71949e8578.gif",
      pronunciation: "Letter N",
    },
    {
      label: "O",
      image:
        "https://i.pinimg.com/originals/18/8e/4f/188e4f5796d57c00c9d39c9e2cca1f4b.gif",
      pronunciation: "Letter O",
    },
    {
      label: "P",
      image:
        "https://i.pinimg.com/originals/79/0e/96/790e9670cc0f4fb9fbbe8d637354f16a.gif",
      pronunciation: "Letter P",
    },
    {
      label: "Q",
      image:
        "https://i.pinimg.com/originals/e8/7a/a3/e87aa35419a61c17b9f9a4db2e3fbf15.gif",
      pronunciation: "Letter Q",
    },
    {
      label: "R",
      image:
        "https://i.pinimg.com/originals/2f/18/d1/2f18d1bed3a948cfc55a08ebe1d071c8.gif",
      pronunciation: "Letter R",
    },
    {
      label: "S",
      image:
        "https://i.pinimg.com/originals/f6/3e/f5/f63ef559f024b00e3238673d32ffa7b5.gif",
      pronunciation: "Letter S",
    },
    {
      label: "T",
      image:
        "https://i.pinimg.com/originals/40/cc/e2/40cce2c5088cc03b1ffc8f7e0fa685fe.gif",
      pronunciation: "Letter T",
    },
    {
      label: "U",
      image:
        "https://i.pinimg.com/originals/eb/ba/94/ebba944e28109ab0c8d05f3ca3f3fe57.gif",
      pronunciation: "Letter U",
    },
    {
      label: "V",
      image:
        "https://i.pinimg.com/originals/c8/fc/da/c8fcdae021feba78fb46f221e026149f.gif",
      pronunciation: "Letter V",
    },
    {
      label: "W",
      image:
        "https://i.pinimg.com/originals/c6/3d/c1/c63dc12518f939651c1b3d39fa7ac84b.gif",
      pronunciation: "Letter W",
    },
    {
      label: "X",
      image:
        "https://i.pinimg.com/originals/a1/40/0d/a1400deea4f0b7ed9d658ffd29d445df.gif",
      pronunciation: "Letter X",
    },
    {
      label: "Y",
      image:
        "https://i.pinimg.com/originals/df/44/dc/df44dce9c341720db02f4a7d564247a2.gif",
      pronunciation: "Letter Y",
    },
    {
      label: "Z",
      image:
        "https://i.pinimg.com/originals/51/da/30/51da30ffc522245a5b98aba6a701e577.gif",
      pronunciation: "Letter Z",
    },
  ];

  // ---------------------------------------------------------
  // UI
  // ---------------------------------------------------------
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Sign Language Learning</Text>
        <Text style={styles.subtitle}>
          Tap a letter to see its sign representation
        </Text>

        {/* Grid of Sign Buttons */}
        <View style={styles.grid}>
          {signLanguageData.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.signButton}
              onPress={() => setSelectedSign(item)}
            >
              <Text style={styles.signLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Expanded Selected Sign */}
        {selectedSign && (
          <View style={styles.signCard}>
            <Text style={styles.signCardLabel}>
              Letter: {selectedSign.label}
            </Text>

            <Image
              source={{ uri: selectedSign.image }}
              style={styles.signImage}
            />

            <TouchableOpacity
              style={styles.audioButton}
              onPress={() => speak(selectedSign.pronunciation)}
            >
              <Ionicons name="volume-high" size={20} color="#0066CC" />
              <Text style={styles.audioButtonText}>Hear Pronunciation</Text>
            </TouchableOpacity>
          </View>
        )}

        {isSpeaking && (
          <View style={styles.speakingIndicator}>
            <Ionicons name="volume-high" size={18} color="#0066CC" />
            <Text style={styles.speakingText}>Speaking...</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

// ---------------------------------------------------------
// STYLES
// ---------------------------------------------------------
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scroll: { padding: 20, paddingBottom: 50 },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0066CC",
    textAlign: "center",
    marginBottom: 10,
  },

  subtitle: {
    textAlign: "center",
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
    marginBottom: 20,
  },

  signButton: {
    width: 50,
    height: 50,
    backgroundColor: "#E3F2FD",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  signLabel: { fontSize: 20, fontWeight: "bold", color: "#0066CC" },

  signCard: {
    backgroundColor: "#f8f9fa",
    padding: 20,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#eee",
    alignItems: "center",
  },

  signCardLabel: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
  },

  signImage: {
    width: 250,
    height: 250,
    marginBottom: 15,
    backgroundColor: "#fff",
    borderRadius: 12,
  },

  audioButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#E3F2FD",
    padding: 10,
    borderRadius: 10,
  },

  audioButtonText: {
    color: "#0066CC",
    fontWeight: "600",
  },

  speakingIndicator: {
    marginTop: 20,
    padding: 10,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
    backgroundColor: "#E3F2FD",
  },

  speakingText: {
    color: "#0066CC",
    fontWeight: "600",
  },
});
