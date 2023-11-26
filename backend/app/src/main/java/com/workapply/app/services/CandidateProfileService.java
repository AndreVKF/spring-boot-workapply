package com.workapply.app.services;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.workapply.app.dto.CandidateProfileDTO;
import com.workapply.app.exceptions.ResourceNotFoundException;
import com.workapply.app.models.CandidateModel;
import com.workapply.app.repositories.CandidateRepository;

@Service
public class CandidateProfileService {

    @Autowired
    private CandidateRepository candidateRepository;

    public CandidateProfileDTO execute(UUID idCandidate) {
        CandidateModel candidateModel = this.candidateRepository
                .findById(idCandidate)
                .orElseThrow(ResourceNotFoundException::new);

        CandidateProfileDTO candidateProfileDTO = CandidateProfileDTO
                .builder()
                .idCandidate(candidateModel.getId().toString())
                .name(candidateModel.getName())
                .description(candidateModel.getDescription())
                .email(candidateModel.getEmail())
                .username(candidateModel.getUsername())
                .build();

        return candidateProfileDTO;
    }

}
