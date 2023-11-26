package com.workapply.app.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.workapply.app.dto.CandidateProfileDTO;
import com.workapply.app.models.CandidateModel;
import com.workapply.app.repositories.CandidateRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GetAllCandidatesService {

    @Autowired
    private CandidateRepository candidateRepository;

    public List<CandidateProfileDTO> execute() {

        List<CandidateModel> candidateModels = this.candidateRepository.findAll();

        List<CandidateProfileDTO> candidatesDTO = candidateModels
                .stream()
                .map(candidate -> {
                    CandidateProfileDTO candidateDTO = CandidateProfileDTO
                            .builder()
                            .idCandidate(candidate.getId().toString())
                            .description(candidate.getDescription())
                            .email(candidate.getEmail())
                            .name(candidate.getName())
                            .username(candidate.getUsername())
                            .build();

                    return candidateDTO;
                })
                .collect(Collectors.toList());

        return candidatesDTO;
    }

}
