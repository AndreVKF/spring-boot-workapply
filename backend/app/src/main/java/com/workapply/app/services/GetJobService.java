package com.workapply.app.services;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.workapply.app.dto.JobModelResponseDTO;
import com.workapply.app.exceptions.ResourceNotFoundException;
import com.workapply.app.models.JobModel;
import com.workapply.app.repositories.JobRepository;

@Service
public class GetJobService {

    @Autowired
    private JobRepository jobRepository;

    public JobModelResponseDTO execute(UUID jobId) {

        JobModel jobModel = this.jobRepository.findById(jobId).orElseThrow(ResourceNotFoundException::new);

        JobModelResponseDTO jobReturn = JobModelResponseDTO.builder()
                .idJob(jobModel.getId().toString())
                .description(jobModel.getDescription())
                .benefits(jobModel.getBenefits())
                .level(jobModel.getLevel())
                .companyName(jobModel.getCompanyModel().getName())
                .build();

        return jobReturn;

    }

}
