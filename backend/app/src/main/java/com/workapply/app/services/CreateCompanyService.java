package com.workapply.app.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.workapply.app.exceptions.UserAlreadyRegisteredException;
import com.workapply.app.models.CompanyModel;
import com.workapply.app.repositories.CompanyRepository;

@Service
public class CreateCompanyService {

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public CompanyModel execute(CompanyModel companyModel) {

        this.companyRepository
                .findByUsernameOrEmail(companyModel.getUsername(), companyModel.getEmail())
                .ifPresent((company) -> {
                    throw new UserAlreadyRegisteredException();
                });

        String hashedPassword = passwordEncoder.encode(companyModel.getPassword());
        companyModel.setPassword(hashedPassword);

        return this.companyRepository.save(companyModel);
    }
}
