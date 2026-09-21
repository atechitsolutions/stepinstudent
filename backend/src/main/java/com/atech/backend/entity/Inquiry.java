package com.atech.backend.entity;
import jakarta.persistence.*;
import java.time.LocalDateTime;
@Entity @Table(name="inquiries") public class Inquiry {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
    @Column(name="full_name",nullable=false) private String fullName;
    @Column(nullable=false) private String phone;
    @Column(nullable=false) private String email;
    private String company;
    @Column(columnDefinition="TEXT",nullable=false) private String services;
    private String budget;
    private String timeline;
    @Column(columnDefinition="TEXT",nullable=false) private String message;
    @Column(nullable=false) private String status="NEW";
    @Column(name="created_at",nullable=false) private LocalDateTime createdAt;
    @PrePersist void prePersist() {
        if(createdAt==null)createdAt=LocalDateTime.now();
        if(status==null)status="NEW";
    }
    public Long getId() {
        return id;
    }
    public String getFullName() {
        return fullName;
    }
    public void setFullName(String v) {
        fullName=v;
    }
    public String getPhone() {
        return phone;
    }
    public void setPhone(String v) {
        phone=v;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String v) {
        email=v;
    }
    public String getCompany() {
        return company;
    }
    public void setCompany(String v) {
        company=v;
    }
    public String getServices() {
        return services;
    }
    public void setServices(String v) {
        services=v;
    }
    public String getBudget() {
        return budget;
    }
    public void setBudget(String v) {
        budget=v;
    }
    public String getTimeline() {
        return timeline;
    }
    public void setTimeline(String v) {
        timeline=v;
    }
    public String getMessage() {
        return message;
    }
    public void setMessage(String v) {
        message=v;
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String v) {
        status=v;
    }
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}
