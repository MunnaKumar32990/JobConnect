package com.jobconnect.service;

import com.jobconnect.entity.job.Job;
import com.jobconnect.exception.ResourceNotFoundException;
import com.jobconnect.repository.JobRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class JobService {

    private final JobRepository jobRepository;

    public Page<Job> getAllJobs(Pageable pageable) {
        return jobRepository.findAll(pageable);
    }

    public Job getJobById(Long id) {
        return jobRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found with id: " + id));
    }

    public Page<Job> getJobsByCompany(Long companyId, Pageable pageable) {
        return jobRepository.findByCompanyId(companyId, pageable);
    }

    public Page<Job> getJobsByStatus(String status, Pageable pageable) {
        return jobRepository.findByStatus(status, pageable);
    }

    @Transactional
    public Job createJob(Job job) {
        return jobRepository.save(job);
    }

    @Transactional
    public Job updateJob(Long id, Job jobDetails) {
        Job job = getJobById(id);
        job.setTitle(jobDetails.getTitle());
        job.setDescription(jobDetails.getDescription());
        job.setRequirements(jobDetails.getRequirements());
        job.setLocation(jobDetails.getLocation());
        job.setSalaryMin(jobDetails.getSalaryMin());
        job.setSalaryMax(jobDetails.getSalaryMax());
        job.setJobType(jobDetails.getJobType());
        job.setStatus(jobDetails.getStatus());
        return jobRepository.save(job);
    }

    @Transactional
    public void deleteJob(Long id) {
        Job job = getJobById(id);
        jobRepository.delete(job);
    }
}
