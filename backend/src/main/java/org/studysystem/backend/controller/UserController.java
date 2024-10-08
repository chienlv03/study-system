package org.studysystem.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.studysystem.backend.dto.request.PasswordChangeRequest;
import org.studysystem.backend.dto.request.UserInfoSearchRequest;
import org.studysystem.backend.dto.request.UserUpdateRequest;
import org.studysystem.backend.dto.response.MessageResponse;
import org.studysystem.backend.dto.response.UserInfoResponse;
import org.studysystem.backend.service.UserService;

import java.util.List;


@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    @GetMapping("/my-info")
    public ResponseEntity<UserInfoResponse> getCurrentUser() {
        UserInfoResponse userInfoResponse = userService.getCurrentUser();
        return ResponseEntity.ok(userInfoResponse);
    }

    @PutMapping("/update")
    public ResponseEntity<UserInfoResponse> updateUser(@RequestBody UserUpdateRequest userUpdateRequest) {
        UserInfoResponse userInfoResponse = userService.updateUser(userUpdateRequest);
        return ResponseEntity.ok(userInfoResponse);
    }

    @GetMapping("/search")
    public ResponseEntity<List<UserInfoSearchRequest>> searchStudents(@RequestParam String keyword) {
        if (keyword == null || keyword.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        List<UserInfoSearchRequest> students = userService.searchStudents(keyword);
        return new ResponseEntity<>(students, HttpStatus.OK);
    }

    @PostMapping("/change-password")
    public ResponseEntity<MessageResponse> changePassword(@RequestBody PasswordChangeRequest passwordChangeRequest) {
        userService.changePassword(passwordChangeRequest);
        return ResponseEntity.ok(new MessageResponse("Password changed successfully!"));
    }
}
