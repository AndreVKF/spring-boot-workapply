package com.workapply.app.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.workapply.app.dto.CandidateProfileDTO;
import com.workapply.app.exceptions.ResourceNotFoundException;
import com.workapply.app.models.CandidateModel;
import com.workapply.app.repositories.CandidateRepository;

import java.util.UUID;

@Service
public class GetCandidateService {

    @Autowired
    private CandidateRepository candidateRepository;

    public CandidateProfileDTO execute(UUID candidateId) {

        CandidateModel candidateModel = this.candidateRepository.findById(candidateId)
                .orElseThrow(ResourceNotFoundException::new);

        CandidateProfileDTO candidateResponse = CandidateProfileDTO
                .builder()
                .idCandidate(candidateModel.getId().toString())
                .description(candidateModel.getDescription())
                .name(candidateModel.getName())
                .username(candidateModel.getUsername())
                .email(candidateModel.getEmail())
                .build();

        return candidateResponse;

    }
}