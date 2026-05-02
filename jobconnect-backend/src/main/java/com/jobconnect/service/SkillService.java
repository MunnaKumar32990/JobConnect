package com.jobconnect.service;

import com.jobconnect.entity.job.Skill;
import com.jobconnect.exception.AppException;
import com.jobconnect.exception.ResourceNotFoundException;
import com.jobconnect.repository.SkillRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SkillService {

    private final SkillRepository skillRepository;

    public List<Skill> getAllSkills() {
        return skillRepository.findAll();
    }

    public Skill getSkillById(Long id) {
        return skillRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Skill not found with id: " + id));
    }

    @Transactional
    public Skill createSkill(Skill skill) {
        if (skillRepository.findByName(skill.getName()).isPresent()) {
            throw new AppException("Skill with name '" + skill.getName() + "' already exists", HttpStatus.BAD_REQUEST);
        }
        return skillRepository.save(skill);
    }

    @Transactional
    public Skill updateSkill(Long id, Skill skillDetails) {
        Skill skill = getSkillById(id);
        skill.setName(skillDetails.getName());
        skill.setCategory(skillDetails.getCategory());
        skill.setIsActive(skillDetails.getIsActive());
        return skillRepository.save(skill);
    }

    @Transactional
    public void deleteSkill(Long id) {
        Skill skill = getSkillById(id);
        skillRepository.delete(skill);
    }
}
