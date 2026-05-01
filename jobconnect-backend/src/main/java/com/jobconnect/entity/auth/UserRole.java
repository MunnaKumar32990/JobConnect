package com.jobconnect.entity.auth;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * User roles in the JobConnect system
 */
@Getter
@AllArgsConstructor
public enum UserRole {
    CANDIDATE("CANDIDATE"),
    RECRUITER("RECRUITER"),
    ADMIN("ADMIN");

    private final String value;
}
