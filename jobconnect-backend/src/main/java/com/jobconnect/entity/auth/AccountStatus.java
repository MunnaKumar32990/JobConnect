package com.jobconnect.entity.auth;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * User account status
 */
@Getter
@AllArgsConstructor
public enum AccountStatus {
    ACTIVE("ACTIVE"),
    INACTIVE("INACTIVE"),
    SUSPENDED("SUSPENDED");

    private final String value;
}
