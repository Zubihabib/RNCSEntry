import {useState} from 'react';
import {TextInput, StyleSheet} from 'react-native';
import Strings from '../constants/Strings';

const Input: React.FC<{onTextEntered: (enteredText: string) => void}> = ({
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
