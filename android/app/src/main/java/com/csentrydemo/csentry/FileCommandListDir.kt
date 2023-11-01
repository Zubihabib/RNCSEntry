package com.csentrydemo.csentry

import androidx.appcompat.app.AppCompatActivity

class FileCommandListDir(private val context: AppCompatActivity) :
    FileCommand(context) {
    override fun getCommandName(): String {
        return "LIST_DIR"
    }
}