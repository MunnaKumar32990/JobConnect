package com.jobconnect.controller;

import com.jobconnect.entity.candidate.Resume;
import com.jobconnect.service.FileStorageService;
import com.jobconnect.service.ResumeService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.util.List;

@RestController
@RequestMapping("/api/v1/resumes")
@RequiredArgsConstructor
public class ResumeController {

    private final ResumeService resumeService;
    private final FileStorageService fileStorageService;

    @GetMapping("/candidate/{candidateId}")
    @PreAuthorize("hasRole('CANDIDATE') or hasRole('RECRUITER') or hasRole('ADMIN')")
    public ResponseEntity<List<Resume>> getResumesByCandidate(@PathVariable Long candidateId) {
        return ResponseEntity.ok(resumeService.getResumesByCandidate(candidateId));
    }

    @GetMapping("/candidate/{candidateId}/primary")
    @PreAuthorize("hasRole('CANDIDATE') or hasRole('RECRUITER') or hasRole('ADMIN')")
    public ResponseEntity<Resume> getPrimaryResume(@PathVariable Long candidateId) {
        return ResponseEntity.ok(resumeService.getPrimaryResume(candidateId));
    }

    @PostMapping("/upload")
    @PreAuthorize("hasRole('CANDIDATE')")
    public ResponseEntity<Resume> uploadResume(
            @RequestParam Long candidateId,
            @RequestParam MultipartFile file,
            @RequestParam(required = false) Boolean isPrimary) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(resumeService.uploadResume(candidateId, file, isPrimary));
    }

    @PatchMapping("/{resumeId}/set-primary")
    @PreAuthorize("hasRole('CANDIDATE')")
    public ResponseEntity<Resume> setPrimaryResume(@PathVariable Long resumeId) {
        return ResponseEntity.ok(resumeService.setPrimaryResume(resumeId));
    }

    @DeleteMapping("/{resumeId}")
    @PreAuthorize("hasRole('CANDIDATE') or hasRole('ADMIN')")
    public ResponseEntity<Void> deleteResume(@PathVariable Long resumeId) {
        resumeService.deleteResume(resumeId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/download/{fileName}")
    public ResponseEntity<Resource> downloadResume(@PathVariable String fileName) {
        try {
            Path filePath = fileStorageService.loadFile(fileName);
            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists() && resource.isReadable()) {
                return ResponseEntity.ok()
                        .contentType(MediaType.APPLICATION_OCTET_STREAM)
                        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileName + "\"")
                        .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}
