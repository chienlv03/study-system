package org.studysystem.backend.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.studysystem.backend.security.jwt.AuthEntryPointJwt;
import org.studysystem.backend.security.jwt.AuthTokenFilter;
import org.studysystem.backend.security.servicesSecurity.UserDetailsServiceImpl;

import java.util.Arrays;

@Configuration
@EnableMethodSecurity // by default
public class WebSecurityConfig {
  @Autowired
  UserDetailsServiceImpl userDetailsService;

  @Autowired
  private AuthEntryPointJwt unauthorizedHandler;

  // Định nghĩa bean cho bộ lọc JWT để xử lý xác thực JWT trong các yêu cầu HTTP.
  @Bean
  public AuthTokenFilter authenticationJwtTokenFilter() {
    return new AuthTokenFilter();
  }

  // Định nghĩa provider xác thực DAO
  @Bean
  public DaoAuthenticationProvider authenticationProvider() {
    DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
    authProvider.setUserDetailsService(userDetailsService); // Cung cấp dịch vụ chi tiết người dùng
    authProvider.setPasswordEncoder(passwordEncoder()); // Cung cấp mã hóa mật khẩu
    return authProvider;
  }
  
  @Bean
  public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
    return authConfig.getAuthenticationManager();
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowCredentials(true);
    configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
    configuration.setAllowedHeaders(Arrays.asList("Authorization","Content-Type"));
    configuration.setExposedHeaders(Arrays.asList("Authorization"));
    configuration.setAllowedMethods(Arrays.asList("GET","POST","PUT","DELETE", "PATCH"));
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
  }

  // Định nghĩa cấu hình bảo mật HTTP
  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    // Vô hiệu hóa CSRF và cấu hình xử lý lỗi xác thực
    http.cors(AbstractHttpConfigurer::disable)
            .cors(c -> c.configurationSource(corsConfigurationSource()))
            .exceptionHandling(customizer -> customizer.authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)))
            .csrf(AbstractHttpConfigurer::disable)
            .exceptionHandling(exception -> exception.authenticationEntryPoint(unauthorizedHandler))
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // Cấu hình quản lý phiên
            .authorizeHttpRequests(auth ->
                    auth.requestMatchers("/api/auth/**").permitAll()
                            .anyRequest().authenticated() // Yêu cầu xác thực cho tất cả các yêu cầu khác
            );

    // Cung cấp provider xác thực DAO
    http.authenticationProvider(authenticationProvider());

    // Thêm bộ lọc JWT trước UsernamePasswordAuthenticationFilter
    http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);

    return http.build(); // Xây dựng và trả về SecurityFilterChain
  }
}
