package com.csentrydemo.csentry

import android.content.res.Resources
import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class FileAccessModule(val context: ReactApplicationContext): ReactContextBaseJavaModule(context) {

    override fun getName(): String {
        return Constants.moduleName
    }


    @ReactMethod
    fun createDirectory(directoryName: String, successCallback: Callback, failureCallback: Callback) {
        try {
            FileAccessHelper.getInstance().makeDirectory(directoryName, //!!AI path to directory being created inside csentry/ directory
                onComplete = {
                    successCallback.invoke()
                },
                onError = {
                    failureCallback.invoke(it)
                })
        } catch (e: Resources.NotFoundException) {
            failureCallback.invoke(Constants.msg_install_app)
        } catch (e: Exception) {
            failureCallback.invoke(e.message)
        }
    }

    @ReactMethod
    fun deleteDir(parentDirectory: String, dirName: String, successCallback: Callback, failureCallback: Callback) {
        try {
            //delete file or directory from csentry/ directory or its subdirectories
            FileAccessHelper.getInstance().delete(
                parentDirectory, //directory under csentry/ i.e Simple CAPI/
                dirName, //file or directory name to be deleted
                deleteFiles = true, //if true, files with matching pattern will be deleted
                deleteDirectories = true, //if ture, directories with matching pattern will be deleted
                //callback of FileAccessHelper successful call
                onComplete = { successCallback.invoke()
                },
                //callback of FileAccessHelper unsuccessful call
                onError = {
                    failureCallback.invoke(it)
                }
            )
        } catch (e: Exception) {
            failureCallback.invoke(e.message)
        }
    }

    @ReactMethod
    fun copySelectedFile(sourceDirectoryPath: String, fileName: String, destDirectoryName: String, successCallback: Callback, failureCallback: Callback) {
        try {
            FileAccessHelper.getInstance().pushFiles(
                sourceDirectoryPath, //source directory for the file to be pushed to csentry/
                fileName, //pattern to filter for files in directory. May contain wildcard characters
                destDirectoryName, //destination directory under csentry/
                includeSubdirectories = true, //if ture, will search for files in subdirectories of the source directory. This will preserve the directory structure
                overwirteExistingFiles = true, //if ture, will overwrite existing files in destination deirectory
                //handling callback of FileAccessHelper successful call
                onComplete = { successCallback.invoke() },
                //handling callback of FileAccessHelper unsuccessful call
                onError = {
                    failureCallback.invoke(it)
                }
            )
        } catch (e: Exception) {
            failureCallback.invoke(e.message)
        }
    }
}