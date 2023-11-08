package com.csentry

import androidx.appcompat.app.AppCompatActivity
import com.csentry.FileCommand

class FileCommandDel (private val context: AppCompatActivity) :
    FileCommand(context) {
    override fun getCommandName(): String {
        return "DEL"
    }
}
