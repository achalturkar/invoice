package com.cww.invoice.common.util;

import org.springframework.web.multipart.MultipartFile;

import java.util.Set;

public class ImageValidator {

    private static final long MAX_SIZE = 500 * 1024;

    private static final Set<String> ALLOWED_TYPES = Set.of(
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/svg"
    );

    public static void validate(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new RuntimeException("File is empty");
        }
        if (!ALLOWED_TYPES.contains(file.getContentType())) {
            throw new RuntimeException("Invalid image type");
        }
        if (file.getSize() > MAX_SIZE) {
            throw new RuntimeException("Max file size is 500KB");
        }
    }
}

