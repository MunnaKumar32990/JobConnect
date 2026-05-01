package com.jobconnect.entity.job;

import com.jobconnect.entity.auth.User;
import com.jobconnect.entity.candidate.ExperienceLevel;
import com.jobconnect.entity.common.BaseEntity;
import com.jobconnect.entity.recruiter.Company;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * Job entity - Job postings by recruiters
 */
@Entity
@Table(name = "jobs", indexes = {
    @Index(name = "idx_jobs_company_id", columnList = "company_id"),
    @Index(name = "idx_jobs_posted_by", columnList = "posted_by"),
    @Index(name = "idx_jobs_status", columnList = "status"),
    @Index(name = "idx_jobs_location", columnList = "location"),
    @Index(name = "idx_jobs_job_type", columnList = "job_type"),
    @Index(name = "idx_jobs_experience_level", columnList = "experience_level"),
    @Index(name = "idx_jobs_created_at", columnList = "created_at"),
    @Index(name = "idx_jobs_salary_range", columnList = "salary_min,salary_max")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Job extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "posted_by")
    private User postedBy;

    @Column(nullable = false, length = 255)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(columnDefinition = "TEXT")
    private String requirements;

    @Column(length = 255)
    private String location;

    @Column(length = 100)
    private String city;

    @Column(length = 100)
    private String country;

    @Enumerated(EnumType.STRING)
    @Column(name = "job_type", length = 50)
    private JobType jobType;

    @Enumerated(EnumType.STRING)
    @Column(name = "experience_level", length = 50)
    private ExperienceLevel experienceLevel;

    @Column(name = "salary_min", precision = 12, scale = 2)
    private BigDecimal salaryMin;

    @Column(name = "salary_max", precision = 12, scale = 2)
    private BigDecimal salaryMax;

    @Column(length = 10)
    @Builder.Default
    private String currency = "USD";

    @Column(name = "application_deadline")
    private LocalDate applicationDeadline;

    @Column(name = "is_remote")
    @Builder.Default
    private Boolean isRemote = false;

    @Column(length = 50)
    @Builder.Default
    private String status = "OPEN"; // OPEN, CLOSED, ARCHIVED

    @Column(name = "view_count")
    @Builder.Default
    private Integer viewCount = 0;

    @Column(name = "application_count")
    @Builder.Default
    private Integer applicationCount = 0;

    @Column(name = "is_featured")
    @Builder.Default
    private Boolean isFeatured = false;
}
