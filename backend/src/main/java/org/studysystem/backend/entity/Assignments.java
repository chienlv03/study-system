package org.studysystem.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Assignments {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;

    @Lob
    private String content;  // Bài tập dạng text

    private String fileUrl;  // Đường dẫn tới file

    private String imageUrl;  // Đường dẫn tới hình ảnh

    @ManyToOne
    private Course course;  // Liên kết với lớp học

    @ManyToOne
    private User user;  // Liên kết với giáo viên

    private LocalDateTime dueDate;  // Thời hạn nộp bài
}

