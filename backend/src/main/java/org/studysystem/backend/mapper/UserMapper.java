package org.studysystem.backend.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.studysystem.backend.dto.request.SignupRequest;
import org.studysystem.backend.dto.request.UserUpdateRequest;
import org.studysystem.backend.dto.response.UserInfoResponse;
import org.studysystem.backend.entity.User;

@Mapper(componentModel = "spring")
public interface UserMapper {
    @Mapping(target = "roles", ignore = true)
    User toUser(SignupRequest signUpRequest);

    @Mapping(target = "roles", expression = "java(user.getRoles().stream().map(role -> role.getName().name()).collect(java.util.stream.Collectors.toList()))")
    UserInfoResponse toUserInfoResponse(User user);

    @Mapping(target = "roles", ignore = true)
    void updateUser(@MappingTarget User user, UserUpdateRequest userUpdateRequest);
}
