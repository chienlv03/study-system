  package org.studysystem.backend.security.servicesSecurity;

  import com.fasterxml.jackson.annotation.JsonIgnore;
  import lombok.AllArgsConstructor;
  import lombok.Builder;
  import lombok.Data;
  import lombok.NoArgsConstructor;
  import org.springframework.security.core.GrantedAuthority;
  import org.springframework.security.core.authority.SimpleGrantedAuthority;
  import org.springframework.security.core.userdetails.UserDetails;
  import org.studysystem.backend.entity.User;

  import java.io.Serial;
  import java.util.Collection;
  import java.util.List;
  import java.util.Objects;
  import java.util.stream.Collectors;

  @Data
  @AllArgsConstructor
  @NoArgsConstructor
  public class UserDetailsImpl implements UserDetails {
    @Serial
    private static final long serialVersionUID = 1L;

    private Long id;

    private String code;

    private String username;

    private String email;

    private String dob;

    private String gender;

    @JsonIgnore
    private String password;

    private Collection<? extends GrantedAuthority> authorities;

    public static UserDetailsImpl build(User user) {
      List<GrantedAuthority> authorities = user.getRoles().stream()
          .map(role -> new SimpleGrantedAuthority(role.getName().name()))
          .collect(Collectors.toList());

      return new UserDetailsImpl(
              user.getId(),
              user.getCode(),
              user.getUsername(),
              user.getEmail(),
              user.getDob(),
              user.getGender(),
              user.getPassword(),
              authorities
      );
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
      return authorities;
    }

    @Override
    public String getPassword() {
      return password;
    }

    @Override
    public String getUsername() {
      return username;
    }

    @Override
    public boolean isAccountNonExpired() {
      return true;
    }

    @Override
    public boolean isAccountNonLocked() {
      return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
      return true;
    }

    @Override
    public boolean isEnabled() {
      return true;
    }

    @Override
    public boolean equals(Object o) {
      if (this == o)
        return true;
      if (o == null || getClass() != o.getClass())
        return false;
      UserDetailsImpl user = (UserDetailsImpl) o;
      return Objects.equals(id, user.id);
    }
  }
