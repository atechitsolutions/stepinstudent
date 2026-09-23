package com.atech.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.util.List;

public record InquiryRequest(

        @NotBlank
        @Size(max = 120)
        String fullName,

        @NotBlank
        @Pattern(
                regexp = "^\\+?91[-\\s]?[6-9]\\d{9}$",
                message = "Invalid Indian phone number"
        )
        String phone,

        @NotBlank
        @Email
        @Size(max = 180)
        String email,

        @Size(max = 180)
        String company,

        @NotEmpty
        List<@NotBlank String> services,

        @NotBlank
        @Size(max = 5000)
        String message
) {
}