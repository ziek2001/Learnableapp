import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Alert,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Speech from "expo-speech";

/**
 * RoutineScreen (full version)
 *
 * Features:
 * - Add / edit / delete routines
 * - Toggle complete / incomplete
 * - Voice feedback (TTS) on actions and long-press
 * - Progress summary (completed / remaining / total)
 * - Confirmation on delete
 * - Local state only (no persistence). If you want persistence, I can add AsyncStorage or integrate with backend.
 */

type Routine = {
  id: number;
  task: string;
  time: string;
  completed: boolean;
};

export default function RoutineScreen() {
  const [routines, setRoutines] = useState<Routine[]>([
    { id: 1, task: "Brush teeth", time: "08:00", completed: false },
    { id: 2, task: "Take medicine", time: "12:00", completed: false },
    { id: 3, task: "Study time", time: "15:00", completed: false },
  ]);

  const [newTask, setNewTask] = useState("");
  const [newTime, setNewTime] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // TTS helper
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
    } catch (err) {
      console.warn("TTS error:", err);
      setIsSpeaking(false);
    }
  };

  // Add or update routine
  const handleAddOrUpdate = async () => {
    if (!newTask.trim() || !newTime.trim()) {
      await speak("Please fill in both task and time.");
      Alert.alert("Validation", "Please fill in both task and time.");
      return;
    }

    if (editingId) {
      setRoutines((prev) =>
        prev.map((r) =>
          r.id === editingId ? { ...r, task: newTask.trim(), time: newTime.trim() } : r
        )
      );
      await speak("Routine updated successfully.");
      setEditingId(null);
    } else {
      const newRoutine: Routine = {
        id: Date.now(),
        task: newTask.trim(),
        time: newTime.trim(),
        completed: false,
      };
      setRoutines((prev) => [...prev, newRoutine]);
      await speak("New routine added successfully.");
    }

    setNewTask("");
    setNewTime("");
  };

  // Start editing
  const startEdit = (r: Routine) => {
    setEditingId(r.id);
    setNewTask(r.task);
    setNewTime(r.time);
    speak("Editing routine " + r.task);
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
    setNewTask("");
    setNewTime("");
    speak("Edit cancelled.");
  };

  // Delete with confirmation
  const deleteRoutine = (id: number) => {
    const r = routines.find((x) => x.id === id);
    if (!r) return;

    Alert.alert("Delete Task", `Are you sure you want to delete "${r.task}"?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          setRoutines((prev) => prev.filter((x) => x.id !== id));
          speak(`${r.task} deleted.`);
        },
      },
    ]);
  };

  // Toggle completed
  const toggleComplete = async (id: number) => {
    const r = routines.find((x) => x.id === id);
    if (!r) return;
    const newStatus = !r.completed;

    setRoutines((prev) => prev.map((x) => (x.id === id ? { ...x, completed: newStatus } : x)));

    if (newStatus) {
      await speak(`Great job! ${r.task} completed!`);
    } else {
      await speak(`${r.task} marked as not completed`);
    }
  };

  // Long-press speak
  const describeRoutine = async (id: number) => {
    const r = routines.find((x) => x.id === id);
    if (!r) return;
    await speak(`${r.task} at ${r.time}. ${r.completed ? "Completed" : "Not completed"}`);
  };

  // Progress derived values
  const completedCount = routines.filter((r) => r.completed).length;
  const remainingCount = routines.filter((r) => !r.completed).length;

  useEffect(() => {
    // welcome or screen mount voice
    speak("Daily Routine Manager loaded.");
    return () => {
      Speech.stop();
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Text style={styles.title}>Daily Routine Manager</Text>
          <Text style={styles.subtitle}>Organize daily tasks with reminders and voice feedback</Text>
        </View>

        {/* Progress Card */}
        <View style={styles.progressCard}>
          <Text style={styles.progressTitle}>Today's Progress</Text>
          <View style={styles.progressRow}>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>{completedCount}</Text>
              <Text style={styles.statLabel}>Completed</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>{remainingCount}</Text>
              <Text style={styles.statLabel}>Remaining</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>{routines.length}</Text>
              <Text style={styles.statLabel}>Total</Text>
            </View>
          </View>
        </View>

        {/* Add / Edit Form */}
        <View style={styles.formCard}>
          <Text style={styles.formTitle}>{editingId ? "Edit Task" : "Add New Task"}</Text>

          {editingId && (
            <View style={styles.editingRow}>
              <Text style={styles.editingText}>
                Editing: {routines.find((r) => r.id === editingId)?.task}
              </Text>
              <TouchableOpacity onPress={cancelEdit} style={styles.cancelBtn}>
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          )}

          <Text style={styles.label}>Task name</Text>
          <TextInput
            placeholder="e.g., Brush teeth"
            value={newTask}
            onChangeText={setNewTask}
            style={styles.input}
            returnKeyType="done"
          />

          <Text style={styles.label}>Time</Text>
          <TextInput
            placeholder="e.g., 08:00"
            value={newTime}
            onChangeText={setNewTime}
            style={styles.input}
            returnKeyType="done"
          />

          <TouchableOpacity style={styles.addBtn} onPress={handleAddOrUpdate}>
            <Ionicons name={editingId ? "checkmark" : "add"} size={20} color="#fff" />
            <Text style={styles.addBtnText}>{editingId ? "Update Task" : "Add Task"}</Text>
          </TouchableOpacity>
        </View>

        {/* Routine List */}
        <View style={styles.listCard}>
          <Text style={styles.listTitle}>Your Daily Tasks</Text>

          {routines.length === 0 && (
            <Text style={styles.emptyText}>No routines yet. Add your first task above.</Text>
          )}

          {routines.map((r) => (
            <TouchableOpacity
              key={r.id}
              activeOpacity={0.9}
              onLongPress={() => describeRoutine(r.id)}
              style={[styles.routineRow, r.completed && styles.routineCompleted]}
            >
              <TouchableOpacity style={[styles.checkbox, r.completed && styles.checkOn]} onPress={() => toggleComplete(r.id)}>
                {r.completed && <Ionicons name="checkmark" size={16} color="#fff" />}
              </TouchableOpacity>

              <View style={styles.routineContent}>
                <Text style={[styles.routineTask, r.completed && styles.taskDone]}>{r.task}</Text>
                <Text style={styles.routineTime}>{r.time}</Text>
              </View>

              <View style={styles.actions}>
                <TouchableOpacity style={styles.iconBtn} onPress={() => speak(`Reminder: ${r.task} at ${r.time}`)}>
                  <Ionicons name="notifications-outline" size={20} color="#388E3C" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.iconBtn} onPress={() => startEdit(r)}>
                  <Ionicons name="create-outline" size={20} color="#FF9800" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.iconBtn} onPress={() => deleteRoutine(r.id)}>
                  <Ionicons name="trash-outline" size={20} color="#F44336" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {isSpeaking && (
          <View style={styles.speaking}>
            <Ionicons name="volume-high" size={18} color="#0066CC" />
            <Text style={styles.speakingText}>Speaking...</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

/* ------------------------------
   Styles
   ------------------------------ */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scrollContainer: { padding: 20, paddingBottom: 40 },

  header: { marginBottom: 16 },
  title: { fontSize: 26, fontWeight: "bold", color: "#0066CC" },
  subtitle: { color: "#666", marginTop: 6 },

  progressCard: {
    backgroundColor: "#E8F5E8",
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#e6f4ea",
    marginBottom: 16,
  },
  progressTitle: { fontSize: 16, fontWeight: "bold", color: "#388E3C", textAlign: "center", marginBottom: 10 },
  progressRow: { flexDirection: "row", justifyContent: "space-around" },
  stat: { alignItems: "center" },
  statNumber: { fontSize: 22, fontWeight: "bold", color: "#388E3C" },
  statLabel: { fontSize: 12, color: "#666", marginTop: 4 },

  formCard: {
    backgroundColor: "#f8f9fa",
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#eee",
    marginBottom: 16,
  },
  formTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  editingRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  editingText: { color: "#F57C00", fontWeight: "600" },
  cancelBtn: { backgroundColor: "#FF9800", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  cancelBtnText: { color: "white", fontWeight: "600" },

  label: { marginTop: 8, fontWeight: "600", marginBottom: 6 },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e9ecef",
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 8,
  },

  addBtn: {
    marginTop: 8,
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  addBtnText: { color: "#fff", fontWeight: "700" },

  listCard: {
    backgroundColor: "#f8f9fa",
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#eee",
  },
  listTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },

  emptyText: { color: "#666", textAlign: "center", paddingVertical: 10 },

  routineRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#eee",
  },
  routineCompleted: { backgroundColor: "#E8F5E8" },

  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "#ccc",
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  checkOn: { backgroundColor: "#4CAF50", borderColor: "#4CAF50" },

  routineContent: { flex: 1 },
  routineTask: { fontSize: 16, fontWeight: "600", color: "#333" },
  taskDone: { textDecorationLine: "line-through", color: "#4CAF50" },
  routineTime: { color: "#666", marginTop: 4 },

  actions: { flexDirection: "row", gap: 8, marginLeft: 8 },
  iconBtn: { padding: 6, borderRadius: 8, backgroundColor: "rgba(255,255,255,0.8)" },

  speaking: {
    marginTop: 18,
    backgroundColor: "#E3F2FD",
    padding: 10,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    justifyContent: "center",
  },
  speakingText: { color: "#0066CC", fontWeight: "600" },
});
