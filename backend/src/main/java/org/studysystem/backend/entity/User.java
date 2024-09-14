package org.studysystem.backend.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "users",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "code"),
                @UniqueConstraint(columnNames = "email")
        })
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 10)
    @Column(unique = true)
    private String code;

    @NotBlank
    @Size(max = 20)
    private String username;

    @NotBlank
    @Size(max = 50)
    @Email
    private String email;

    @NotBlank
    @Size(max = 20)
    private String dob;

    @NotBlank
    @Size(max = 20)
    private String gender;

    @NotBlank
    @Size(max = 120)
    private String password;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();

    // tại sao lại sử dụng CascadeType.ALL ? t thấy đa phần m đều dùng GET vậy m có quan tâm đến hiệu năng
    // khi fetch toàn bộ dữ liệu nếu sử dụng ALL không
    // m có quan tâm đến tính nhất quán của dữ liệu khi m delete nó sẽ delete cả các trường có liên quan không

    // ví dụ nếu m xóa một user khỏi db thì liệu course có bị xóa cùng không
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Course> courses = new HashSet<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<CourseEnrollment> courseEnrollments = new HashSet<>();

    public User(String code, String username, String email, String dob, String gender, String encode) {
        this.code = code;
        this.username = username;
        this.email = email;
        this.dob = dob;
        this.gender = gender;
        this.password = encode;
    }
}
