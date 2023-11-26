package com.workapply.app.repositories;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.workapply.app.models.CandidateModel;

@Repository
public interface CandidateRepository extends JpaRepository<CandidateModel, UUID> {

    Optional<CandidateModel> findByUsernameOrEmail(String username, String email);

    Optional<CandidateModel> findByEmail(String email);
}
