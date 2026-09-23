package com.atech.backend.config;

import com.atech.backend.entity.Admin;
import com.atech.backend.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class AdminInitializer {

    @Value("${app.admin.username}")
    private String username;

    @Value("${app.admin.password}")
    private String password;

    @Bean
    CommandLineRunner createAdmin(
            AdminRepository adminRepository,
            PasswordEncoder passwordEncoder
    ) {
        return args -> {

            if (adminRepository.findByUsername(username).isEmpty()) {

                Admin admin = new Admin();

                admin.setUsername(username);
                admin.setPassword(passwordEncoder.encode(password));
                admin.setRole("ADMIN");

                adminRepository.save(admin);

                System.out.println("=================================");
                System.out.println("ADMIN ACCOUNT CREATED");
                System.out.println("Username: " + username);
                System.out.println("=================================");

            } else {

                System.out.println("Admin account already exists.");
            }
        };
    }
}