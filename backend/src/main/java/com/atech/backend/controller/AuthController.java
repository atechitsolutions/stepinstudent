package com.atech.backend.controller;

import com.atech.backend.dto.LoginRequest;
import com.atech.backend.entity.Admin;
import com.atech.backend.repository.AdminRepository;
import com.atech.backend.security.JwtService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthController(
            AdminRepository adminRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService
    ) {
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody LoginRequest request
    ) {

        Admin admin = adminRepository
                .findByUsername(request.username())
                .orElse(null);

        if (admin == null) {
            return ResponseEntity
                    .status(401)
                    .body(Map.of(
                            "message",
                            "Invalid username or password"
                    ));
        }

        if (!passwordEncoder.matches(
                request.password(),
                admin.getPassword()
        )) {

            return ResponseEntity
                    .status(401)
                    .body(Map.of(
                            "message",
                            "Invalid username or password"
                    ));
        }

        String token = jwtService.generateToken(
                admin.getUsername(),
                admin.getRole()
        );

        return ResponseEntity.ok(
                Map.of(
                        "token", token,
                        "username", admin.getUsername(),
                        "role", admin.getRole()
                )
        );
    }
}