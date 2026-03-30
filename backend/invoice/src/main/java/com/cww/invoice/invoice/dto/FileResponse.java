package com.cww.invoice.invoice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;

@Data
@AllArgsConstructor
public class FileResponse {

    private Resource resource;
    private String fileName;
    private MediaType mediaType;
}
