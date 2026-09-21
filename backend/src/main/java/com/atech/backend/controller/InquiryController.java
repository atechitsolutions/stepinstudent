package com.atech.backend.controller;
import com.atech.backend.dto.InquiryRequest;
import com.atech.backend.service.InquiryService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
@RestController @RequestMapping("/api/inquiries") public class InquiryController {
    private final InquiryService service;
    public InquiryController(InquiryService service) {
        this.service=service;
    }
    @PostMapping public ResponseEntity<Map<String,Object>> create(@Valid @RequestBody InquiryRequest request) {
        service.create(request);
        return ResponseEntity.status(201).body(Map.of("success",true,"message","Project inquiry submitted successfully."));
    }
}
