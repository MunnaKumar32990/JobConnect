package com.jobconnect.entity.candidate;

import com.jobconnect.entity.auth.User;
import com.jobconnect.entity.common.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

/**
 * Candidate profile entity - Extended profile information for candidates
 */
@Entity
@Table(name = "candidate_profiles", indexes = {
    @Index(name = "idx_candidate_profiles_location", columnList = "location"),
    @Index(name = "idx_candidate_profiles_experience_level", columnList = "experience_level"),
    @Index(name = "idx_candidate_profiles_is_open_to_work", columnList = "is_open_to_work")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CandidateProfile extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(length = 255)
    private String headline;

    @Column(columnDefinition = "TEXT")
    private String aboutMe;

    @Column(columnDefinition = "TEXT")
    private String bio;

    @Column(name = "current_job_title", length = 255)
    private String currentJobTitle;

    @Column(name = "linkedin_url", length = 500)
    private String linkedinUrl;

    @Column(name = "github_url", length = 500)
    private String githubUrl;

    @Column(name = "portfolio_url", length = 500)
    private String portfolioUrl;

    @Column(name = "phone_number", length = 20)
    private String phoneNumber;

    @Column(length = 255)
    private String location;

    @Column(length = 100)
    private String city;

    @Column(length = 100)
    private String country;

    @Enumerated(EnumType.STRING)
    @Column(name = "experience_level", length = 50)
    private ExperienceLevel experienceLevel;

    @Column(name = "total_years_experience")
    @Builder.Default
    private Integer totalYearsExperience = 0;

    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    @Column(name = "profile_photo_url", length = 500)
    private String profilePhotoUrl;

    @Column(name = "is_open_to_work")
    @Builder.Default
    private Boolean isOpenToWork = true;
}
