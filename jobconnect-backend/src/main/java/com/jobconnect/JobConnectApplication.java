package com.jobconnect;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

/**
 * JobConnect Backend - Main Application Entry Point
 * Full-Stack Job Portal System
 */
@SpringBootApplication
@EnableScheduling
public class JobConnectApplication {

    public static void main(String[] args) {
        SpringApplication.run(JobConnectApplication.class, args);
    }
}
