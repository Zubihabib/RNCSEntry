import React, {useEffect, useState} from 'react';
import {Button, NativeModules, ToastAndroid, View} from 'react-native';
import {PERMISSIONS, requestMultiple, RESULTS} from 'react-native-permissions';
import {SafeAreaView, ScrollView} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import RNBlob from 'rn-fetch-blob';
import ModalInput from './components/ModalInput';
import Strings from './constants/Strings';
import DeviceInfo from 'react-native-device-info';

const {FileAccessModule} = NativeModules;

var directoryName = '';
function App(): JSX.Element {
  const [isPermissionDenied, setPermissionDenied] = useState(false);
  const [isDialogVisible, setDialogVisibility] = useState(false);

  useEffect(() => {
    requestPermission();
  }, []);

  const createDirectory = (enteredName: string) => {
    FileAccessModule.createDirectory(
      enteredName,
      () => {
        directoryName = enteredName;
      },
      (errMsg: string) => {
        ToastAndroid.show(errMsg, ToastAndroid.LONG);
      },
    );
  };

  const deleteDirectory = () => {
    if (directoryName !== '') {
      FileAccessModule.deleteDir(
        '',
        directoryName,
        () => {
          ToastAndroid.show(
            Strings.msg_directory_deleted,
            ToastAndroid.LONG,
          );
        },
        (errMsg: string) => {
          ToastAndroid.show(errMsg, ToastAndroid.LONG);
        },
      );
    } else {
      ToastAndroid.show(Strings.msg_please_create_directory, ToastAndroid.LONG);
    }
  };

  const pickAndPushFile = async () => {
    if (directoryName !== '') {
      try {
        const response = await DocumentPicker.pick({
          presentationStyle: 'fullScreen',
          allowMultiSelection: true,
          type: [DocumentPicker.types.allFiles],
        });
        for (let i = 0; i < response.length; i++) {
          let fileStat = await RNBlob.fs.stat(response[i].uri);
          const directoryPath = getDirectoryPath(fileStat.path);
          const fileName = fileStat.filename;
          FileAccessModule.copySelectedFile(
            directoryPath,
            fileName,
            directoryName,
            () => {},
            (errMsg: string) => {
              ToastAndroid.show(errMsg, ToastAndroid.LONG);
              return;
            },
          );
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      ToastAndroid.show(Strings.msg_please_create_directory, ToastAndroid.LONG);
    }
  };

  const getDirectoryPath = (fullpath: string) => {
    const index = fullpath.lastIndexOf('/');
    return fullpath.slice(0, index + 1);
  };

  const requestPermission = () => {
    if(DeviceInfo.getSystemVersion() != '13') {
      requestMultiple([
        PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
      ]).then(statuses => {
        if (
          statuses[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] !=
            RESULTS.GRANTED ||
          statuses[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] != RESULTS.GRANTED
        ) {
          setPermissionDenied(true);
        } else {
          setPermissionDenied(false);
        }
      });
    }
  };

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
      <View style={{margin: 10}}></View>
        {!isPermissionDenied && (
          <Button
            title={Strings.btn_create_directory}
            onPress={() => {
              setDialogVisibility(true);
            }}
          />
        )}
        <View style={{margin: 10}}></View>
        {!isPermissionDenied && (
          <Button title={Strings.btn_delete_directory} onPress={deleteDirectory} />
        )}
        <View style={{margin: 10}}></View>
        {!isPermissionDenied && (
          <Button title={Strings.btn_push_files} onPress={pickAndPushFile} />
        )}
        <View style={{margin: 10}}></View>
        {isPermissionDenied && (
          <Button title={Strings.btn_allow_permission} onPress={requestPermission} />
        )}
      </ScrollView>
      <ModalInput
        isVisible={isDialogVisible}
        onCreateDirectory={createDirectory}
        dismissDialog={() => {
          setDialogVisibility(false);
        }}
      />
    </SafeAreaView>
  );
}

export default App;
