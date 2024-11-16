import React, { useState } from 'react';
import { Image, StyleSheet, View, Text, Button, TextInput, TouchableOpacity } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';

export default function BasicScreen() {
  const [message, setMessage] = useState('Welcome!');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [agreed, setAgreed] = useState(false);

  const updateMessage = () => {
    setMessage('정상 TEXT');
  };

  const handleGenderSelect = (selectedGender: string) => {
    setGender(selectedGender);
  };

  const toggleAgreement = () => {
    setAgreed(!agreed);
  };

  return (
    <ParallaxScrollView
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      {/* Title Section */}
      <View style={styles.titleContainer}>
        <ThemedText type="title">Basic</ThemedText>
      </View>

      {/* Message Section */}
      <View style={styles.titleContainer} accessibilityLabel="title-container">
        <Text accessibilityLabel="message-text">{message}</Text>
      </View>

      {/* Update Message Button */}
      <View style={styles.buttonContainer}>
        <Button title="Update Message" onPress={updateMessage} accessibilityLabel="update-button" />
      </View>

      {/* Name Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
          accessibilityLabel="name-input"
          accessible
        />
      </View>

      {/* Gender Radio Buttons */}
      <View style={styles.radioGroup} accessibilityLabel="gender-radio-group">
        <Text>Gender:</Text>
        <TouchableOpacity
          style={styles.radioButton}
          onPress={() => handleGenderSelect('male')}
          accessibilityLabel="gender-male"
          accessible
          accessibilityRole="radio"
          accessibilityState={{ selected: gender === 'male' }}
        >
          <View style={styles.radioOuter}>
            {gender === 'male' && <View style={styles.radioInner} />}
          </View>
          <Text>Male</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.radioButton}
          onPress={() => handleGenderSelect('female')}
          accessibilityLabel="gender-female"
          accessible
          accessibilityRole="radio"
          accessibilityState={{ selected: gender === 'female' }}
        >
          <View style={styles.radioOuter}>
            {gender === 'female' && <View style={styles.radioInner} />}
          </View>
          <Text>Female</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.radioButton}
          onPress={() => handleGenderSelect('other')}
          accessibilityLabel="gender-other"
          accessible
          accessibilityRole="radio"
          accessibilityState={{ selected: gender === 'other' }}
        >
          <View style={styles.radioOuter}>
            {gender === 'other' && <View style={styles.radioInner} />}
          </View>
          <Text>Other</Text>
        </TouchableOpacity>
      </View>

      {/* Agreement Checkbox */}
      <View style={styles.checkboxContainer}>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={toggleAgreement}
          accessibilityLabel="agree-checkbox"
          accessible
          accessibilityRole="checkbox"
          accessibilityState={{ checked: agreed }}
        >
          {agreed && <View style={styles.checkboxInner} />}
        </TouchableOpacity>
        <Text>I agree to the terms and conditions</Text>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    marginTop: 16,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  buttonContainer: {
    paddingHorizontal: 16,
  },
  inputContainer: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  radioGroup: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  radioOuter: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#000',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    paddingHorizontal: 16,
  },
  checkbox: {
    height: 20,
    width: 20,
    borderWidth: 1,
    borderColor: '#000',
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxInner: {
    height: 14,
    width: 14,
    backgroundColor: '#000',
  },
});
