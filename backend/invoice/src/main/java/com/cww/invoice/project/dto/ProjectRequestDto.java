package com.cww.invoice.project.dto;


import com.cww.invoice.project.entity.enums.ProjectStatus;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
public class ProjectRequestDto {

    private String name;
    private String code;
    private String description;

    private LocalDate startDate;
    private LocalDate endDate;

    private BigDecimal budget;
    private ProjectStatus status;
}

