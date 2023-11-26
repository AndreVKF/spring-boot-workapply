package com.workapply.app.models;

import java.io.Serializable;
import java.util.Date;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.mapping.List;
import org.hibernate.validator.constraints.Length;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
@Entity(name = "companies")
public class CompanyModel implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Pattern(regexp = "\\S+", message = "Username should not contain blank spaces")
    private String username;

    @Email(message = "Should contain a valid email")
    private String email;
    private String name;

    @Length(min = 10, message = "Password should have at least 10 characters")
    private String password;
    private String description;

    @CreationTimestamp
    private Date createdAt;

}
