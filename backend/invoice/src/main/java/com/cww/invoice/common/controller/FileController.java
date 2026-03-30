package com.cww.invoice.common.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.net.MalformedURLException;
import java.nio.file.*;

@RestController
@RequestMapping("/files")
public class FileController {

    private final Path root = Paths.get("uploads");

    @GetMapping("/**")
    public ResponseEntity<Resource> serveFile(HttpServletRequest request)
            throws MalformedURLException {

        String path = request.getRequestURI()
                .replace("/files/", "");

        Path file = root.resolve(path);

        Resource resource = new UrlResource(file.toUri());

        if (!resource.exists()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline")
                .body(resource);
    }
}

