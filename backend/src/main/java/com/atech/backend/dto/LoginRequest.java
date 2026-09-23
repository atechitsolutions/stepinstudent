package com.atech.backend.dto;

public record LoginRequest(
        String username,
        String password
) {
}