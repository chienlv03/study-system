package org.studysystem.backend.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserInfoSearchRequest {
    private Long id;
    private String code;
    private String username;
    private String email;
}
