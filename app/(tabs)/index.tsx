import { ContentCard } from "@/components/content-card";
import { EmptyState } from "@/components/empty-state";
import { FloatingActionButton } from "@/components/floating-action-button";
import { colors } from "@/constants/colors";
import { useContentStore } from "@/store/content-store";
import { useWebhookStore } from "@/store/webhook-store";
import {
  retryFailedUploads,
  uploadToAllWebhooks,
} from "@/utils/upload-manager";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { Camera, FileText, Image as ImageIcon } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";

export default function CaptureScreen() {
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraType, setCameraType] = useState<CameraType>("back");
  const [refreshing, setRefreshing] = useState(false);
  const cameraRef = React.useRef<any>(null);

  const { items, addItem } = useContentStore();
  const webhooks = useWebhookStore((state) => state.webhooks);

  const hasEnabledWebhooks = (category: string) => {
    return webhooks.some(
      (webhook) =>
        webhook.enabled &&
        (webhook.categories.includes(category) ||
          webhook.categories.includes("all"))
    );
  };

  // Request camera permission on mount
  useEffect(() => {
    if (cameraPermission && !cameraPermission.granted) {
      requestCameraPermission();
    }
  }, [cameraPermission, requestCameraPermission]);

  // Retry failed uploads on mount
  useEffect(() => {
    retryFailedUploads();
  }, []);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await retryFailedUploads();
    setRefreshing(false);
  }, []);

  // Handle camera capture
  const handleCameraCapture = async () => {
    // if (!hasEnabledWebhooks("photo")) {
    //   alert(
    //     "No webhooks configured for photos. Please add a webhook for photos in Settings."
    //   );
    //   return;
    // }

    if (!cameraPermission?.granted) {
      alert(
        "Camera permission required. Please grant camera permission to capture photos."
      );
      return;
    }

    setCameraActive(true);
  };

  // Take photo
  const takePhoto = async () => {
    if (cameraRef.current && cameraActive) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.7,
          base64: true,
        });

        const contentId = addItem(
          "photo",
          `data:image/jpeg;base64,${photo.base64}`
        );
        uploadToAllWebhooks(contentId);

        setCameraActive(false);
      } catch (error) {
        console.error("Error taking photo:", error);
        alert("Failed to take photo. Please try again.");
      }
    }
  };

  // Handle gallery selection
  const handleGallerySelection = async () => {
    // if (!hasEnabledWebhooks("gallery")) {
    //   alert(
    //     "No webhooks configured for gallery images. Please add a webhook for gallery in Settings."
    //   );
    //   return;
    // }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        quality: 0.7,
        base64: true,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        const asset = result.assets[0];
        const contentId = addItem(
          "gallery",
          `data:image/jpeg;base64,${asset.base64}`
        );
        uploadToAllWebhooks(contentId);
      }
    } catch (error) {
      console.error("Error picking image:", error);
      alert("Failed to select image. Please try again.");
    }
  };

  // Handle note creation
  const handleNoteCreation = () => {
    // if (!hasEnabledWebhooks("note")) {
    //   alert(
    //     "No webhooks configured for notes. Please add a webhook for notes in Settings."
    //   );
    //   return;
    // }

    router.push("/note-editor");
  };

  // Toggle camera type
  const toggleCameraType = () => {
    setCameraType((current) => (current === "back" ? "front" : "back"));
  };

  // Render camera view
  if (cameraActive && cameraPermission?.granted) {
    return (
      <View style={styles.container}>
        <CameraView ref={cameraRef} style={styles.camera} facing={cameraType} />
        <View style={styles.cameraControlsOverlay}>
          <View style={styles.cameraButtonsContainer}>
            <View style={styles.cameraButton} />
            <View style={styles.captureButtonContainer}>
              <View style={styles.captureButton} onTouchEnd={takePhoto} />
            </View>
            <View style={styles.flipButtonContainer}>
              <View style={styles.flipButton} onTouchEnd={toggleCameraType} />
            </View>
          </View>
        </View>
      </View>
    );
  }

  // Render main screen with content list and capture buttons
  return (
    <View style={styles.container}>
      {items.length === 0 ? (
        <EmptyState
          title="No Content Yet"
          message="Use the buttons below to capture photos, select from gallery, or create notes."
          icon={
            <View style={styles.emptyStateIcons}>
              <Camera size={28} color={colors.primary} />
              <ImageIcon size={28} color={colors.primary} />
              <FileText size={28} color={colors.primary} />
            </View>
          }
        />
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ContentCard item={item} />}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[colors.primary]}
              tintColor={colors.primary}
            />
          }
        />
      )}

      <FloatingActionButton
        onPressCamera={handleCameraCapture}
        onPressGallery={handleGallerySelection}
        onPressNote={handleNoteCreation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  emptyStateIcons: {
    flexDirection: "row",
    gap: 16,
  },
  listContent: {
    padding: 16,
  },
  camera: {
    flex: 1,
  },
  cameraControlsOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "transparent",
    justifyContent: "flex-end",
  },
  cameraButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
    paddingHorizontal: 30,
  },
  cameraButton: {
    width: 60,
    height: 60,
  },
  captureButtonContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#fff",
  },
  flipButtonContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  flipButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
  },
});
