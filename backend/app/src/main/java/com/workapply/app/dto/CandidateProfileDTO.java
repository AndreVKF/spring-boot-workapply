package com.workapply.app.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CandidateProfileDTO {
    private String idCandidate;
    private String description;
    private String email;
    private String username;
    private String name;
}
