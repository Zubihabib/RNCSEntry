package com.csentry

import androidx.appcompat.app.AppCompatActivity
import com.csentry.FileCommand

class FileCommandMkDir(private val context: AppCompatActivity) :
    FileCommand(context) {
    override fun getCommandName(): String {
        return "MK_DIR"
    }
}
