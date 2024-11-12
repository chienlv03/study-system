package org.studysystem.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SubmissionFile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fileName;  // Tên gốc của tệp

    private String filePath;  // Đường dẫn lưu trữ tệp trên hệ thống tệp

    @ManyToOne
    @JoinColumn(name = "submission_id", nullable = false)
    private Submission submission;  // Liên kết với lần nộp bài
}
