package com.jobconnect.service;

import com.jobconnect.entity.candidate.CandidateProfile;
import com.jobconnect.exception.ResourceNotFoundException;
import com.jobconnect.repository.CandidateProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CandidateProfileService {

    private final CandidateProfileRepository candidateProfileRepository;

    public CandidateProfile getProfileById(Long id) {
        return candidateProfileRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Candidate profile not found with id: " + id));
    }

    public CandidateProfile getProfileByUserId(Long userId) {
        return candidateProfileRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Candidate profile not found for user id: " + userId));
    }

    @Transactional
    public CandidateProfile createProfile(CandidateProfile profile) {
        return candidateProfileRepository.save(profile);
    }

    @Transactional
    public CandidateProfile updateProfile(Long id, CandidateProfile profileDetails) {
        CandidateProfile profile = getProfileById(id);
        if (profileDetails.getPhoneNumber() != null) profile.setPhoneNumber(profileDetails.getPhoneNumber());
        if (profileDetails.getLocation() != null) profile.setLocation(profileDetails.getLocation());
        if (profileDetails.getExperienceLevel() != null) profile.setExperienceLevel(profileDetails.getExperienceLevel());
        if (profileDetails.getCurrentJobTitle() != null) profile.setCurrentJobTitle(profileDetails.getCurrentJobTitle());
        if (profileDetails.getBio() != null) profile.setBio(profileDetails.getBio());
        if (profileDetails.getLinkedinUrl() != null) profile.setLinkedinUrl(profileDetails.getLinkedinUrl());
        if (profileDetails.getGithubUrl() != null) profile.setGithubUrl(profileDetails.getGithubUrl());
        if (profileDetails.getPortfolioUrl() != null) profile.setPortfolioUrl(profileDetails.getPortfolioUrl());
        return candidateProfileRepository.save(profile);
    }

    @Transactional
    public void deleteProfile(Long id) {
        CandidateProfile profile = getProfileById(id);
        candidateProfileRepository.delete(profile);
    }
}
