package com.jobconnect.entity.application;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * Application status enumeration
 */
@Getter
@AllArgsConstructor
public enum ApplicationStatus {
    APPLIED("APPLIED"),
    SHORTLISTED("SHORTLISTED"),
    INTERVIEW("INTERVIEW"),
    REJECTED("REJECTED"),
    WITHDRAWN("WITHDRAWN"),
    HIRED("HIRED");

    private final String value;
}
