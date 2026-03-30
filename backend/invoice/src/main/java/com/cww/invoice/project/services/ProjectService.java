//package com.cww.invoice.project.services;
//
//
//import com.cww.invoice.company.entity.Company;
//import com.cww.invoice.company.repository.CompanyRepository;
//import com.cww.invoice.project.dto.ProjectRequestDto;
//import com.cww.invoice.project.dto.ProjectResponseDto;
//import com.cww.invoice.project.entity.Project;
//import com.cww.invoice.project.entity.enums.ProjectStatus;
//import com.cww.invoice.project.repository.ProjectRepository;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//import java.util.UUID;
//
//@Service
//@RequiredArgsConstructor
//public class ProjectService {
//
//    private final CompanyRepository companyRepository;
//    private final ProjectRepository projectRepository;
//
//
////    create
//
//    public ProjectResponseDto createProject(UUID companyId, ProjectRequestDto dto ){
//        Company company = companyRepository.findById(companyId).orElseThrow(()-> new RuntimeException("Company Not Found"));
//
//        Project project = new Project();
//        project.setCompany(company);
//        project.setStatus(dto.getStatus() != null ? dto.getStatus(): ProjectStatus.ACTIVE);
//        map(project, dto);
//
//
//        projectRepository.save(project);
//        return mapToDto(project);
//    }
//
////    Get ALl
//
//    public List<ProjectResponseDto> allProject(UUID companyId){
//        return projectRepository.findByCompanyId(companyId).stream().map(this:: mapToDto).toList();
//    }
//
//
//    //Get data by Id
//
//    public ProjectResponseDto getProjectById(UUID companyId, UUID id){
//        Project project = projectRepository.findByIdAndCompanyId(id, companyId).orElseThrow(()-> new RuntimeException("Company Project Not found"));
//        return mapToDto(project);
//    }
//
//    //update
//
//    public ProjectResponseDto update(UUID companyId, UUID id, ProjectRequestDto projectRequestDto){
//        Project p = projectRepository.findByIdAndCompanyId(id, companyId).orElseThrow(()-> new RuntimeException("Company Project not found"));
//        map(p, projectRequestDto);
//        projectRepository.save(p);
//        return mapToDto(p);
//    }
//
//    //update status
//
//    public void updateStatus(UUID companyId, UUID id, ProjectStatus status){
//        Project project = projectRepository.findByIdAndCompanyId(id, companyId)
//                .orElseThrow(() -> new RuntimeException("Project not found"));
//        project.setStatus(status);
//         projectRepository.save(project);
//
//    }
//
//
//
//    private void map(Project project, ProjectRequestDto dto){
//        project.setName(dto.getName());
//        project.setCode(dto.getCode());
//        project.setDescription(dto.getDescription());
//        project.setStartDate(dto.getStartDate());
//        project.setEndDate(dto.getEndDate());
//        project.setBudget(dto.getBudget());
//        if(dto.getStatus() != null){
//            project.setStatus(dto.getStatus());
//        }
//    }
//
//    private ProjectResponseDto mapToDto(Project project){
//        ProjectResponseDto projectResponseDto = new ProjectResponseDto();
//        projectResponseDto.setId(project.getId());
//        projectResponseDto.setName(project.getName());
//        projectResponseDto.setCode(project.getCode());
//        projectResponseDto.setDescription(project.getDescription());
//        projectResponseDto.setStartDate(project.getStartDate());
//        projectResponseDto.setEndDate(project.getEndDate());
//        projectResponseDto.setBudget(project.getBudget());
//        projectResponseDto.setStatus(project.getStatus());
//
//        return projectResponseDto;
//    }
//
//}
