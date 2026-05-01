package com.jobconnect.entity.recruiter;

import com.jobconnect.entity.auth.User;
import com.jobconnect.entity.common.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * Recruiter profile entity - Recruiter-specific profile information
 */
@Entity
@Table(name = "recruiter_profiles", indexes = {
    @Index(name = "idx_recruiter_profiles_company_id", columnList = "company_id"),
    @Index(name = "idx_recruiter_profiles_is_verified", columnList = "is_verified")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecruiterProfile extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id")
    private Company company;

    @Column(length = 100)
    private String position;

    @Column(name = "phone_number", length = 20)
    private String phoneNumber;

    @Column(name = "is_verified")
    @Builder.Default
    private Boolean isVerified = false;

    @Column(name = "verification_date")
    private LocalDateTime verificationDate;
}
