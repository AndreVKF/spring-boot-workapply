package com.workapply.app.controllers;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.hibernate.mapping.Collection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.workapply.app.dto.JobModelRequestDTO;
import com.workapply.app.dto.JobModelResponseDTO;
import com.workapply.app.models.JobModel;
import com.workapply.app.services.CreateJobService;
import com.workapply.app.services.GetAllJobsService;
import com.workapply.app.services.GetJobService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

@RestController
@RequestMapping(path = "/job")
public class JobController {

    @Autowired
    private CreateJobService createJobService;

    @Autowired
    private GetAllJobsService getAllJobsService;

    @Autowired
    private GetJobService getJobService;

    @PostMapping(path = "/")
    @PreAuthorize("hasRole('COMPANY')")
    public ResponseEntity<Object> create(@Valid @RequestBody JobModelRequestDTO jobModelRequestDTO,
            HttpServletRequest request) {

        UUID idCompany = UUID.fromString(request.getAttribute("id_user").toString());
        JobModel createdJobModel = this.createJobService.execute(jobModelRequestDTO, idCompany);

        return ResponseEntity.ok().body(createdJobModel);

    }

    @GetMapping(path = "/")
    public ResponseEntity<Object> index() {

        List<JobModelResponseDTO> allJobs = this.getAllJobsService.execute();

        return ResponseEntity.ok().body(allJobs);
    }

    @GetMapping(path = "/{jobId}")
    public ResponseEntity<Object> show(@PathVariable("jobId") String jobId) {

        try {
            UUID jobUUId = UUID.fromString(jobId);
            JobModelResponseDTO jobResponse = this.getJobService.execute(jobUUId);

            return ResponseEntity.ok().body(jobResponse);
        } catch (java.lang.IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Invalid UUID");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

}
