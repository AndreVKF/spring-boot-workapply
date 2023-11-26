package com.workapply.app.repositories;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface StorageRepository {

    void init();

    void store(MultipartFile file);

    Resource load(String filename);

    void deleteAll();

}
