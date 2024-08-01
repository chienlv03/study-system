package org.studysystem.backend.service;


import org.studysystem.backend.dto.request.PasswordChangeRequest;
import org.studysystem.backend.dto.request.UserInfoSearchRequest;
import org.studysystem.backend.dto.request.UserUpdateRequest;
import org.studysystem.backend.dto.response.UserInfoResponse;

import java.util.List;

public interface UserService {
    List<UserInfoSearchRequest> searchStudents(String keyword);

    UserInfoResponse updateUser(UserUpdateRequest userUpdateRequest);

    UserInfoResponse getCurrentUser();

    void changePassword(PasswordChangeRequest passwordChangeRequest);
}
