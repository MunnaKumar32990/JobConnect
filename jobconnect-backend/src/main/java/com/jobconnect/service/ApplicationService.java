package com.jobconnect.service;

import com.jobconnect.entity.application.Application;
import com.jobconnect.entity.application.ApplicationStatus;
import com.jobconnect.exception.AppException;
import com.jobconnect.exception.ResourceNotFoundException;
import com.jobconnect.repository.ApplicationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ApplicationService {

    private final ApplicationRepository applicationRepository;

    public Page<Application> getAllApplications(Pageable pageable) {
        return applicationRepository.findAll(pageable);
    }

    public Application getApplicationById(Long id) {
        return applicationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found with id: " + id));
    }

    public Page<Application> getApplicationsByJob(Long jobId, Pageable pageable) {
        return applicationRepository.findByJobId(jobId, pageable);
    }

    public Page<Application> getApplicationsByCandidate(Long candidateId, Pageable pageable) {
        return applicationRepository.findByCandidateId(candidateId, pageable);
    }

    public Page<Application> getApplicationsByStatus(ApplicationStatus status, Pageable pageable) {
        return applicationRepository.findByApplicationStatus(status, pageable);
    }

    @Transactional
    public Application createApplication(Application application) {
        if (applicationRepository.findByJobIdAndCandidateId(
                application.getJob().getId(), application.getCandidate().getId()).isPresent()) {
            throw new AppException("Application already exists for this job", HttpStatus.BAD_REQUEST);
        }
        return applicationRepository.save(application);
    }

    @Transactional
    public Application updateApplicationStatus(Long id, ApplicationStatus status) {
        Application application = getApplicationById(id);
        application.setApplicationStatus(status);
        return applicationRepository.save(application);
    }

    @Transactional
    public void deleteApplication(Long id) {
        Application application = getApplicationById(id);
        applicationRepository.delete(application);
    }
}
