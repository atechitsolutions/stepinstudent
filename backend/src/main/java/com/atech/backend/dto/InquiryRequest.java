package com.atech.backend.dto;
import jakarta.validation.constraints.*;
import java.util.List;
public record InquiryRequest(@NotBlank @Size(max=120) String fullName,@NotBlank @Pattern(regexp="^\\+?91[-\\s]?[6-9]\\d{9}$",message="Invalid Indian phone number") String phone,@NotBlank @Email @Size(max=180) String email,@Size(max=180) String company,@NotEmpty List<@NotBlank String> services,@NotBlank String budget,@NotBlank String timeline,@NotBlank @Size(max=5000) String message) {
}
