package com.jobconnect.entity.application;

import com.jobconnect.entity.auth.User;
import com.jobconnect.entity.common.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * Interview schedule entity - Interview scheduling information
 */
@Entity
@Table(name = "interview_schedules", indexes = {
    @Index(name = "idx_interview_schedules_application_id", columnList = "application_id"),
    @Index(name = "idx_interview_schedules_interview_date", columnList = "interview_date"),
    @Index(name = "idx_interview_schedules_is_completed", columnList = "is_completed")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InterviewSchedule extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "application_id", nullable = false)
    private Application application;

    @Column(name = "interview_date", nullable = false)
    private LocalDateTime interviewDate;

    @Column(name = "duration_minutes")
    @Builder.Default
    private Integer durationMinutes = 60;

    @Column(name = "interview_type", length = 50)
    private String interviewType; // PHONE, VIDEO, IN_PERSON

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "interviewer_id")
    private User interviewer;

    @Column(name = "meeting_link", length = 500)
    private String meetingLink;

    @Column(name = "preparation_notes", columnDefinition = "TEXT")
    private String preparationNotes;

    @Column(name = "feedback", columnDefinition = "TEXT")
    private String feedback;

    @Column(name = "is_completed")
    @Builder.Default
    private Boolean isCompleted = false;

    @Column(name = "completed_at")
    private LocalDateTime completedAt;
}
