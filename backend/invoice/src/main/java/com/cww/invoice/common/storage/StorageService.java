//package com.cww.invoice.common.storage;
//
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Service;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.io.File;
//import java.nio.file.Files;
//import java.nio.file.Path;
//import java.nio.file.Paths;
//import java.util.UUID;
//
//@Service
//public class StorageService {
//
//    @Value("${app.public-base-url}")
//    private String publicBaseUrl;
//
//    public String upload(MultipartFile file, String folder) {
//
//        try {
//            // Validate
//            if (file.isEmpty()) {
//                throw new RuntimeException("File is empty");
//            }
//
//            // Create directory if not exists
//            File dir = new File(folder);
//            if (!dir.exists()) {
//                dir.mkdirs();
//            }
//
//            // Generate unique file name
//            String ext = getExtension(file.getOriginalFilename());
//            String fileName = UUID.randomUUID() + "." + ext;
//
//            Path filePath = Paths.get(folder, fileName);
//            Files.write(filePath, file.getBytes());
//
//            // 👉 Convert FILE PATH → PUBLIC URL
//            String publicUrl = publicBaseUrl + "/" +
//                    folder.replace("\\", "/") + "/" + fileName;
//
//            return publicUrl;
//
//        } catch (Exception e) {
//            throw new RuntimeException("Image upload failed", e);
//        }
//    }
//
//    private String getExtension(String fileName) {
//        return fileName.substring(fileName.lastIndexOf(".") + 1);
//    }
//}
package com.cww.invoice.common.storage;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.Set;
import java.util.UUID;

@Service
public class StorageService {

    @Value("${app.storage.root}")
    private String storageRoot; // e.g. uploads

    @Value("${app.public-base-url}")
    private String publicBaseUrl; // e.g. http://localhost:8080/files

    private static final Set<String> ALLOWED_EXT = Set.of(
            "pdf", "jpg", "jpeg", "png"
    );

    private static final long MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

    public String upload(MultipartFile file, String relativeFolder) {

        validate(file);

        try {
            // Build safe path
            Path folderPath = Paths.get(storageRoot, relativeFolder);
            Files.createDirectories(folderPath);

            String extension = getExtension(file.getOriginalFilename());
            String fileName = UUID.randomUUID() + "." + extension;

            Path filePath = folderPath.resolve(fileName);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            // Public URL (DO NOT expose real path)
            return publicBaseUrl + "/uploads/" + relativeFolder.replace("\\", "/") + "/" + fileName;

        } catch (IOException e) {
            throw new RuntimeException("File upload failed", e);
        }
    }

    /* ================= HELPERS ================= */

    private void validate(MultipartFile file) {

        if (file == null || file.isEmpty()) {
            throw new RuntimeException("File is empty");
        }

        if (file.getSize() > MAX_FILE_SIZE) {
            throw new RuntimeException("File size exceeds 5MB");
        }

        String ext = getExtension(file.getOriginalFilename());
        if (!ALLOWED_EXT.contains(ext.toLowerCase())) {
            throw new RuntimeException("Invalid file type: " + ext);
        }
    }

    private String getExtension(String fileName) {
        if (fileName == null || !fileName.contains(".")) {
            throw new RuntimeException("Invalid file name");
        }
        return fileName.substring(fileName.lastIndexOf('.') + 1);
    }
}
