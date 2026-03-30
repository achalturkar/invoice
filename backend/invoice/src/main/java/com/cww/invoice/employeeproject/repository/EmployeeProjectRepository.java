//package com.cww.invoice.employeeproject.repository;
//
//import com.cww.invoice.employeeproject.entity.EmployeeProject;
//import org.springframework.data.jpa.repository.JpaRepository;
//
//import java.util.List;
//import java.util.Optional;
//import java.util.UUID;
//
//public interface EmployeeProjectRepository extends JpaRepository<EmployeeProject, UUID> {
//
//    List<EmployeeProject> findByCandidateId(UUID candidateId);
//
//    List<EmployeeProject> findByProjectId(UUID projectId);
//
//    Optional<EmployeeProject> findByCandidateIdAndProjectId(
//            UUID candidateId,
//            UUID projectId
//    );
//}//