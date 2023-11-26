package com.workapply.app.exceptions;

public class CredentialsInvalidException extends RuntimeException {

    public CredentialsInvalidException() {
        super("Email and/or password incorrect");
    }

}
