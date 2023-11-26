package com.workapply.app.exceptions;

public class StorageException extends RuntimeException {

    public StorageException() {
        super("Failed to store file");
    }

    public StorageException(String message) {
        super(message);
    }

}
