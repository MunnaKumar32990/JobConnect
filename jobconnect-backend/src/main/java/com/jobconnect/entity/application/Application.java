package com.jobconnect.entity.application;

import com.jobconnect.entity.auth.User;
import com.jobconnect.entity.candidate.CandidateProfile;
import com.jobconnect.entity.common.BaseEntity;
import com.jobconnect.entity.job.Job;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

/**
 * Application entity - Job applications from candidates
 */
@Entity
@Table(name = "applications", indexes = {
    @Index(name = "idx_applications_job_id", columnList = "job_id"),
    @Index(name = "idx_applications_candidate_id", columnList = "candidate_id"),
    @Index(name = "idx_applications_status", columnList = "application_status"),
    @Index(name = "idx_applications_created_at", columnList = "created_at"),
    @Index(name = "idx_applications_applied_by", columnList = "applied_by")
},
uniqueConstraints = @UniqueConstraint(columnNames = {"job_id", "candidate_id"}))
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Application extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "job_id", nullable = false)
    private Job job;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "candidate_id", nullable = false)
    private CandidateProfile candidate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "applied_by")
    private User appliedBy;

    @Column(columnDefinition = "TEXT")
    private String coverLetter;

    @Enumerated(EnumType.STRING)
    @Column(name = "application_status", nullable = false, length = 50)
    @Builder.Default
    private ApplicationStatus applicationStatus = ApplicationStatus.APPLIED;

    @Column(name = "rating")
    private Integer rating; // 1-5 stars

    @Column(name = "review_notes", columnDefinition = "TEXT")
    private String reviewNotes;

    @Column(name = "interview_scheduled_date")
    private LocalDate interviewScheduledDate;

    @Column(name = "interview_notes", columnDefinition = "TEXT")
    private String interviewNotes;

    @Column(name = "rejected_reason", length = 255)
    private String rejectedReason;
}
