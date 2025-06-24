import { colors } from "@/constants/colors";
import {
  Camera,
  FileText,
  Image as ImageIcon,
  Plus,
} from "lucide-react-native";
import { useRef, useState } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface FABProps {
  onPressCamera: () => void;
  onPressGallery: () => void;
  onPressNote: () => void;
}

export const FloatingActionButton: React.FC<FABProps> = ({
  onPressCamera,
  onPressGallery,
  onPressNote,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  const toggleMenu = () => {
    const toValue = isOpen ? 0 : 1;

    Animated.spring(animation, {
      toValue,
      friction: 5,
      useNativeDriver: true,
    }).start();

    setIsOpen(!isOpen);
  };

  const cameraStyle = {
    transform: [
      { scale: animation },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -120],
        }),
      },
    ],
  };

  const galleryStyle = {
    transform: [
      { scale: animation },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -80],
        }),
      },
    ],
  };

  const noteStyle = {
    transform: [
      { scale: animation },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -40],
        }),
      },
    ],
  };

  const rotation = {
    transform: [
      {
        rotate: animation.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", "45deg"],
        }),
      },
    ],
  };

  const opacity = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0, 1],
  });

  const handlePress = (callback: () => void) => {
    setIsOpen(false);
    Animated.spring(animation, {
      toValue: 0,
      friction: 5,
      useNativeDriver: true,
    }).start();

    callback();
  };

  return (
    <View style={styles.container} pointerEvents="box-none">
      <Animated.View style={[styles.fabItem, cameraStyle, { opacity }]}>
        <TouchableOpacity
          style={[styles.fabButton, styles.secondaryButton]}
          onPress={() => handlePress(onPressCamera)}
        >
          <Camera size={22} color={colors.primary} />
          <Text style={styles.fabLabel}>Camera</Text>
        </TouchableOpacity>
      </Animated.View>

      <Animated.View style={[styles.fabItem, galleryStyle, { opacity }]}>
        <TouchableOpacity
          style={[styles.fabButton, styles.secondaryButton]}
          onPress={() => handlePress(onPressGallery)}
        >
          <ImageIcon size={22} color={colors.primary} />
          <Text style={styles.fabLabel}>Gallery</Text>
        </TouchableOpacity>
      </Animated.View>

      <Animated.View style={[styles.fabItem, noteStyle, { opacity }]}>
        <TouchableOpacity
          style={[styles.fabButton, styles.secondaryButton]}
          onPress={() => handlePress(onPressNote)}
        >
          <FileText size={22} color={colors.primary} />
          <Text style={styles.fabLabel}>Note</Text>
        </TouchableOpacity>
      </Animated.View>

      <TouchableOpacity
        style={styles.fab}
        onPress={toggleMenu}
        activeOpacity={0.8}
      >
        <Animated.View style={rotation}>
          <Plus size={24} color="#FFFFFF" />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 24,
    right: 24,
    alignItems: "center",
  },
  fab: {
    backgroundColor: colors.primary,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  fabItem: {
    position: "absolute",
    right: 8,
    // flexDirection: "row",
    // alignItems: "center",
  },
  fabButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // width: 40,
    // height: 40,
    // borderRadius: 20,
  },
  secondaryButton: {
    backgroundColor: colors.background,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.2,
    // shadowRadius: 1.41,
    // elevation: 2,
  },
  fabLabel: {
    width: "100%",
    backgroundColor: colors.background,
    color: colors.text,
    fontSize: 14,
    fontWeight: "500",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});
