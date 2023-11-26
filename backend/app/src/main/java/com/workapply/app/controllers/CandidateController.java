package com.workapply.app.controllers;

import java.util.UUID;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.workapply.app.dto.CandidateProfileDTO;
import com.workapply.app.models.CandidateModel;
import com.workapply.app.services.CandidateProfileService;
import com.workapply.app.services.CreateCandidateService;
import com.workapply.app.services.GetAllCandidatesService;
import com.workapply.app.services.GetCandidateService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/candidate")
public class CandidateController {

    @Autowired
    private CreateCandidateService createCandidateUseCase;

    @Autowired
    private CandidateProfileService candidateProfileService;

    @Autowired
    private GetAllCandidatesService getAllCandidatesService;

    @Autowired
    private GetCandidateService getCandidateService;

    @PostMapping(path = "/")
    public ResponseEntity<Object> create(@Valid @RequestBody CandidateModel candidateModel) {

        try {
            CandidateModel createdCandidate = this.createCandidateUseCase.execute(candidateModel);

            return ResponseEntity.ok().body(createdCandidate);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    @GetMapping(path = "/")
    @PreAuthorize("hasRole('CANDIDATE')")
    public ResponseEntity<Object> index(HttpServletRequest request) {

        UUID candidateId = UUID.fromString(request.getAttribute("id_user").toString());

        CandidateProfileDTO candidateProfileDTO = this.candidateProfileService.execute(candidateId);

        return ResponseEntity.ok().body(candidateProfileDTO);
    }

    @GetMapping(path = "/all")
    public ResponseEntity<Object> index() {

        List<CandidateProfileDTO> allCandidates = this.getAllCandidatesService.execute();

        return ResponseEntity.ok().body(allCandidates);
    }

    @GetMapping(path = "/{candidateId}")
    public ResponseEntity<Object> show(@PathVariable("candidateId") String candidateId) {

        try {
            UUID candidateUUID = UUID.fromString(candidateId);
            CandidateProfileDTO candidate = this.getCandidateService.execute(candidateUUID);

            return ResponseEntity.ok().body(candidate);

        } catch (java.lang.IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Invalid UUID");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

}
