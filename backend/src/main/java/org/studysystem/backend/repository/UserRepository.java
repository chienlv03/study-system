package org.studysystem.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.studysystem.backend.entity.User;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Boolean existsByEmail(String email);

    @Query(value = "SELECT u.* FROM users u " +
            "JOIN user_roles ur ON u.id = ur.user_id " +
            "JOIN roles r ON ur.role_id = r.id " +
            "WHERE r.name = 'ROLE_STUDENT' " +
            "AND LOWER(u.username) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "LIMIT 5",
            nativeQuery = true)
    List<User> searchUsers(@Param("keyword") String keyword);


    Optional<User> findByUsername(String currentUsername);
}
