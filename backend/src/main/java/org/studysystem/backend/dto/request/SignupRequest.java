package org.studysystem.backend.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SignupRequest {

    @NotBlank
    @Size(min = 3, max = 20)
    private String code;

    @NotBlank
    @Size(min = 3, max = 20)
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
    @Size(min = 6, max = 40)
    private String password;

    private Set<String> role;
}
