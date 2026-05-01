package com.jobconnect.entity.candidate;

import com.jobconnect.entity.common.BaseEntity;
import com.jobconnect.entity.job.Skill;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Candidate skill entity - Skills associated with candidates
 */
@Entity
@Table(name = "candidate_skills", indexes = {
    @Index(name = "idx_candidate_skills_candidate_id", columnList = "candidate_id"),
    @Index(name = "idx_candidate_skills_skill_id", columnList = "skill_id"),
    @Index(name = "idx_candidate_skills_proficiency", columnList = "proficiency_level")
},
uniqueConstraints = @UniqueConstraint(columnNames = {"candidate_id", "skill_id"}))
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CandidateSkill extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "candidate_id", nullable = false)
    private CandidateProfile candidate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "skill_id", nullable = false)
    private Skill skill;

    @Enumerated(EnumType.STRING)
    @Column(name = "proficiency_level", length = 50)
    private ProficiencyLevel proficiencyLevel;

    @Column(name = "years_of_experience")
    private Integer yearsOfExperience;

    @Column(name = "is_endorsement_visible")
    @Builder.Default
    private Boolean isEndorsementVisible = true;
}
