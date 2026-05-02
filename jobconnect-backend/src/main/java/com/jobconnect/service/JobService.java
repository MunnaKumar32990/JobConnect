package com.jobconnect.service;

import com.jobconnect.entity.job.Job;
import com.jobconnect.entity.job.JobType;
import com.jobconnect.entity.candidate.ExperienceLevel;
import com.jobconnect.exception.ResourceNotFoundException;
import com.jobconnect.repository.JobRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import jakarta.persistence.EntityManager;
import jakarta.persistence.criteria.*;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class JobService {

    private final JobRepository jobRepository;
    private final EntityManager entityManager;

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

    public Page<Job> searchJobs(String keyword, String location, JobType jobType, 
                                ExperienceLevel experienceLevel, BigDecimal minSalary, 
                                Boolean isRemote, Pageable pageable) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Job> query = cb.createQuery(Job.class);
        Root<Job> job = query.from(Job.class);
        
        List<Predicate> predicates = new ArrayList<>();
        
        predicates.add(cb.equal(job.get("status"), "OPEN"));
        
        if (keyword != null && !keyword.isEmpty()) {
            String likePattern = "%" + keyword.toLowerCase() + "%";
            Predicate titleMatch = cb.like(cb.lower(job.get("title")), likePattern);
            Predicate descMatch = cb.like(cb.lower(job.get("description")), likePattern);
            predicates.add(cb.or(titleMatch, descMatch));
        }
        
        if (location != null && !location.isEmpty()) {
            predicates.add(cb.like(cb.lower(job.get("location")), "%" + location.toLowerCase() + "%"));
        }
        
        if (jobType != null) {
            predicates.add(cb.equal(job.get("jobType"), jobType));
        }
        
        if (experienceLevel != null) {
            predicates.add(cb.equal(job.get("experienceLevel"), experienceLevel));
        }
        
        if (minSalary != null) {
            predicates.add(cb.greaterThanOrEqualTo(job.get("salaryMin"), minSalary));
        }
        
        if (isRemote != null) {
            predicates.add(cb.equal(job.get("isRemote"), isRemote));
        }
        
        query.where(predicates.toArray(new Predicate[0]));
        query.orderBy(cb.desc(job.get("createdAt")));
        
        List<Job> results = entityManager.createQuery(query)
                .setFirstResult((int) pageable.getOffset())
                .setMaxResults(pageable.getPageSize())
                .getResultList();
        
        CriteriaQuery<Long> countQuery = cb.createQuery(Long.class);
        Root<Job> countRoot = countQuery.from(Job.class);
        countQuery.select(cb.count(countRoot));
        countQuery.where(predicates.toArray(new Predicate[0]));
        Long total = entityManager.createQuery(countQuery).getSingleResult();
        
        return new PageImpl<>(results, pageable, total);
    }

    @Transactional
    public Job createJob(Job job) {
        job.setStatus("OPEN");
        job.setViewCount(0);
        job.setApplicationCount(0);
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
        job.setExperienceLevel(jobDetails.getExperienceLevel());
        job.setIsRemote(jobDetails.getIsRemote());
        job.setApplicationDeadline(jobDetails.getApplicationDeadline());
        return jobRepository.save(job);
    }

    @Transactional
    public void deleteJob(Long id) {
        Job job = getJobById(id);
        jobRepository.delete(job);
    }

    @Transactional
    public void incrementViewCount(Long id) {
        Job job = getJobById(id);
        job.setViewCount(job.getViewCount() + 1);
        jobRepository.save(job);
    }
}
