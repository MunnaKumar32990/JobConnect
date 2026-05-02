package com.jobconnect.controller;

import com.jobconnect.entity.application.Application;
import com.jobconnect.entity.application.ApplicationStatus;
import com.jobconnect.service.ApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/applications")
@RequiredArgsConstructor
public class ApplicationController {

    private final ApplicationService applicationService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Page<Application>> getAllApplications(Pageable pageable) {
        return ResponseEntity.ok(applicationService.getAllApplications(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Application> getApplicationById(@PathVariable Long id) {
        return ResponseEntity.ok(applicationService.getApplicationById(id));
    }

    @GetMapping("/job/{jobId}")
    @PreAuthorize("hasRole('RECRUITER')")
    public ResponseEntity<Page<Application>> getApplicationsByJob(@PathVariable Long jobId, Pageable pageable) {
        return ResponseEntity.ok(applicationService.getApplicationsByJob(jobId, pageable));
    }

    @GetMapping("/candidate/{candidateId}")
    @PreAuthorize("hasRole('CANDIDATE')")
    public ResponseEntity<Page<Application>> getApplicationsByCandidate(@PathVariable Long candidateId, Pageable pageable) {
        return ResponseEntity.ok(applicationService.getApplicationsByCandidate(candidateId, pageable));
    }

    @GetMapping("/recruiter/{recruiterId}")
    @PreAuthorize("hasRole('RECRUITER')")
    public ResponseEntity<Page<Application>> getApplicationsByRecruiter(@PathVariable Long recruiterId, Pageable pageable) {
        return ResponseEntity.ok(applicationService.getApplicationsByRecruiter(recruiterId, pageable));
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<Page<Application>> getApplicationsByStatus(@PathVariable ApplicationStatus status, Pageable pageable) {
        return ResponseEntity.ok(applicationService.getApplicationsByStatus(status, pageable));
    }

    @PostMapping
    @PreAuthorize("hasRole('CANDIDATE')")
    public ResponseEntity<Application> createApplication(@RequestBody Application application) {
        return ResponseEntity.status(HttpStatus.CREATED).body(applicationService.createApplication(application));
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasRole('RECRUITER')")
    public ResponseEntity<Application> updateApplicationStatus(@PathVariable Long id, @RequestParam ApplicationStatus status) {
        return ResponseEntity.ok(applicationService.updateApplicationStatus(id, status));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('CANDIDATE') or hasRole('ADMIN')")
    public ResponseEntity<Void> deleteApplication(@PathVariable Long id) {
        applicationService.deleteApplication(id);
        return ResponseEntity.noContent().build();
    }
}
