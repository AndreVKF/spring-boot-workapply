package com.workapply.app.services;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.workapply.app.dto.JobModelRequestDTO;
import com.workapply.app.models.CompanyModel;
import com.workapply.app.models.JobModel;
import com.workapply.app.repositories.CompanyRepository;
import com.workapply.app.repositories.JobRepository;

@Service
public class CreateJobService {

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private CompanyRepository companyRepository;

    public JobModel execute(JobModelRequestDTO jobModelRequestDTO, UUID idCompany) {

        JobModel jobModel = JobModel
                .builder()
                .description(jobModelRequestDTO.getDescription())
                .benefits(jobModelRequestDTO.getBenefits())
                .level(jobModelRequestDTO.getLevel())
                .build();

        CompanyModel jobCompany = this.companyRepository.getReferenceById(idCompany);
        jobModel.setCompanyModel(jobCompany);
        jobModel.setId_company(idCompany);

        return this.jobRepository.save(jobModel);
    }

}
