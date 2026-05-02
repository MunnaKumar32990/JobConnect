package com.jobconnect.service;

import com.jobconnect.dto.request.auth.LoginRequest;
import com.jobconnect.dto.request.auth.RegisterRequest;
import com.jobconnect.dto.response.auth.AuthResponse;
import com.jobconnect.dto.response.auth.UserResponse;
import com.jobconnect.entity.auth.AccountStatus;
import com.jobconnect.entity.auth.User;
import com.jobconnect.entity.auth.UserRole;
import com.jobconnect.exception.AppException;
import com.jobconnect.repository.UserRepository;
import com.jobconnect.security.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;
    private final AuthenticationProvider authenticationProvider;

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        try {
            if (userRepository.existsByEmail(request.getEmail())) {
                throw new AppException("Email already exists", HttpStatus.BAD_REQUEST);
            }

            User user = User.builder()
                    .email(request.getEmail())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .firstName(request.getFirstName())
                    .lastName(request.getLastName())
                    .role(UserRole.valueOf(request.getRole().toUpperCase()))
                    .accountStatus(AccountStatus.ACTIVE)
                    .build();

            user = userRepository.save(user);

            String accessToken = tokenProvider.generateAccessTokenFromUsername(user.getEmail());
            String refreshToken = tokenProvider.generateRefreshToken(user.getEmail());

            UserResponse userResponse = UserResponse.builder()
                    .id(user.getId())
                    .email(user.getEmail())
                    .firstName(user.getFirstName())
                    .lastName(user.getLastName())
                    .role(user.getRole().name())
                    .accountStatus(user.getAccountStatus().name())
                    .createdAt(user.getCreatedAt())
                    .build();

            return AuthResponse.builder()
                    .accessToken(accessToken)
                    .refreshToken(refreshToken)
                    .user(userResponse)
                    .tokenType("Bearer")
                    .expiresIn(900000L)
                    .build();
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }

    public AuthResponse login(LoginRequest request) {
        Authentication authentication = authenticationProvider.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new AppException("User not found", HttpStatus.NOT_FOUND));

        String accessToken = tokenProvider.generateAccessToken(authentication);
        String refreshToken = tokenProvider.generateRefreshToken(authentication.getName());

        UserResponse userResponse = UserResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .role(user.getRole().name())
                .accountStatus(user.getAccountStatus().name())
                .createdAt(user.getCreatedAt())
                .build();

        return AuthResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .user(userResponse)
                .tokenType("Bearer")
                .expiresIn(900000L)
                .build();
    }

    public AuthResponse refreshToken(String refreshToken) {
        if (!tokenProvider.validateToken(refreshToken)) {
            throw new AppException("Invalid refresh token", HttpStatus.UNAUTHORIZED);
        }

        String username = tokenProvider.getUsernameFromToken(refreshToken);
        String newAccessToken = tokenProvider.generateAccessTokenFromUsername(username);

        return AuthResponse.builder()
                .accessToken(newAccessToken)
                .refreshToken(refreshToken)
                .tokenType("Bearer")
                .expiresIn(3600L)
                .build();
    }
}
