import { colors } from "@/constants/colors";
import { WebhookConfig } from "@/types";
import { Plus, X } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface WebhookFormProps {
  webhook?: WebhookConfig;
  onSave: (data: {
    name: string;
    url: string;
    headers: Record<string, string>;
    categories: string[];
  }) => void;
  onCancel: () => void;
}

export const WebhookForm: React.FC<WebhookFormProps> = ({
  webhook,
  onSave,
  onCancel,
}) => {
  const [name, setName] = useState(webhook?.name || "");
  const [url, setUrl] = useState(webhook?.url || "");
  const [headers, setHeaders] = useState<{ key: string; value: string }[]>(
    webhook
      ? Object.entries(webhook.headers).map(([key, value]) => ({ key, value }))
      : []
  );

  // Category toggles
  const [photoEnabled, setPhotoEnabled] = useState(
    webhook ? webhook.categories.includes("photo") : true
  );
  const [galleryEnabled, setGalleryEnabled] = useState(
    webhook ? webhook.categories.includes("gallery") : true
  );
  const [noteEnabled, setNoteEnabled] = useState(
    webhook ? webhook.categories.includes("note") : true
  );
  const [allEnabled, setAllEnabled] = useState(
    webhook ? webhook.categories.includes("all") : false
  );

  const [nameError, setNameError] = useState("");
  const [urlError, setUrlError] = useState("");
  const [categoryError, setCategoryError] = useState("");

  // When "All" is toggled, update other categories
  useEffect(() => {
    if (allEnabled) {
      setPhotoEnabled(true);
      setGalleryEnabled(true);
      setNoteEnabled(true);
    }
  }, [allEnabled]);

  const addHeader = () => {
    setHeaders([...headers, { key: "", value: "" }]);
  };

  const removeHeader = (index: number) => {
    const newHeaders = [...headers];
    newHeaders.splice(index, 1);
    setHeaders(newHeaders);
  };

  const updateHeaderKey = (index: number, text: string) => {
    const newHeaders = [...headers];
    newHeaders[index].key = text;
    setHeaders(newHeaders);
  };

  const updateHeaderValue = (index: number, text: string) => {
    const newHeaders = [...headers];
    newHeaders[index].value = text;
    setHeaders(newHeaders);
  };

  const validateForm = () => {
    let isValid = true;

    if (!name.trim()) {
      setNameError("Name is required");
      isValid = false;
    } else {
      setNameError("");
    }

    if (!url.trim()) {
      setUrlError("URL is required");
      isValid = false;
    } else if (!url.startsWith("http://") && !url.startsWith("https://")) {
      setUrlError("URL must start with http:// or https://");
      isValid = false;
    } else {
      setUrlError("");
    }

    // Validate at least one category is selected
    if (!photoEnabled && !galleryEnabled && !noteEnabled && !allEnabled) {
      setCategoryError("At least one category must be selected");
      isValid = false;
    } else {
      setCategoryError("");
    }

    return isValid;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    // Convert headers array to object
    const headersObject: Record<string, string> = {};
    headers.forEach(({ key, value }) => {
      if (key.trim() && value.trim()) {
        headersObject[key.trim()] = value.trim();
      }
    });

    // Build categories array
    const categories: string[] = [];
    if (allEnabled) {
      categories.push("all");
    } else {
      if (photoEnabled) categories.push("photo");
      if (galleryEnabled) categories.push("gallery");
      if (noteEnabled) categories.push("note");
    }

    onSave({
      name: name.trim(),
      url: url.trim(),
      headers: headersObject,
      categories,
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>
          {webhook ? "Edit Webhook" : "Add Webhook"}
        </Text>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={[styles.input, nameError ? styles.inputError : null]}
            value={name}
            onChangeText={setName}
            placeholder="My Webhook"
            placeholderTextColor={colors.inactive}
          />
          {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>URL</Text>
          <TextInput
            style={[styles.input, urlError ? styles.inputError : null]}
            value={url}
            onChangeText={setUrl}
            placeholder="https://example.com/webhook"
            placeholderTextColor={colors.inactive}
            autoCapitalize="none"
            keyboardType="url"
          />
          {urlError ? <Text style={styles.errorText}>{urlError}</Text> : null}
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Content Categories</Text>
          <View style={styles.categoriesContainer}>
            <View style={styles.categoryRow}>
              <Text style={styles.categoryLabel}>Photos (Camera)</Text>
              <Switch
                value={photoEnabled || allEnabled}
                onValueChange={setPhotoEnabled}
                disabled={allEnabled}
                trackColor={{ false: colors.inactive, true: colors.primary }}
                thumbColor={colors.background}
              />
            </View>

            <View style={styles.categoryRow}>
              <Text style={styles.categoryLabel}>Gallery Images</Text>
              <Switch
                value={galleryEnabled || allEnabled}
                onValueChange={setGalleryEnabled}
                disabled={allEnabled}
                trackColor={{ false: colors.inactive, true: colors.primary }}
                thumbColor={colors.background}
              />
            </View>

            <View style={styles.categoryRow}>
              <Text style={styles.categoryLabel}>Text Notes</Text>
              <Switch
                value={noteEnabled || allEnabled}
                onValueChange={setNoteEnabled}
                disabled={allEnabled}
                trackColor={{ false: colors.inactive, true: colors.primary }}
                thumbColor={colors.background}
              />
            </View>

            <View style={[styles.categoryRow, styles.allCategoryRow]}>
              <Text style={styles.allCategoryLabel}>All Content Types</Text>
              <Switch
                value={allEnabled}
                onValueChange={setAllEnabled}
                trackColor={{ false: colors.inactive, true: colors.primary }}
                thumbColor={colors.background}
              />
            </View>
          </View>
          {categoryError ? (
            <Text style={styles.errorText}>{categoryError}</Text>
          ) : null}
        </View>

        <View style={styles.formGroup}>
          <View style={styles.headerTitleRow}>
            <Text style={styles.label}>Headers (Optional)</Text>
            <TouchableOpacity style={styles.addButton} onPress={addHeader}>
              <Plus size={18} color={colors.primary} />
              <Text style={styles.addButtonText}>Add Header</Text>
            </TouchableOpacity>
          </View>

          {headers.map((header, index) => (
            <View key={index} style={styles.headerRow}>
              <View style={styles.headerInputs}>
                <TextInput
                  style={[styles.headerInput, styles.headerKeyInput]}
                  value={header.key}
                  onChangeText={(text) => updateHeaderKey(index, text)}
                  placeholder="Key"
                  placeholderTextColor={colors.inactive}
                  autoCapitalize="none"
                />
                <TextInput
                  style={[styles.headerInput, styles.headerValueInput]}
                  value={header.value}
                  onChangeText={(text) => updateHeaderValue(index, text)}
                  placeholder="Value"
                  placeholderTextColor={colors.inactive}
                  autoCapitalize="none"
                />
              </View>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeHeader(index)}
              >
                <X size={18} color={colors.error} />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 24,
    textAlign: "center",
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: colors.text,
  },
  inputError: {
    borderColor: colors.error,
  },
  errorText: {
    color: colors.error,
    fontSize: 14,
    marginTop: 4,
  },
  categoriesContainer: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
  },
  categoryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  allCategoryRow: {
    borderBottomWidth: 0,
    marginTop: 4,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  categoryLabel: {
    fontSize: 16,
    color: colors.text,
  },
  allCategoryLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
  },
  headerTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  addButtonText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: "500",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  headerInputs: {
    flex: 1,
    flexDirection: "row",
    gap: 8,
  },
  headerInput: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: colors.text,
  },
  headerKeyInput: {
    flex: 1,
  },
  headerValueInput: {
    flex: 2,
  },
  removeButton: {
    padding: 8,
    marginLeft: 8,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 14,
    alignItems: "center",
  },
  cancelButtonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "500",
  },
  saveButton: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: 14,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
});
