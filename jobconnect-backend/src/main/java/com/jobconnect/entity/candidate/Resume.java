package com.jobconnect.entity.candidate;

import com.jobconnect.entity.common.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Resume entity - Resume files uploaded by candidates
 */
@Entity
@Table(name = "resumes", indexes = {
    @Index(name = "idx_resumes_candidate_id", columnList = "candidate_id"),
    @Index(name = "idx_resumes_is_primary", columnList = "is_primary")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Resume extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "candidate_id", nullable = false)
    private CandidateProfile candidate;

    @Column(name = "file_name", nullable = false, length = 255)
    private String fileName;

    @Column(name = "file_path", nullable = false, length = 500)
    private String filePath;

    @Column(name = "file_size_kb")
    private Integer fileSizeKb;

    @Column(name = "file_format", length = 10)
    private String fileFormat; // PDF, DOCX

    @Column(name = "is_primary")
    @Builder.Default
    private Boolean isPrimary = false;
}
