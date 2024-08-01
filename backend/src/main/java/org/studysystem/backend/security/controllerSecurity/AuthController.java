package org.studysystem.backend.security.controllerSecurity;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.studysystem.backend.dto.request.LoginRequest;
import org.studysystem.backend.dto.request.SignupRequest;
import org.studysystem.backend.dto.response.MessageResponse;
import org.studysystem.backend.dto.response.UserInfoResponse;
import org.studysystem.backend.entity.RefreshToken;
import org.studysystem.backend.entity.Role;
import org.studysystem.backend.entity.User;
import org.studysystem.backend.entity.enums.ERole;
import org.studysystem.backend.exception.TokenRefreshException;
import org.studysystem.backend.mapper.UserMapper;
import org.studysystem.backend.repository.RoleRepository;
import org.studysystem.backend.repository.UserRepository;
import org.studysystem.backend.security.jwt.JwtUtils;
import org.studysystem.backend.security.servicesSecurity.RefreshTokenService;
import org.studysystem.backend.security.servicesSecurity.UserDetailsImpl;

import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

  private final AuthenticationManager authenticationManager;
  private final UserRepository userRepository;
  private final RoleRepository roleRepository;
  private final PasswordEncoder encoder;
  private final JwtUtils jwtUtils;
  private final UserMapper userMapper;
  private final RefreshTokenService refreshTokenService;

  @PostMapping("/sign-in")
  public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

    if (!userRepository.existsByEmail(loginRequest.getEmail())) {
      return ResponseEntity.badRequest().body(new MessageResponse("Tài khoản không tồn tại"));
    }

    // Lấy thông tin người dùng từ cơ sở dữ liệu
    User user = userRepository.findByEmail(loginRequest.getEmail())
            .orElseThrow(() -> new RuntimeException("Tài khoản không tồn tại."));

    // Kiểm tra mật khẩu
    if (!encoder.matches(loginRequest.getPassword(), user.getPassword())) {
      return ResponseEntity.badRequest().body(new MessageResponse("Mật khẩu không đúng"));
    }

    Authentication authentication = authenticationManager
            .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

    SecurityContextHolder.getContext().setAuthentication(authentication);

    UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

    ResponseCookie jwtCookie = jwtUtils.generateJwtCookie(userDetails);

    List<String> roles = userDetails.getAuthorities().stream()
            .map(GrantedAuthority::getAuthority)
            .collect(Collectors.toList());

    RefreshToken refreshToken = refreshTokenService.createRefreshToken(userDetails.getId());

    ResponseCookie jwtRefreshCookie = jwtUtils.generateRefreshJwtCookie(refreshToken.getToken());

    return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
            .header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
            .header(HttpHeaders.SET_COOKIE, jwtRefreshCookie.toString())
            .body(new UserInfoResponse(userDetails.getId(),
                    userDetails.getCode(),
                    userDetails.getUsername(),
                    userDetails.getEmail(),
                    userDetails.getDob(),
                    userDetails.getGender(),
                    roles));
  }

  @PostMapping("/signup")
  public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
    if (userRepository.existsByEmail(signUpRequest.getEmail())) {
      return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already in use!"));
    }

    // Use mapper to create new user's account
    User user = userMapper.toUser(signUpRequest);
    user.setPassword(encoder.encode(signUpRequest.getPassword()));

    Set<String> strRoles = signUpRequest.getRole();
    Set<Role> roles = new HashSet<>();

    if (strRoles == null) {
      Role userRole = roleRepository.findByName(ERole.ROLE_STUDENT)
              .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
      roles.add(userRole);
    } else {
      strRoles.forEach(role -> {
        switch (role) {
          case "ROLE_ADMIN":
            Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(adminRole);
            break;
          case "ROLE_TEACHER":
            Role modRole = roleRepository.findByName(ERole.ROLE_TEACHER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(modRole);
            break;
          case "ROLE_STUDENT":
                Role userRole = roleRepository.findByName(ERole.ROLE_STUDENT)
                        .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                roles.add(userRole);
                break;
          default:
              throw new RuntimeException("Error: Role is not found.");
        }
      });
    }

    user.setRoles(roles);
    userRepository.save(user);

    return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
  }

  @PostMapping("/sign-out")
  public ResponseEntity<?> logoutUser() {
    Object principle = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    if (!Objects.equals(principle.toString(), "anonymousUser")) {
      Long userId = ((UserDetailsImpl) principle).getId();
      refreshTokenService.deleteByUserId(userId);
    }

    ResponseCookie jwtCookie = jwtUtils.getCleanJwtCookie();
    ResponseCookie jwtRefreshCookie = jwtUtils.getCleanJwtRefreshCookie();

    return ResponseEntity.ok()
            .header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
            .header(HttpHeaders.SET_COOKIE, jwtRefreshCookie.toString())
            .body(new MessageResponse("You've been signed out!"));
  }

  @PostMapping("/refresh-token")
  public ResponseEntity<?> refreshToken(HttpServletRequest request) {
    String refreshToken = jwtUtils.getJwtRefreshFromCookies(request);

    if ((refreshToken != null) && (!refreshToken.isEmpty())) {
      return refreshTokenService.findByToken(refreshToken)
              .map(refreshTokenService::verifyExpiration)
              .map(RefreshToken::getUser)
              .map(user -> {
                ResponseCookie jwtCookie = jwtUtils.generateJwtCookie(user);

                return ResponseEntity.ok()
                        .header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
                        .body(new MessageResponse("Token is refreshed successfully!"));
              })
              .orElseThrow(() -> new TokenRefreshException(refreshToken,
                      "Refresh token is not in database!"));
    }

    return ResponseEntity.badRequest().body(new MessageResponse("Refresh Token is empty!"));
  }
}
