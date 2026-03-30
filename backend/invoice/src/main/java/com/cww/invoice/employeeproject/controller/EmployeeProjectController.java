//package com.cww.invoice.employeeproject.controller;
//
//import com.cww.invoice.employee.entity.Employee;
//import com.cww.invoice.employee.repository.EmployeeRepository;
//import com.cww.invoice.employeeproject.dto.EmployeeProjectRequestDto;
//import com.cww.invoice.employeeproject.entity.EmployeeProject;
//import com.cww.invoice.employeeproject.entity.enums.AssignmentStatus;
//import com.cww.invoice.employeeproject.repository.EmployeeProjectRepository;
//import com.cww.invoice.project.entity.Project;
//import com.cww.invoice.project.repository.ProjectRepository;
//import lombok.RequiredArgsConstructor;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.UUID;
//
//@RestController
//@RequestMapping("/api/company/{companyId}/project-assignments")
//@RequiredArgsConstructor
//public class EmployeeProjectController {
//
//    private final EmployeeRepository candidateRepo;
//    private final ProjectRepository projectRepo;
//    private final EmployeeProjectRepository assignmentRepo;
//
//    /* ================= ASSIGN ================= */
//
//    @PostMapping
//    public void assign(
//            @PathVariable UUID companyId,
//            @RequestBody EmployeeProjectRequestDto dto
//    ) {
//        Employee employee = candidateRepo
//                .findByIdAndCompanyId(dto.getCandidateId(), companyId)
//                .orElseThrow(() -> new RuntimeException("Candidate not found"));
//
//        Project project = projectRepo
//                .findByIdAndCompanyId(dto.getProjectId(), companyId)
//                .orElseThrow(() -> new RuntimeException("Project not found"));
//
//        assignmentRepo.findByCandidateIdAndProjectId(
//                employee.getId(), project.getId()
//        ).ifPresent(a -> {
//            throw new RuntimeException("Already assigned");
//        });
//
//        EmployeeProject cp = new EmployeeProject();
//        cp.setEmployee(employee);
//        cp.setProject(project);
//        cp.setStartDate(dto.getStartDate());
//        cp.setBillingRate(dto.getBillingRate());
//        cp.setAllocationPercent(dto.getAllocationPercent());
//        cp.setStatus(AssignmentStatus.ACTIVE);
//
//        assignmentRepo.save(cp);
//    }
//}
//
