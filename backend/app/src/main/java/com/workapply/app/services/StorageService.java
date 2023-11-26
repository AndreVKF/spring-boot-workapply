package com.workapply.app.services;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;

import com.workapply.app.exceptions.StorageException;
import com.workapply.app.repositories.StorageRepository;

@Service
public class StorageService implements StorageRepository {

    private final Path rootLocation = Paths.get("files");

    @Override
    public void init() {
        try {
            Files.createDirectories(rootLocation);
        } catch (IOException e) {
            throw new StorageException("Could not initialize storage");
        }

    }

    @Override
    public void store(MultipartFile file) {

        try {
            if (file.isEmpty()) {
                throw new StorageException("Failed to store empty file");
            }

            Path destinationFile = rootLocation.resolve(Paths.get(file.getOriginalFilename())).normalize()
                    .toAbsolutePath();

            InputStream inputStream = file.getInputStream();

            Files.copy(inputStream, destinationFile, StandardCopyOption.REPLACE_EXISTING);

        } catch (Exception e) {
            throw new StorageException(e.getMessage());
        }

    }

    @Override
    public Resource load(String filename) {

        try {
            Path file = rootLocation.resolve(filename);
            Resource resource = new UrlResource(file.toUri());

            if (!resource.exists() || !resource.isReadable()) {
                throw new StorageException("Could not read file: " + filename);
            }

            return resource;

        } catch (Exception e) {
            throw new StorageException(e.getMessage());
        }

    }

    @Override
    public void deleteAll() {
        FileSystemUtils.deleteRecursively(rootLocation.toFile());
    }

}
