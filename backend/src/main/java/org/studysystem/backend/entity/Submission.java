package org.studysystem.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Submission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Assignments assignment;

    @ManyToOne
    private User user;

    private String content;  // Nội dung bài nộp (text)

    private String fileUrl;  // URL của file nộp kèm
    private String imageUrl;  // URL của ảnh nộp kèm

    private LocalDateTime submissionDate;  // Thời gian nộp bài

    private boolean graded;  // Đã chấm điểm hay chưa
    private Integer grade;  // Điểm của bài nộp
    private String feedback;  // Nhận xét của giáo viên

    // Getters, setters
}


