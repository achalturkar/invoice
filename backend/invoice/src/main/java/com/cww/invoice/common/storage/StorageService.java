package com.cww.invoice.common.storage;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.Set;
import java.util.UUID;

@Service
public class StorageService {

    @Value("${app.storage.root}")
    private String storageRoot;   // uploads


    @Value("${app.public-base-url}")
    private String publicBaseUrl; // http://localhost:8080

    private static final Set<String> ALLOWED_EXT =
            Set.of("pdf", "jpg", "jpeg", "png", "svg", "webp");

    private static final long MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

    public Path resolvePath(String relativePath) {
        return Paths.get(storageRoot, relativePath);
    }

    /* =====================================================
       MULTIPART FILE UPLOAD (documents, images)
       ===================================================== */


    /* ================= IMAGE / FILE UPLOAD ================= */
    public String upload(MultipartFile file, String relativeFolder) {

        validate(file);

        try {
            String extension = getExtension(file.getOriginalFilename());
            String fileName = UUID.randomUUID() + "." + extension;

            Path fullPath = Paths.get(storageRoot, relativeFolder, fileName);
            Files.createDirectories(fullPath.getParent());

            Files.write(fullPath, file.getBytes(), StandardOpenOption.CREATE);

            // ✅ RETURN RELATIVE PATH ONLY
            return (relativeFolder + "/" + fileName).replace("\\", "/");

        } catch (IOException e) {
            throw new RuntimeException("File upload failed", e);
        }
    }

    public String uploadCompanyAsset(
            MultipartFile file,
            String companyId,
            String type
    ) {

        validate(file);

        try {
            String ext = getExtension(file.getOriginalFilename());

            String fileName = type + "." + ext;
            String relativeFolder = "companies/" + companyId + "/" + type;

            Path folderPath = Paths.get(storageRoot, relativeFolder);
            Files.createDirectories(folderPath);

            Path fullPath = folderPath.resolve(fileName);
            Files.deleteIfExists(fullPath);

            Files.write(fullPath, file.getBytes());

            return (relativeFolder + "/" + fileName).replace("\\", "/");

        } catch (IOException e) {
            throw new RuntimeException("File upload failed", e);
        }
    }


    /* =====================================================
       BYTE[] UPLOAD (Invoice PDF, generated files)
       ===================================================== */

    public String uploadPdf(byte[] pdfBytes, String relativePath) {

        if (pdfBytes == null || pdfBytes.length == 0) {
            throw new RuntimeException("PDF is empty");
        }

        try {
            Path fullPath = Paths.get(storageRoot, relativePath);
            Files.createDirectories(fullPath.getParent());

            Files.write(
                    fullPath,
                    pdfBytes,
                    StandardOpenOption.CREATE,
                    StandardOpenOption.TRUNCATE_EXISTING
            );

            // ✅ RETURN ONLY RELATIVE PATH (DB SAFE)
            return relativePath.replace("\\", "/");

        } catch (IOException e) {
            throw new RuntimeException("PDF upload failed", e);
        }
    }



    /* ================= VALIDATION ================= */

    private void validate(MultipartFile file) {
        if (file == null || file.isEmpty())
            throw new RuntimeException("File is empty");

        if (file.getSize() > MAX_FILE_SIZE)
            throw new RuntimeException("Max 5MB allowed");

        String ext = getExtension(file.getOriginalFilename());
        if (!ALLOWED_EXT.contains(ext.toLowerCase()))
            throw new RuntimeException("Invalid file type");
    }

    private String getExtension(String fileName) {
        if (fileName == null || !fileName.contains("."))
            throw new RuntimeException("Invalid file name");

        return fileName.substring(fileName.lastIndexOf('.') + 1);
    }


}
