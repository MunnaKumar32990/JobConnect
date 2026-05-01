package com.jobconnect.entity.job;

import com.jobconnect.entity.common.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Job skill entity - Required skills for jobs (many-to-many relationship)
 */
@Entity
@Table(name = "job_skills", indexes = {
    @Index(name = "idx_job_skills_job_id", columnList = "job_id"),
    @Index(name = "idx_job_skills_skill_id", columnList = "skill_id")
},
uniqueConstraints = @UniqueConstraint(columnNames = {"job_id", "skill_id"}))
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JobSkill extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "job_id", nullable = false)
    private Job job;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "skill_id", nullable = false)
    private Skill skill;

    @Column(name = "is_required")
    @Builder.Default
    private Boolean isRequired = true;
}
