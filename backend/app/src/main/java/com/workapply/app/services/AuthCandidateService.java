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
import com.workapply.app.dto.AuthCandidateDTO;
import com.workapply.app.dto.AuthCandidateResponseDTO;
import com.workapply.app.dto.ValidateTokenResponseDTO;
import com.workapply.app.exceptions.CredentialsInvalidException;
import com.workapply.app.exceptions.ResourceNotFoundException;
import com.workapply.app.models.CandidateModel;
import com.workapply.app.repositories.CandidateRepository;

@Service
public class AuthCandidateService {

        @Autowired
        private CandidateRepository candidateRepository;

        @Autowired
        private PasswordEncoder passwordEncoder;

        @Value("${security.token.secret}")
        private String jwtSecretToken;

        public ValidateTokenResponseDTO execute(AuthCandidateDTO authCandidateDTO) {

                CandidateModel candidate = this.candidateRepository.findByEmail(authCandidateDTO.email())
                                .orElseThrow(CredentialsInvalidException::new);

                Boolean doesPasswordMatches = this.passwordEncoder.matches(authCandidateDTO.password(),
                                candidate.getPassword());

                if (!doesPasswordMatches) {
                        throw new CredentialsInvalidException();
                }

                Algorithm algorithm = Algorithm.HMAC256(jwtSecretToken);
                String token = JWT.create()
                                .withIssuer("workapply")
                                .withSubject(candidate.getId().toString())
                                .withClaim("role", Arrays.asList("CANDIDATE"))
                                .withExpiresAt(Instant.now().plus(Duration.ofDays(1)))
                                .sign(algorithm);

                ValidateTokenResponseDTO validateTokenResponseDTO = ValidateTokenResponseDTO.builder()
                                .access_token(token)
                                .user_id(candidate.getId().toString())
                                .role("CANDIDATE")
                                .build();

                return validateTokenResponseDTO;
        }

}
