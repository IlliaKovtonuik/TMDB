import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Switch,
} from "react-native";

type SortOption = "alphabetical" | "rating" | "newest" | "oldest" | null;

interface Props {
  visible: boolean;
  onClose: () => void;
  showFavorites: boolean;
  onToggleFavorites: () => void;
  selectedSort: SortOption;
  onSelectSort: (sort: SortOption) => void;
}

export const FilterModal: React.FC<Props> = ({
  visible,
  onClose,
  showFavorites,
  onToggleFavorites,
  selectedSort,
  onSelectSort,
}) => {
  return (
    <Modal visible={visible} animationType="none" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Filters</Text>

          <View style={styles.row}>
            <Text style={styles.label}>Show favorites</Text>
            <Switch value={showFavorites} onValueChange={onToggleFavorites} />
          </View>

          <Text style={styles.label}>Sort by:</Text>

          {[
            { label: "A–Z (Alphabet)", value: "alphabetical" },
            { label: "Rating", value: "rating" },
            { label: "Newest first", value: "newest" },
            { label: "Oldest first", value: "oldest" },
          ].map((option) => (
            <TouchableOpacity
              key={option.value}
              onPress={() => onSelectSort(option.value as SortOption)}
              style={[
                styles.option,
                selectedSort === option.value && styles.optionSelected,
              ]}
            >
              <Text
                style={[
                  styles.optionText,
                  selectedSort === option.value && styles.optionTextSelected,
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Text style={styles.closeText}>Apply</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modal: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  option: {
    paddingVertical: 10,
  },
  optionSelected: {
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
  optionTextSelected: {
    fontWeight: "bold",
    color: "tomato",
  },
  closeBtn: {
    marginTop: 20,
    alignSelf: "center",
    backgroundColor: "tomato",
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  closeText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
