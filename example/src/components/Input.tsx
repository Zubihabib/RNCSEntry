import { useState } from 'react';
import Strings from '../constants/Strings';
import React from 'react'
import { StyleSheet, TextInput } from 'react-native';

const Input: React.FC<{ onTextEntered: (enteredText: string) => void }> = ({
  onTextEntered,
}) => {
  const [enteredText, setEnteredText] = useState('');

  const onTextChange = (value: string) => {
    onTextEntered(value);
    setEnteredText(value);
  };
  return (
    <TextInput
      value={enteredText}
      style={styles.input}
      onChangeText={onTextChange}
      placeholder={Strings.input_hint}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderColor: 'gray',
    width: '100%',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
  },
});

export default Input;
