package org.studysystem.backend.service.seviceImpl;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.studysystem.backend.dto.request.PasswordChangeRequest;
import org.studysystem.backend.dto.request.UserInfoSearchRequest;
import org.studysystem.backend.dto.request.UserUpdateRequest;
import org.studysystem.backend.dto.response.UserInfoResponse;
import org.studysystem.backend.entity.User;
import org.studysystem.backend.mapper.UserMapper;
import org.studysystem.backend.repository.CourseRepository;
import org.studysystem.backend.repository.UserRepository;
import org.studysystem.backend.service.UserService;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    @Override
    public List<UserInfoSearchRequest> searchStudents(String keyword) {
        List<User> users = userRepository.searchUsers(keyword);
        return users.stream().map(user -> new UserInfoSearchRequest(
                user.getId(),
                user.getCode(),
                user.getUsername(),
                user.getEmail()
        )).collect(Collectors.toList());
    }

    @Override
    public UserInfoResponse updateUser(UserUpdateRequest userUpdateRequest) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUsername = authentication.getName();

        Optional<User> optionalUser = userRepository.findByUsername(currentUsername);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            userMapper.updateUser(user, userUpdateRequest);

            return userMapper.toUserInfoResponse(userRepository.save(user));
        } else {
            throw new RuntimeException("User not found");
        }
    }

    @Override
    public UserInfoResponse getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUsername = authentication.getName();

        Optional<User> optionalUser = userRepository.findByUsername(currentUsername);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            return userMapper.toUserInfoResponse(user);
        } else {
            throw new RuntimeException("User not found");
        }
    }

    @Override
    public void changePassword(PasswordChangeRequest passwordChangeRequest) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUsername = authentication.getName();

        Optional<User> optionalUser = userRepository.findByUsername(currentUsername);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (passwordEncoder.matches(passwordChangeRequest.getOldPassword(), user.getPassword())) {
                user.setPassword(passwordEncoder.encode(passwordChangeRequest.getNewPassword()));
                userRepository.save(user);
            } else {
                throw new RuntimeException("Old password is incorrect");
            }
        } else {
            throw new RuntimeException("User not found");
        }
    }
}
