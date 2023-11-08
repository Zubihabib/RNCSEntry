import React, { useEffect, useState } from 'react';
import { Button, ToastAndroid, View, SafeAreaView, ScrollView } from 'react-native';
import Strings from './constants/Strings';
import DeviceInfo from 'react-native-device-info';
import DocumentPicker from 'react-native-document-picker'
import RNBlob from 'rn-fetch-blob';
import ModalInput from './components/ModalInput';
import { PERMISSIONS, requestMultiple, RESULTS } from 'react-native-permissions';
import CSentryHelper from 'react-native-csentry';

var directoryName = '';
function App(): JSX.Element {
  const [isPermissionDenied, setPermissionDenied] = useState(false);
  const [isDialogVisible, setDialogVisibility] = useState(false);

  useEffect(() => {
    requestPermission();
  }, []);

  const createDir = (enteredName: string) => {
    CSentryHelper.createDirectory(enteredName, () => {
      console.log(enteredName)
      directoryName = enteredName;
      ToastAndroid.show(Strings.msg_directory_created, ToastAndroid.LONG);
    }, (errMsg) => {
      ToastAndroid.show(errMsg, ToastAndroid.LONG);
    })
  };

  const deleteDir = () => {
    if (directoryName !== '') {
      CSentryHelper.deleteDirectory(directoryName,
        () => {
          ToastAndroid.show(
            Strings.msg_directory_deleted,
            ToastAndroid.LONG,
          );
        }, (errMsg) => {
          ToastAndroid.show(errMsg, ToastAndroid.LONG);
        })
    } else {
      ToastAndroid.show(Strings.msg_please_create_directory, ToastAndroid.LONG);
    }
  };

  const pickAndPushFile = async () => {
    if (directoryName !== '') {
      try {
        const response = await DocumentPicker.pick({
          presentationStyle: 'fullScreen',
          type: [DocumentPicker.types.allFiles],
          copyTo: "cachesDirectory"
        });
        let fileUri: string | null | undefined = response[0]?.fileCopyUri
        if (fileUri !== null || fileUri !== undefined) {
          let fileStat = await RNBlob.fs.stat(decodeURI(fileUri!!));
          const directoryPath = getDirectoryPath(fileStat.path);
          const fileName = fileStat.filename;
          CSentryHelper.copySelectedFile(directoryPath, fileName, directoryName,
            () => {
              ToastAndroid.show(Strings.msg_file_pushed, ToastAndroid.LONG);
            },
            (errMsg) => {
              ToastAndroid.show(errMsg, ToastAndroid.LONG);
              return;
            })
        } else {
          ToastAndroid.show(Strings.error_msg_unable_push_file, ToastAndroid.LONG);
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
    if (DeviceInfo.getSystemVersion() != '13') {
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
        <View style={{ margin: 10 }}></View>
        {!isPermissionDenied && (
          <Button
            title={Strings.btn_create_directory}
            onPress={() => {
              setDialogVisibility(true);
            }}
          />
        )}
        <View style={{ margin: 10 }}></View>
        {!isPermissionDenied && (
          <Button title={Strings.btn_delete_directory} onPress={deleteDir} />
        )}
        <View style={{ margin: 10 }}></View>
        {!isPermissionDenied && (
          <Button title={Strings.btn_push_files} onPress={pickAndPushFile} />
        )}
        <View style={{ margin: 10 }}></View>
        {isPermissionDenied && (
          <Button title={Strings.btn_allow_permission} onPress={requestPermission} />
        )}
      </ScrollView>
      <ModalInput
        isVisible={isDialogVisible}
        onCreateDirectory={createDir}
        dismissDialog={() => {
          setDialogVisibility(false);
        }}
      />
    </SafeAreaView>
  );
}

export default App;
