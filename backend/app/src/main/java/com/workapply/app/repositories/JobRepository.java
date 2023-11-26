package com.workapply.app.repositories;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.workapply.app.models.JobModel;

public interface JobRepository extends JpaRepository<JobModel, UUID> {
    Optional<JobModel> findById(UUID id);
}
