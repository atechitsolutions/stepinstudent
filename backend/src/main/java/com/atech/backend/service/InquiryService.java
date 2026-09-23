package com.atech.backend.service;

import com.atech.backend.dto.InquiryRequest;
import com.atech.backend.entity.Inquiry;
import com.atech.backend.repository.InquiryRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

@Service
public class InquiryService {

    private final InquiryRepository repo;
    private final ObjectMapper mapper;
    private final EmailService emailService;

    public InquiryService(
            InquiryRepository repo,
            ObjectMapper mapper,
            EmailService emailService
    ) {
        this.repo = repo;
        this.mapper = mapper;
        this.emailService = emailService;
    }

    public Inquiry create(InquiryRequest r) {

        Inquiry i = new Inquiry();

        i.setFullName(r.fullName().trim());

        i.setPhone(r.phone().trim());

        i.setEmail(r.email().trim());

        i.setCompany(
                r.company() == null
                        ? null
                        : r.company().trim()
        );

        try {
            i.setServices(
                    mapper.writeValueAsString(r.services())
            );
        } catch (JsonProcessingException e) {
            throw new IllegalArgumentException(
                    "Invalid services data"
            );
        }

        i.setMessage(r.message().trim());

        // Save inquiry in MySQL
        Inquiry savedInquiry = repo.save(i);

        // Send inquiry to email
        emailService.sendInquiryEmail(
                savedInquiry.getFullName(),
                savedInquiry.getEmail(),
                savedInquiry.getPhone(),
                savedInquiry.getCompany(),
                savedInquiry.getServices(),
                savedInquiry.getMessage()
        );

        return savedInquiry;
    }
}