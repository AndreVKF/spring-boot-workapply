package com.workapply.app.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.workapply.app.services.StorageService;

@Controller
@RequestMapping(path = "/file")
public class FileUploadController {

    @Autowired
    private StorageService storageService;

    @PostMapping(path = "/")
    public ResponseEntity<Object> fileUpload(@RequestParam("file") MultipartFile file,
            RedirectAttributes redirectAttributes) {

        this.storageService.store(file);

        return ResponseEntity.status(HttpStatus.ACCEPTED).body("Success");
    }

    @GetMapping(path = "/{filename:.+}")
    @ResponseBody
    public ResponseEntity<Resource> fileProvide(@PathVariable String filename) {

        Resource file = this.storageService.load(filename);

        if (file == null) {
            return ResponseEntity.notFound().build();
        }

        // InputStreamResource resource = new InputStreamResource(new
        // FileInputStream(file));

        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
                "attachment; filename=\"" + file.getFilename() + "\"").body(file);
    }

}
