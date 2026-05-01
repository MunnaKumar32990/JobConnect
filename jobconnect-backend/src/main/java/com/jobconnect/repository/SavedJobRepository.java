package com.jobconnect.repository;

import com.jobconnect.entity.common.SavedJob;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Saved job repository for data access
 */
@Repository
public interface SavedJobRepository extends JpaRepository<SavedJob, Long> {
    Page<SavedJob> findByCandidateId(Long candidateId, Pageable pageable);
    Optional<SavedJob> findByCandidateIdAndJobId(Long candidateId, Long jobId);
}
