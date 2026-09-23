package com.atech.backend.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendInquiryEmail(
            String name,
            String email,
            String phone,
            String company,
            String services,
            String message
    ) {

        SimpleMailMessage mail = new SimpleMailMessage();

        mail.setTo("ashasvitech@gmail.com");

        mail.setSubject("New Project Inquiry - A-Tech");

        mail.setText(
                "NEW PROJECT INQUIRY\n\n" +
                        "Name: " + name + "\n" +
                        "Email: " + email + "\n" +
                        "Phone: " + phone + "\n" +
                        "Company: " + company + "\n" +
                        "Services Required: " + services + "\n\n" +
                        "Message:\n" +
                        message + "\n\n" +
                        "--------------------------------\n" +
                        "This inquiry was submitted from the A-Tech website."
        );

        mailSender.send(mail);
    }
}