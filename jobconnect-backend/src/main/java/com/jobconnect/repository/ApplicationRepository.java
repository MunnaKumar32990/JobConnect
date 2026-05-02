package com.jobconnect.repository;

import com.jobconnect.entity.application.Application;
import com.jobconnect.entity.application.ApplicationStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Application repository for data access
 */
@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {
    Optional<Application> findByJobIdAndCandidateId(Long jobId, Long candidateId);
    Page<Application> findByJobId(Long jobId, Pageable pageable);
    Page<Application> findByCandidateId(Long candidateId, Pageable pageable);
    Page<Application> findByApplicationStatus(ApplicationStatus status, Pageable pageable);
    Page<Application> findByJobPostedById(Long recruiterId, Pageable pageable);
}
