package com.jobconnect.entity.job;

import com.jobconnect.entity.common.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Skill entity - Master list of all available skills
 */
@Entity
@Table(name = "skills", indexes = {
    @Index(name = "idx_skills_name", columnList = "name"),
    @Index(name = "idx_skills_category", columnList = "category")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Skill extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false, length = 100)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(length = 50)
    private SkillCategory category;

    @Column(name = "is_active")
    @Builder.Default
    private Boolean isActive = true;
}
