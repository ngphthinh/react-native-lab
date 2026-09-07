import React, {
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
  Keyboard,
  StatusBar,
} from "react-native";
import { initialState, todoReducer } from "../store/todoReducer";
import { Work } from "../types/work.type";
import { ThemeContext } from "./HomeScreen"; // Import ThemeContext từ HomeScreen

const TodoScreen = memo(() => {
  const [work, setWork] = useState("");
  const [keyWord, setKeyword] = useState("");
  const [state, dispatch] = useReducer(todoReducer, initialState);

  // Lấy giá trị isDarkMode và toggleTheme từ ThemeContext
  const theme = useContext(ThemeContext);
  const isDark = theme?.isDarkMode ?? false;

  const handleAddTodo = () => {
    if (work.trim()) {
      dispatch({ type: "ADD_TODO", payload: work.trim() });
      setWork("");
      Keyboard.dismiss();
    }
  };

  const handleToggle = useCallback(
    (id: string) => dispatch({ type: "TOGGLE_TODO", payload: id }),
    [],
  );

  const handleDelete = useCallback(
    (id: string) => dispatch({ type: "DELETE_TODO", payload: id }),
    [],
  );

  const filtered = useMemo(() => {
    return state.works.filter((e) =>
      e.title.toLowerCase().includes(keyWord.toLowerCase()),
    );
  }, [state.works, keyWord]);

  useEffect(() => {
    console.log(`Danh sách hiện có ${filtered.length} công việc`);
  }, [filtered.length]);

  // Các biến màu sắc linh hoạt theo Theme
  const colors = {
    bg: isDark ? "#121212" : "#F2F2F7",
    cardBg: isDark ? "#1C1C1E" : "#FFFFFF",
    textPrimary: isDark ? "#FFFFFF" : "#1C1C1E",
    textSecondary: isDark ? "#EBEBF599" : "#8E8E93",
    border: isDark ? "#38383A" : "#E5E5EA",
    placeholder: isDark ? "#8E8E93" : "#A0A0A5",
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.bg }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      {/* Header & Nút Đổi Theme */}
      <View style={styles.topBar}>
        <Text style={[styles.screenTitle, { color: colors.textPrimary }]}>
          Quản Lý Công Việc
        </Text>
        {theme?.toggleTheme && (
          <TouchableOpacity
            style={[
              styles.themeToggleBtn,
              { backgroundColor: colors.cardBg, borderColor: colors.border },
            ]}
            onPress={theme.toggleTheme}>
            <Text
              style={[
                { fontSize: 16 },
                isDark ? { color: "#fff" } : { color: "#000" },
              ]}>
              {isDark ? "☀️ Light" : "🌙 Dark"}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Khối nhập công việc */}
      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: colors.cardBg,
              borderColor: colors.border,
              color: colors.textPrimary,
            },
          ]}
          value={work}
          onChangeText={setWork}
          placeholder="Nhập công việc..."
          placeholderTextColor={colors.placeholder}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddTodo}>
          <Text style={styles.addButtonText}>Thêm</Text>
        </TouchableOpacity>
      </View>

      {/* Khối tìm kiếm */}
      <TextInput
        style={[
          styles.searchInput,
          {
            backgroundColor: colors.cardBg,
            borderColor: colors.border,
            color: colors.textPrimary,
          },
        ]}
        value={keyWord}
        onChangeText={setKeyword}
        placeholder="🔍 Tìm công việc..."
        placeholderTextColor={colors.placeholder}
      />

      {/* Danh sách */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <WorkItem
            work={item}
            onToggle={handleToggle}
            onDelete={handleDelete}
            isDark={isDark}
            colors={colors}
          />
        )}
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            <Text style={[styles.headerCount, { color: colors.textSecondary }]}>
              Tổng số công việc: {filtered.length}
            </Text>
          </View>
        }
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
            Không tìm thấy công việc nào
          </Text>
        }
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
});

export default TodoScreen;

interface WorkItemProps {
  work: Work;
  onToggle?: (id: string) => void;
  onDelete?: (id: string) => void;
  isDark: boolean;
  colors: any;
}

const WorkItem = memo(
  ({ work, onToggle, onDelete, isDark, colors }: WorkItemProps) => {
    return (
      <View style={[styles.card, { backgroundColor: colors.cardBg }]}>
        <View style={styles.infoContainer}>
          <Text style={[styles.idText, { color: colors.textSecondary }]}>
            #{work.id}
          </Text>
          <Text
            style={[
              styles.titleText,
              { color: colors.textPrimary },
              work.completed && styles.completedTitle,
            ]}>
            {work.title}
          </Text>
        </View>

        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={[
              styles.statusBadge,
              work.completed
                ? isDark
                  ? styles.badgeSuccessDark
                  : styles.badgeSuccess
                : isDark
                  ? styles.badgePendingDark
                  : styles.badgePending,
            ]}
            onPress={() => onToggle?.(work.id)}
            activeOpacity={0.7}>
            <Text
              style={[
                styles.statusText,
                work.completed
                  ? isDark
                    ? styles.textSuccessDark
                    : styles.textSuccess
                  : isDark
                    ? styles.textPendingDark
                    : styles.textPending,
              ]}>
              {work.completed ? "✓ Hoàn thành" : "○ Chờ làm"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.deleteButton, isDark && styles.deleteButtonDark]}
            onPress={() => onDelete?.(work.id)}
            activeOpacity={0.7}>
            <Text style={styles.deleteText}>Xóa</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 4,
  },
  screenTitle: {
    fontSize: 22,
    fontWeight: "700",
  },
  themeToggleBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
  },
  inputContainer: {
    flexDirection: "row",
    gap: 10,
    padding: 16,
    paddingBottom: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
  },
  addButton: {
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 18,
    borderRadius: 10,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 15,
  },
  searchInput: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginHorizontal: 16,
    marginBottom: 8,
    fontSize: 15,
  },
  headerContainer: {
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  headerCount: {
    fontSize: 13,
  },
  listContent: {
    paddingBottom: 20,
  },
  card: {
    borderRadius: 12,
    padding: 14,
    marginHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  infoContainer: {
    flex: 1,
    marginRight: 10,
  },
  idText: {
    fontSize: 11,
    fontWeight: "500",
  },
  titleText: {
    fontSize: 15,
    fontWeight: "500",
    marginTop: 2,
  },
  completedTitle: {
    textDecorationLine: "line-through",
    opacity: 0.5,
  },
  actionContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  statusBadge: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  // Style Badge cho Chế độ Sáng (Light)
  badgeSuccess: { backgroundColor: "#E8F5E9" },
  badgePending: { backgroundColor: "#FFF3E0" },
  textSuccess: { color: "#2E7D32" },
  textPending: { color: "#E65100" },

  // Style Badge cho Chế độ Tối (Dark)
  badgeSuccessDark: { backgroundColor: "#1B3E20" },
  badgePendingDark: { backgroundColor: "#3E2723" },
  textSuccessDark: { color: "#81C784" },
  textPendingDark: { color: "#FFB74D" },

  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  deleteButton: {
    backgroundColor: "#FFEBEE",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  deleteButtonDark: {
    backgroundColor: "#3C1E1E",
  },
  deleteText: {
    color: "#FF5252",
    fontSize: 12,
    fontWeight: "600",
  },
  separator: {
    height: 8,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 14,
  },
});
