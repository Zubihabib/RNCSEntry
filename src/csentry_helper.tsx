import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
    `The package 'react-native-csentry' doesn't seem to be linked. Make sure: \n\n` +
    Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
    '- You rebuilt the app after installing the package\n' +
    '- You are not using Expo Go\n';


const Csentry = NativeModules.Csentry
    ? NativeModules.Csentry
    : new Proxy(
        {},
        {
            get() {
                throw new Error(LINKING_ERROR);
            },
        }
    );

export class CSentryHelper {
    static createDirectory(directoryName: string, onSuccess: () => void, onFailure: (errorMsg: string) => void) {
        Csentry.createDirectory(
            directoryName,
            () => {
                onSuccess()
            },
            (errMsg: string) => {
                onFailure(errMsg)
            },
        );
    }

    static deleteDirectory(directoryName: string, onSuccess: () => void, onFailure: (errorMsg: string) => void) {
        Csentry.deleteDir(
            '',
            directoryName,
            () => {
                onSuccess()
            },
            (errMsg: string) => {
                onFailure(errMsg)
            },
        );
    }

    static copySelectedFile(directoryPath: string, fileName: string, directoryName: string, onSuccess: () => void, onFailure: (errorMsg: string) => void) {
        Csentry.copySelectedFile(
            directoryPath,
            fileName,
            directoryName,
            () => {
                onSuccess()
            },
            (errMsg: string) => {
                onFailure(errMsg)
            },
        );
    }
}