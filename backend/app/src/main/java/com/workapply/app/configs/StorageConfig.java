package com.workapply.app.configs;

import org.springframework.boot.context.properties.ConfigurationProperties;

import lombok.Data;

@Data
@ConfigurationProperties("storage")
public class StorageConfig {

    /*
     * Folder location
     */

    private String location = "files";

}
