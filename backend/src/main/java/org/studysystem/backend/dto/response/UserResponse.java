package org.studysystem.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@Builder
public class UserResponse {
	private Long id;
	private String code;
	private String username;
	private String email;
	private String dob;
	private String gender;
}
