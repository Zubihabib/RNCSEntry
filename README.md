# RNCSEntry
This is the React Native package to access CSEntry directory on external file storage.

## Step 1: Install App

Install Official [CSentry App](https://play.google.com/store/apps/details?id=gov.census.cspro.csentry&hl=en&gl=US) in the device


## Step 2: Add `react-native-csentry` package in your React Native project

```bash
yarn add https://github.com/Zubihabib/RNCSEntry.git
OR
npm i https://github.com/Zubihabib/RNCSEntry.git
```

## Step 3: Storage Permission

You will need to add these permissions in Manifest.xml file

```bash
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.QUERY_ALL_PACKAGES"/>
```


## Step 4: Initialize FileAccessHelper in `MainActivity.java` of android native code

```bash
import com.csentry.FileAccessHelper;
```

```bash
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    FileAccessHelper.Companion.getInstance().initialize(this);

  }
```


## Step 5: Import CSentryHelper

```bash
import CSentryHelper from 'react-native-csentry';
```


## Step 6: Perform file operations.

Make sure that user has granted the Read/Write storage permission.
On the occurence of any event perform following operations:

### 1. Create Directory

Make sure to Install Official Csentry App from Playstore.

```bash
CSentryHelper.createDirectory(
   directoryName,
   () => {
      // success case
   },
   (errMsg: string) => {
      // failure case
   },
);
```

### 2. Push files to Directory Directory

Install any 3rd party plugin to pick files and get path.

```bash
CSentryHelper.copySelectedFile(
directoryPath, // e.g storage/emulated/0
fileName,
directoryName,
   () => {
      // success case
   },
   (errMsg: string) => {
      // failure case
   },
);
```

### 3. Delete Directory

Make sure directory exists in the storage.

```bash
CSentryHelper.deleteDirectory(
   '', // '' means root directory
   directoryName,
   () => {
      // success case
   },
   (errMsg: string) => {
      // failure case
   },
);
```

IMPORTANT: You need to name the directory that you will create as `Simple CAPI` and then push files in order to be shown in CSEntry app
