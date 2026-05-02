package com.jobconnect.service;

import com.jobconnect.entity.candidate.CandidateProfile;
import com.jobconnect.entity.common.SavedJob;
import com.jobconnect.entity.job.Job;
import com.jobconnect.exception.AppException;
import com.jobconnect.exception.ResourceNotFoundException;
import com.jobconnect.repository.CandidateProfileRepository;
import com.jobconnect.repository.JobRepository;
import com.jobconnect.repository.SavedJobRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class SavedJobService {

    private final SavedJobRepository savedJobRepository;
    private final CandidateProfileRepository candidateProfileRepository;
    private final JobRepository jobRepository;

    public Page<SavedJob> getSavedJobsByCandidate(Long candidateId, Pageable pageable) {
        return savedJobRepository.findByCandidateId(candidateId, pageable);
    }

    @Transactional
    public SavedJob saveJob(Long candidateId, Long jobId) {
        CandidateProfile candidate = candidateProfileRepository.findById(candidateId)
                .orElseThrow(() -> new ResourceNotFoundException("Candidate not found: " + candidateId));

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found: " + jobId));

        // Check if already saved
        if (savedJobRepository.findByCandidateIdAndJobId(candidateId, jobId).isPresent()) {
            throw new AppException("Job already saved", HttpStatus.BAD_REQUEST);
        }

        SavedJob savedJob = SavedJob.builder()
                .candidate(candidate)
                .job(job)
                .build();

        return savedJobRepository.save(savedJob);
    }

    @Transactional
    public void unsaveJob(Long candidateId, Long jobId) {
        SavedJob savedJob = savedJobRepository.findByCandidateIdAndJobId(candidateId, jobId)
                .orElseThrow(() -> new ResourceNotFoundException("Saved job not found"));
        
        savedJobRepository.delete(savedJob);
    }

    public boolean isJobSaved(Long candidateId, Long jobId) {
        return savedJobRepository.findByCandidateIdAndJobId(candidateId, jobId).isPresent();
    }
}
