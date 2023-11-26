package com.workapply.app.services;

import java.time.Duration;
import java.time.Instant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.workapply.app.dto.ValidateTokenResponseDTO;
import com.workapply.app.providers.JWTProvider;

@Service
public class ValidateTokenService {

    @Autowired
    private JWTProvider jwtProvider;

    @Value("${security.token.secret}")
    private String jwtSecretToken;

    public ValidateTokenResponseDTO execute(String token) {

        ValidateTokenResponseDTO validateTokenResponseDTO = new ValidateTokenResponseDTO();

        if (token.isEmpty()) {
            return validateTokenResponseDTO;
        }

        DecodedJWT subjectToken = this.jwtProvider.validateToken(token);

        if (subjectToken == null) {
            return validateTokenResponseDTO;
        }

        Algorithm algorithm = Algorithm.HMAC256(jwtSecretToken);
        String updatedToken = JWT.create()
                .withIssuer("workapply")
                .withSubject(subjectToken.getSubject())
                .withClaim("role", subjectToken.getClaim("role").asList(Object.class))
                .withExpiresAt(Instant.now().plus(Duration.ofDays(1)))
                .sign(algorithm);

        ValidateTokenResponseDTO validatedToken = ValidateTokenResponseDTO.builder()
                .access_token(updatedToken)
                .user_id(subjectToken.getSubject().toString())
                .role(subjectToken.getClaim("role").asList(Object.class).get(0).toString())
                .build();

        return validatedToken;
    }

}
