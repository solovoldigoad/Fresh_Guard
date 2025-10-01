import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../context/LanguageContext.jsx';
import { Colors, Fonts, Spacing, BorderRadius } from '../constants/theme';

const LanguageSelector = ({ style, showLabel = true, compact = false }) => {
  const { currentLanguage, changeLanguage, availableLanguages, t } = useLanguage();
  const [modalVisible, setModalVisible] = useState(false);

  const currentLang = availableLanguages.find(lang => lang.code === currentLanguage);

  const handleLanguageSelect = async (languageCode) => {
    await changeLanguage(languageCode);
    setModalVisible(false);
  };

  const LanguageOption = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.languageOption,
        currentLanguage === item.code && styles.selectedLanguageOption
      ]}
      onPress={() => handleLanguageSelect(item.code)}
    >
      <View style={styles.languageInfo}>
        <Text style={[
          styles.languageName,
          currentLanguage === item.code && styles.selectedLanguageText
        ]}>
          {item.nativeName}
        </Text>
        <Text style={[
          styles.languageSubtext,
          currentLanguage === item.code && styles.selectedLanguageSubtext
        ]}>
          {item.name}
        </Text>
      </View>
      {currentLanguage === item.code && (
        <Ionicons 
          name="checkmark-circle" 
          size={24} 
          color={Colors.primary} 
        />
      )}
    </TouchableOpacity>
  );

  if (compact) {
    return (
      <>
        <TouchableOpacity
          style={[styles.compactButton, style]}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="language" size={20} color={Colors.primary} />
          <Text style={styles.compactText}>{currentLang?.code.toUpperCase()}</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Select Language</Text>
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  style={styles.closeButton}
                >
                  <Ionicons name="close" size={24} color={Colors.text} />
                </TouchableOpacity>
              </View>
              
              <FlatList
                data={availableLanguages}
                renderItem={({ item }) => <LanguageOption item={item} />}
                keyExtractor={(item) => item.code}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </View>
        </Modal>
      </>
    );
  }

  return (
    <>
      <TouchableOpacity
        style={[styles.languageButton, style]}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="language" size={20} color={Colors.primary} />
        {showLabel && (
          <View style={styles.languageButtonText}>
            <Text style={styles.currentLanguage}>{currentLang?.nativeName}</Text>
            <Text style={styles.languageLabel}>Language</Text>
          </View>
        )}
        <Ionicons name="chevron-down" size={16} color={Colors.textSecondary} />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Choose Language / भाषा चुनें</Text>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color={Colors.text} />
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={availableLanguages}
              renderItem={({ item }) => <LanguageOption item={item} />}
              keyExtractor={(item) => item.code}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.medium,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: Spacing.sm,
  },
  languageButtonText: {
    flex: 1,
  },
  currentLanguage: {
    fontSize: Fonts.sizes.medium,
    fontWeight: '600',
    color: Colors.text,
  },
  languageLabel: {
    fontSize: Fonts.sizes.small,
    color: Colors.textSecondary,
  },
  compactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.small,
    gap: Spacing.xs,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  compactText: {
    fontSize: Fonts.sizes.small,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.large,
    padding: Spacing.lg,
    width: '80%',
    maxHeight: '50%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  modalTitle: {
    fontSize: Fonts.sizes.large,
    fontWeight: 'bold',
    color: Colors.text,
  },
  closeButton: {
    padding: Spacing.xs,
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.sm,
    marginVertical: Spacing.xs,
    borderRadius: BorderRadius.medium,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  selectedLanguageOption: {
    backgroundColor: Colors.primary + '10',
    borderColor: Colors.primary,
  },
  languageInfo: {
    flex: 1,
  },
  languageName: {
    fontSize: Fonts.sizes.medium,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  languageSubtext: {
    fontSize: Fonts.sizes.small,
    color: Colors.textSecondary,
  },
  selectedLanguageText: {
    color: Colors.primary,
  },
  selectedLanguageSubtext: {
    color: Colors.primary + 'AA',
  },
});

export default LanguageSelector;