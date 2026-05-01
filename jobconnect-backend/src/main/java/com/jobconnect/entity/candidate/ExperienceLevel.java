package com.jobconnect.entity.candidate;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * Experience levels for candidates
 */
@Getter
@AllArgsConstructor
public enum ExperienceLevel {
    ENTRY("ENTRY"),
    MID("MID"),
    SENIOR("SENIOR");

    private final String value;
}
