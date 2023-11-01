package com.csentrydemo.csentry

import androidx.appcompat.app.AppCompatActivity

class FileCommandMkDir(private val context: AppCompatActivity) :
    FileCommand(context) {
    override fun getCommandName(): String {
        return "MK_DIR"
    }
}