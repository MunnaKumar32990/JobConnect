package com.jobconnect.entity.job;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * Skill category enumeration
 */
@Getter
@AllArgsConstructor
public enum SkillCategory {
    PROGRAMMING("PROGRAMMING"),
    FRAMEWORK("FRAMEWORK"),
    TOOL("TOOL"),
    LANGUAGE("LANGUAGE"),
    SOFT_SKILL("SOFT_SKILL");

    private final String value;
}
