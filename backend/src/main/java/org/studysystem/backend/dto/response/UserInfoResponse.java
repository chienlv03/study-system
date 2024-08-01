package org.studysystem.backend.dto.response;

import lombok.*;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserInfoResponse {
	private Long id;
	private String code;
	private String username;
	private String email;
	private String dob;
	private String gender;
	private List<String> roles;
}
