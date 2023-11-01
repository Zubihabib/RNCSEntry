# Testing CSEntry ReactNative Bridge
There are two ways to test the implementation, you can clone this code and run as it is or if you want to test it in your project then please follow the steps mentioned below.

IMPORTANT: You need to name the directory that you will create as `Simple CAPI` and then push files in order to be shown in CSEntry app

## Step 1: Install App

Install Official CSentry App in the device

## Step 2: Storage Permission

You will need to add storage permissions in Manifest.xml file

```bash
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
```

## Step 3: Add Provider in Manifest.xml file in Application tag

```bash
<provider
   android:name="androidx.core.content.FileProvider"
   android:authorities="gov.census.cspro.fileaccess.fileprovider"
   android:exported="false"
   android:grantUriPermissions="true">
   <meta-data
         android:name="android.support.FILE_PROVIDER_PATHS"
         android:resource="@xml/provider_paths" />
</provider>
```

After that create a folder named `xml` in res folder. Then create a new file in it named `provider_paths.xml` and insert following code in it:

```bash
<?xml version="1.0" encoding="utf-8"?>
<paths>
    <external-path path="Android/data/${applicationId}/" name="files_root" />

    <root-path
        name="root"
        path="/" />
</paths>
```

## Step 4: Add files.

Extract the directory `csentry` from `android/app/src/main/java/com/csentrydemo`. And insert it in this path `android/app/src/main/java/com/{projectName}`

## Step 5: Replace default `getPackages()` function with following code in `MainAppliction.java`.

```bash
@Override
protected List<ReactPackage> getPackages() {
   List<ReactPackage> packages = new PackageList(this).getPackages();
   packages.add(new FileAccessPackage());
   return packages;
}
```

## Step 6: Replace default `getPackages()` function with following code in `MainAppliction.java`.

```bash
@Override
protected List<ReactPackage> getPackages() {
   List<ReactPackage> packages = new PackageList(this).getPackages();
   packages.add(new FileAccessPackage());
   return packages;
}
```

## Step 7: Add following line in `onCreate()` in `MainActivity.java` function to initialize package. If `onCreate()` function does not exist, create it.

```bash
FileAccessHelper.Companion.getInstance().initialize(this);
```

## Step 8: Import Packages.

Add following lines at the top of your react native code.

```bash
import {NativeModules} from 'react-native';
const {FileAccessModule} = NativeModules;
```

## Step 9: Perform file operations.

Make sure that user has granted the Read/Write storage permission.
On the occurence of any event perform following operations:

### 1. Create Directory

Make sure to Install Official Csentry App from Playstore.

```bash
FileAccessModule.createDirectory(
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
FileAccessModule.copySelectedFile(
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
FileAccessModule.deleteDir(
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