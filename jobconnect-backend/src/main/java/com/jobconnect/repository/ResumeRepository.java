package com.jobconnect.repository;

import com.jobconnect.entity.candidate.Resume;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Resume repository for data access
 */
@Repository
public interface ResumeRepository extends JpaRepository<Resume, Long> {
    List<Resume> findByCandidateId(Long candidateId);
    Optional<Resume> findByCandidateIdAndIsPrimaryTrue(Long candidateId);
}
