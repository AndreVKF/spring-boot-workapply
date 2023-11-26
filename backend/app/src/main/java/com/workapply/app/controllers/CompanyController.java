package com.workapply.app.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.workapply.app.models.CompanyModel;
import com.workapply.app.services.CreateCompanyService;

import jakarta.validation.Valid;

@RestController
@RequestMapping(path = "/company")
public class CompanyController {

    @Autowired
    private CreateCompanyService createCompanyService;

    @PostMapping(path = "/")
    public ResponseEntity<Object> createCompany(@Valid @RequestBody CompanyModel companyModel) {

        try {

            CompanyModel createdCompany = this.createCompanyService.execute(companyModel);
            return ResponseEntity.ok().body(createdCompany);

        } catch (Exception e) {

            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

}
