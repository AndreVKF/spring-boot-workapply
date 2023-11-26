package com.workapply.app.exceptions;

public class StorageFileNotFoundException extends RuntimeException {
    public StorageFileNotFoundException() {
        super("File not found in storage");
    }
}
