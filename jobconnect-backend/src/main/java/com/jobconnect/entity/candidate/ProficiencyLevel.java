package com.jobconnect.entity.candidate;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * Proficiency levels for candidate skills
 */
@Getter
@AllArgsConstructor
public enum ProficiencyLevel {
    BEGINNER("BEGINNER"),
    INTERMEDIATE("INTERMEDIATE"),
    EXPERT("EXPERT");

    private final String value;
}
