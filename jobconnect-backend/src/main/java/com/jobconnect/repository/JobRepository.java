package com.jobconnect.repository;

import com.jobconnect.entity.job.Job;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Job repository for data access
 */
@Repository
public interface JobRepository extends JpaRepository<Job, Long> {
    Page<Job> findByCompanyId(Long companyId, Pageable pageable);
    Page<Job> findByStatus(String status, Pageable pageable);
    List<Job> findByPostedById(Long userId);
}
