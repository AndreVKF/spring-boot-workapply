package com.workapply.app.dto;

import com.workapply.app.utils.JobLevelEnum;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class JobModelRequestDTO {

    @NotBlank(message = "Job description is required")
    private String description;
    private String benefits;

    @Enumerated(EnumType.STRING)
    private JobLevelEnum level;

}
