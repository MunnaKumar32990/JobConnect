package com.jobconnect.controller;

import com.jobconnect.entity.common.SavedJob;
import com.jobconnect.service.SavedJobService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/saved-jobs")
@RequiredArgsConstructor
public class SavedJobController {

    private final SavedJobService savedJobService;

    @GetMapping("/candidate/{candidateId}")
    @PreAuthorize("hasRole('CANDIDATE')")
    public ResponseEntity<Page<SavedJob>> getSavedJobs(@PathVariable Long candidateId, Pageable pageable) {
        return ResponseEntity.ok(savedJobService.getSavedJobsByCandidate(candidateId, pageable));
    }

    @PostMapping
    @PreAuthorize("hasRole('CANDIDATE')")
    public ResponseEntity<SavedJob> saveJob(@RequestParam Long candidateId, @RequestParam Long jobId) {
        return ResponseEntity.status(HttpStatus.CREATED).body(savedJobService.saveJob(candidateId, jobId));
    }

    @DeleteMapping
    @PreAuthorize("hasRole('CANDIDATE')")
    public ResponseEntity<Void> unsaveJob(@RequestParam Long candidateId, @RequestParam Long jobId) {
        savedJobService.unsaveJob(candidateId, jobId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/check")
    @PreAuthorize("hasRole('CANDIDATE')")
    public ResponseEntity<Boolean> isJobSaved(@RequestParam Long candidateId, @RequestParam Long jobId) {
        return ResponseEntity.ok(savedJobService.isJobSaved(candidateId, jobId));
    }
}
