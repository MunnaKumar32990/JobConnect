package com.jobconnect.controller;

import com.jobconnect.entity.candidate.CandidateProfile;
import com.jobconnect.service.CandidateProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/candidates")
@RequiredArgsConstructor
public class CandidateProfileController {

    private final CandidateProfileService candidateProfileService;

    @GetMapping("/{id}")
    public ResponseEntity<CandidateProfile> getProfileById(@PathVariable Long id) {
        return ResponseEntity.ok(candidateProfileService.getProfileById(id));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<CandidateProfile> getProfileByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(candidateProfileService.getProfileByUserId(userId));
    }

    @PostMapping
    @PreAuthorize("hasRole('CANDIDATE')")
    public ResponseEntity<CandidateProfile> createProfile(@RequestBody CandidateProfile profile) {
        return ResponseEntity.status(HttpStatus.CREATED).body(candidateProfileService.createProfile(profile));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('CANDIDATE')")
    public ResponseEntity<CandidateProfile> updateProfile(@PathVariable Long id, @RequestBody CandidateProfile profile) {
        return ResponseEntity.ok(candidateProfileService.updateProfile(id, profile));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('CANDIDATE') or hasRole('ADMIN')")
    public ResponseEntity<Void> deleteProfile(@PathVariable Long id) {
        candidateProfileService.deleteProfile(id);
        return ResponseEntity.noContent().build();
    }
}
