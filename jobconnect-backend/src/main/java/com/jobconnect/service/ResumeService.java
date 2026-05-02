package com.jobconnect.service;

import com.jobconnect.entity.candidate.CandidateProfile;
import com.jobconnect.entity.candidate.Resume;
import com.jobconnect.exception.AppException;
import com.jobconnect.exception.ResourceNotFoundException;
import com.jobconnect.repository.CandidateProfileRepository;
import com.jobconnect.repository.ResumeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ResumeService {

    private final ResumeRepository resumeRepository;
    private final CandidateProfileRepository candidateProfileRepository;
    private final FileStorageService fileStorageService;

    public List<Resume> getResumesByCandidate(Long candidateId) {
        return resumeRepository.findByCandidateId(candidateId);
    }

    public Resume getPrimaryResume(Long candidateId) {
        return resumeRepository.findByCandidateIdAndIsPrimaryTrue(candidateId)
                .orElseThrow(() -> new ResourceNotFoundException("No primary resume found for candidate: " + candidateId));
    }

    @Transactional
    public Resume uploadResume(Long candidateId, MultipartFile file, Boolean isPrimary) {
        CandidateProfile candidate = candidateProfileRepository.findById(candidateId)
                .orElseThrow(() -> new ResourceNotFoundException("Candidate not found: " + candidateId));

        String allowedExtensions = "pdf,docx,doc";
        String fileExtension = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf(".") + 1).toLowerCase();
        
        if (!allowedExtensions.contains(fileExtension)) {
            throw new AppException("Invalid file type. Only PDF, DOCX, DOC allowed", HttpStatus.BAD_REQUEST);
        }

        if (file.getSize() > 10485760) { // 10MB
            throw new AppException("File size exceeds 10MB limit", HttpStatus.BAD_REQUEST);
        }

        String fileName = fileStorageService.storeFile(file);

        if (isPrimary != null && isPrimary) {
            resumeRepository.findByCandidateIdAndIsPrimaryTrue(candidateId)
                    .ifPresent(existingPrimary -> {
                        existingPrimary.setIsPrimary(false);
                        resumeRepository.save(existingPrimary);
                    });
        }

        Resume resume = Resume.builder()
                .candidate(candidate)
                .fileName(file.getOriginalFilename())
                .filePath(fileName)
                .fileSizeKb((int) (file.getSize() / 1024))
                .fileFormat(fileExtension.toUpperCase())
                .isPrimary(isPrimary != null && isPrimary)
                .build();

        return resumeRepository.save(resume);
    }

    @Transactional
    public void deleteResume(Long resumeId) {
        Resume resume = resumeRepository.findById(resumeId)
                .orElseThrow(() -> new ResourceNotFoundException("Resume not found: " + resumeId));
        
        fileStorageService.deleteFile(resume.getFilePath());
        resumeRepository.delete(resume);
    }

    @Transactional
    public Resume setPrimaryResume(Long resumeId) {
        Resume resume = resumeRepository.findById(resumeId)
                .orElseThrow(() -> new ResourceNotFoundException("Resume not found: " + resumeId));

        resumeRepository.findByCandidateIdAndIsPrimaryTrue(resume.getCandidate().getId())
                .ifPresent(existingPrimary -> {
                    existingPrimary.setIsPrimary(false);
                    resumeRepository.save(existingPrimary);
                });

        resume.setIsPrimary(true);
        return resumeRepository.save(resume);
    }
}
