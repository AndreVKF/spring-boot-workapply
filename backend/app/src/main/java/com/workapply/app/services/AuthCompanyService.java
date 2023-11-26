package com.workapply.app.services;

import java.time.Duration;
import java.time.Instant;
import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.workapply.app.dto.AuthCompanyDTO;
import com.workapply.app.dto.AuthCompanyResponseDTO;
import com.workapply.app.dto.ValidateTokenResponseDTO;
import com.workapply.app.exceptions.CredentialsInvalidException;
import com.workapply.app.exceptions.ResourceNotFoundException;
import com.workapply.app.models.CompanyModel;
import com.workapply.app.repositories.CompanyRepository;

@Service
public class AuthCompanyService {

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Value("${security.token.secret}")
    private String jwtSecretToken;

    public ValidateTokenResponseDTO execute(AuthCompanyDTO authCompanyDTO) {

        CompanyModel company = this.companyRepository.findByEmail(authCompanyDTO.getEmail())
                .orElseThrow(() -> {
                    throw new CredentialsInvalidException();
                });

        Boolean doesPasswordMatches = this.passwordEncoder.matches(authCompanyDTO.getPassword(), company.getPassword());

        if (!doesPasswordMatches) {
            throw new CredentialsInvalidException();
        }

        Algorithm algorithm = Algorithm.HMAC256(jwtSecretToken);
        String token = JWT.create()
                .withIssuer("workapply")
                .withSubject(company.getId().toString())
                .withClaim("role", Arrays.asList("COMPANY"))
                .withExpiresAt(Instant.now().plus(Duration.ofDays(1)))
                .sign(algorithm);

        ValidateTokenResponseDTO validateTokenResponseDTO = ValidateTokenResponseDTO.builder()
                .access_token(token)
                .user_id(company.getId().toString())
                .role("COMPANY")
                .build();

        return validateTokenResponseDTO;
    }

}
