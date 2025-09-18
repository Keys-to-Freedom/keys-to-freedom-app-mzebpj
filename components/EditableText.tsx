
import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import { colors } from '../styles/commonStyles';
import { useContent } from '../hooks/useContent';

interface EditableTextProps {
  id: string;
  style?: any;
  multiline?: boolean;
  placeholder?: string;
  children?: React.ReactNode;
}

export default function EditableText({ 
  id, 
  style, 
  multiline = false, 
  placeholder,
  children 
}: EditableTextProps) {
  const { getContent, updateContent, isEditing } = useContent();
  const [isLocalEditing, setIsLocalEditing] = useState(false);
  const [localValue, setLocalValue] = useState('');

  const content = getContent(id);

  const handleStartEdit = () => {
    setLocalValue(content);
    setIsLocalEditing(true);
  };

  const handleSave = () => {
    updateContent(id, localValue);
    setIsLocalEditing(false);
  };

  const handleCancel = () => {
    setLocalValue('');
    setIsLocalEditing(false);
  };

  if (!isEditing) {
    return (
      <Text style={style}>
        {content || children}
      </Text>
    );
  }

  if (isLocalEditing) {
    return (
      <View style={styles.editContainer}>
        <TextInput
          style={[styles.editInput, style]}
          value={localValue}
          onChangeText={setLocalValue}
          multiline={multiline}
          placeholder={placeholder}
          placeholderTextColor={colors.textLight}
        />
        <View style={styles.editButtons}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.buttonText}>✓</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <Text style={styles.buttonText}>✕</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <TouchableOpacity onPress={handleStartEdit} style={styles.editableContainer}>
      <Text style={[style, styles.editableText]}>
        {content || children || placeholder}
      </Text>
      <View style={styles.editIcon}>
        <Text style={styles.editIconText}>✏️</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  editContainer: {
    width: '100%',
  },
  editInput: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: colors.backgroundAlt,
    color: colors.text,
    minHeight: 40,
  },
  editButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  saveButton: {
    backgroundColor: colors.success,
    borderRadius: 20,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  cancelButton: {
    backgroundColor: colors.error,
    borderRadius: 20,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  editableContainer: {
    position: 'relative',
    width: '100%',
  },
  editableText: {
    paddingRight: 30,
  },
  editIcon: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editIconText: {
    fontSize: 12,
    opacity: 0.7,
  },
});
