package com.workapply.app.dto;

import org.hibernate.validator.constraints.UUID;

import com.workapply.app.utils.JobLevelEnum;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class JobModelResponseDTO {

    private String idJob;
    private String description;
    private String benefits;
    private JobLevelEnum level;
    private String companyName;

}
