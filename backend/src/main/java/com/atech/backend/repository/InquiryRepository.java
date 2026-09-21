package com.atech.backend.repository;
import com.atech.backend.entity.Inquiry;
import org.springframework.data.jpa.repository.JpaRepository;
public interface InquiryRepository extends JpaRepository<Inquiry,Long> {
}
