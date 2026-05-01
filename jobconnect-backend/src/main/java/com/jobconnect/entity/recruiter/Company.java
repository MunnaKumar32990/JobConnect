package com.jobconnect.entity.recruiter;

import com.jobconnect.entity.common.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Company entity - Company information for recruiters
 */
@Entity
@Table(name = "companies", indexes = {
    @Index(name = "idx_companies_name", columnList = "name"),
    @Index(name = "idx_companies_industry", columnList = "industry"),
    @Index(name = "idx_companies_is_active", columnList = "is_active")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Company extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false, length = 255)
    private String name;

    @Column(length = 100)
    private String industry;

    @Column(name = "company_size", length = 50)
    private String companySize; // STARTUP, SMALL, MEDIUM, LARGE, ENTERPRISE

    @Column(length = 500)
    private String website;

    @Column(length = 255)
    private String location;

    @Column(length = 100)
    private String city;

    @Column(length = 100)
    private String country;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "logo_url", length = 500)
    private String logoUrl;

    @Column(name = "founded_year")
    private Integer foundedYear;

    @Column(name = "is_active")
    @Builder.Default
    private Boolean isActive = true;
}
