package com.workapply.app.exceptions;

public class MissingAuthCredentialsException extends RuntimeException {

    public MissingAuthCredentialsException() {
        super("Missing auth credentials");
    }

}
