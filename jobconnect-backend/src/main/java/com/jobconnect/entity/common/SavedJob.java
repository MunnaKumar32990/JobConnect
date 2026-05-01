package com.jobconnect.entity.common;

import com.jobconnect.entity.candidate.CandidateProfile;
import com.jobconnect.entity.job.Job;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * Saved job entity - Jobs bookmarked/saved by candidates
 */
@Entity
@Table(name = "saved_jobs", indexes = {
    @Index(name = "idx_saved_jobs_candidate_id", columnList = "candidate_id"),
    @Index(name = "idx_saved_jobs_job_id", columnList = "job_id"),
    @Index(name = "idx_saved_jobs_saved_at", columnList = "saved_at")
},
uniqueConstraints = @UniqueConstraint(columnNames = {"candidate_id", "job_id"}))
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SavedJob {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "candidate_id", nullable = false)
    private CandidateProfile candidate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "job_id", nullable = false)
    private Job job;

    @Column(name = "saved_at", nullable = false)
    @Builder.Default
    private LocalDateTime savedAt = LocalDateTime.now();
}
