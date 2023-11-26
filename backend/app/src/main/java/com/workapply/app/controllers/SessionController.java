package com.workapply.app.controllers;

import java.net.http.HttpResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.workapply.app.dto.AuthCandidateDTO;
import com.workapply.app.dto.AuthCandidateResponseDTO;
import com.workapply.app.dto.AuthCompanyDTO;
import com.workapply.app.dto.AuthCompanyResponseDTO;
import com.workapply.app.dto.ValidateTokenResponseDTO;
import com.workapply.app.dto.ValidateUserDTO;
import com.workapply.app.exceptions.CredentialsInvalidException;
import com.workapply.app.services.AuthCandidateService;
import com.workapply.app.services.AuthCompanyService;
import com.workapply.app.services.ValidateTokenService;

@RestController
@RequestMapping(path = "/auth")
public class SessionController {

    @Autowired
    private AuthCompanyService authCompanyService;

    @Autowired
    private AuthCandidateService authCandidateService;

    @Autowired
    private ValidateTokenService validateTokenService;

    @PostMapping(path = "/company")
    public ResponseEntity<Object> create(@RequestBody AuthCompanyDTO authCompanyDTO) {

        try {
            ValidateTokenResponseDTO validateTokenResponseDTO = this.authCompanyService.execute(authCompanyDTO);

            return ResponseEntity.ok().body(validateTokenResponseDTO);
        } catch (CredentialsInvalidException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }

    }

    @PostMapping(path = "/candidate")
    public ResponseEntity<Object> create(@RequestBody AuthCandidateDTO authCandidateDTO) {

        try {
            ValidateTokenResponseDTO validateTokenResponseDTO = this.authCandidateService.execute(authCandidateDTO);

            return ResponseEntity.ok().body(validateTokenResponseDTO);
        } catch (CredentialsInvalidException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PostMapping(path = "/validate")
    public ResponseEntity<Object> validate(@RequestBody ValidateUserDTO validateUserDTO) {

        try {
            String token = validateUserDTO.getToken();
            ValidateTokenResponseDTO validateTokenResponseDTO = this.validateTokenService.execute(token);

            return ResponseEntity.ok().body(validateTokenResponseDTO);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }

    }

}
