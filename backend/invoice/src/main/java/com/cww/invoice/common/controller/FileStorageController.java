package com.cww.invoice.common.controller;


import com.cww.invoice.common.service.FileStorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/companies")
public class FileStorageController {

    private  final FileStorageService fileStorageService;

    @PostMapping("/leaveFile/upload")
    public ResponseEntity<String> uploadFile(
            @RequestParam("file") MultipartFile file) {

        String filePath = fileStorageService.saveFile(file);

        return ResponseEntity.ok(filePath);
    }

    @GetMapping("/leaveFile/{fileName}")
    public ResponseEntity<Resource> getFile(@PathVariable String fileName) throws MalformedURLException {

        Path path = Paths.get("uploads/leaves/").resolve(fileName).normalize();

        Resource resource = new UrlResource(path.toUri());

        if (!resource.exists()) {
            throw new RuntimeException("File not found");
        }

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "inline; filename=\"" + fileName + "\"")
                .header(HttpHeaders.CONTENT_TYPE, "application/pdf") // 🔥 IMPORTANT
                .body(resource);
    }


}
