import { Modal, View, Button, StyleSheet, ToastAndroid } from 'react-native';
import Input from './Input';
import React from 'react'
import Strings from '../constants/Strings';

const ModalInput: React.FC<{
  onCreateDirectory: (directoryName: string) => void;
  isVisible: boolean;
  dismissDialog: () => void;
}> = ({ onCreateDirectory, isVisible, dismissDialog }) => {
  var enteredDirectoryName = '';
  const onAddHandler = () => {
    if (enteredDirectoryName === '') {
      ToastAndroid.show(Strings.msg_enter_directory_name, ToastAndroid.LONG);
    } else {
      dismissDialog();
      onCreateDirectory(enteredDirectoryName);
    }
  };
  const onTextEnteredHandler = (enteredValue: string) => {
    enteredDirectoryName = enteredValue;
  };
  return (
    <Modal
      transparent={true}
      animationType="slide"
      presentationStyle="overFullScreen"
      visible={isVisible}>
      <View style={styles.viewWrapper}>
        <View
          style={{
            height: 150,
            padding: 20,
            width: '80%',
            alignSelf: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
          }}>
          <Input onTextEntered={onTextEnteredHandler} />
          <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
            <Button title={Strings.btn_cancel} onPress={dismissDialog} />
            <View style={{ margin: 10 }}></View>
            <Button title={Strings.btn_add} onPress={onAddHandler} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  viewWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },

  input: {
    borderColor: 'gray',
    width: '100%',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
  },
});

export default ModalInput;
