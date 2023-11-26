package com.workapply.app.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.workapply.app.dto.JobModelResponseDTO;
import com.workapply.app.models.JobModel;
import com.workapply.app.repositories.JobRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GetAllJobsService {

    @Autowired
    private JobRepository jobRepository;

    public List<JobModelResponseDTO> execute() {

        List<JobModel> jobModels = this.jobRepository.findAll();

        List<JobModelResponseDTO> responseJobs = jobModels
                .stream()
                .map(job -> {
                    JobModelResponseDTO jobModelResp = JobModelResponseDTO
                            .builder()
                            .idJob(job.getId().toString())
                            .description(job.getDescription())
                            .benefits(job.getBenefits())
                            .level(job.getLevel())
                            .companyName(job.getCompanyModel().getName())
                            .build();

                    return jobModelResp;

                })
                .collect(Collectors.toList());

        return responseJobs;
    }

}
