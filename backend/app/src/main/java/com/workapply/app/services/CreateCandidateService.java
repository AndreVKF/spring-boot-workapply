package com.workapply.app.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.workapply.app.exceptions.UserAlreadyRegisteredException;
import com.workapply.app.models.CandidateModel;
import com.workapply.app.repositories.CandidateRepository;

@Service
public class CreateCandidateService {

    @Autowired
    private CandidateRepository candidateRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public CandidateModel execute(CandidateModel candidateModel) {
        this.candidateRepository
                .findByUsernameOrEmail(candidateModel.getUsername(), candidateModel.getEmail())
                .ifPresent((user) -> {
                    throw new UserAlreadyRegisteredException();
                });

        String hashedPassword = passwordEncoder.encode(candidateModel.getPassword());
        candidateModel.setPassword(hashedPassword);

        return this.candidateRepository.save(candidateModel);

    }

}
