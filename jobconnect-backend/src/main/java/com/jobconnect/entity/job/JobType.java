package com.jobconnect.entity.job;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * Job type enumeration
 */
@Getter
@AllArgsConstructor
public enum JobType {
    FULL_TIME("FULL_TIME"),
    PART_TIME("PART_TIME"),
    CONTRACT("CONTRACT"),
    INTERN("INTERN");

    private final String value;
}
