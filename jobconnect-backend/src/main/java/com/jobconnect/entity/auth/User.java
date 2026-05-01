package com.jobconnect.entity.auth;

import com.jobconnect.entity.common.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * User entity - Core user table for all system users
 */
@Entity
@Table(name = "users", indexes = {
    @Index(name = "idx_users_email", columnList = "email"),
    @Index(name = "idx_users_role", columnList = "role"),
    @Index(name = "idx_users_account_status", columnList = "account_status")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Email(message = "Email should be valid")
    @NotBlank(message = "Email cannot be blank")
    @Column(unique = true, nullable = false, length = 255)
    private String email;

    @NotBlank(message = "Password cannot be blank")
    @Column(nullable = false, length = 255)
    private String password;

    @NotBlank(message = "First name cannot be blank")
    @Column(name = "first_name", nullable = false, length = 100)
    private String firstName;

    @NotBlank(message = "Last name cannot be blank")
    @Column(name = "last_name", nullable = false, length = 100)
    private String lastName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    private UserRole role;

    @Enumerated(EnumType.STRING)
    @Column(name = "account_status", nullable = false, length = 50)
    @Builder.Default
    private AccountStatus accountStatus = AccountStatus.ACTIVE;

    /**
     * Get full name of user
     */
    public String getFullName() {
        return firstName + " " + lastName;
    }

    /**
     * Check if account is active
     */
    public boolean isActive() {
        return accountStatus == AccountStatus.ACTIVE;
    }

    /**
     * Check if user is a candidate
     */
    public boolean isCandidate() {
        return role == UserRole.CANDIDATE;
    }

    /**
     * Check if user is a recruiter
     */
    public boolean isRecruiter() {
        return role == UserRole.RECRUITER;
    }

    /**
     * Check if user is an admin
     */
    public boolean isAdmin() {
        return role == UserRole.ADMIN;
    }
}
