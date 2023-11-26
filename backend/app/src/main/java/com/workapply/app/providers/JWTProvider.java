package com.workapply.app.providers;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;

@Configuration
public class JWTProvider {

    @Value("${security.token.secret}")
    private String jwtSecretToken;

    public DecodedJWT validateToken(String authorization) {

        String token = authorization.replace("Bearer ", "");

        Algorithm algorithm = Algorithm.HMAC256(jwtSecretToken);

        try {
            DecodedJWT subject = JWT
                    .require(algorithm)
                    .build()
                    .verify(token);

            return subject;
        } catch (JWTVerificationException e) {
            e.printStackTrace();
            return null;
        }

    }

}
