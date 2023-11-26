package com.workapply.app.repositories;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.workapply.app.models.CompanyModel;

public interface CompanyRepository extends JpaRepository<CompanyModel, UUID> {
    Optional<CompanyModel> findByUsernameOrEmail(String username, String email);

    Optional<CompanyModel> findByEmail(String email);

}
