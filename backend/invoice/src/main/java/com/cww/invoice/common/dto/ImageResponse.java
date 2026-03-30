package com.cww.invoice.common.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.core.io.Resource;

@Getter
@AllArgsConstructor
public class ImageResponse {
    private Resource resource;
    private String contentType;
}