package com.arjuncodes.studentsystem.service;

import com.arjuncodes.studentsystem.model.Consultations;
import com.arjuncodes.studentsystem.repository.ConsultationsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ConsultationsService {

    @Autowired
    private ConsultationsRepository consultationsRepository;

    // Lưu lịch hẹn
    public Consultations scheduleConsultations(Consultations consultation) {
        // Kiểm tra nếu product_id là null
        if (consultation.getProduct_id() == null) {
            throw new IllegalArgumentException("Product ID cannot be null");
        }
        return consultationsRepository.save(consultation);
    }

    // Lấy tất cả các cuộc hẹn
    public List<Consultations> getAllConsultations() {
        return consultationsRepository.findAll();
    }
    // Cập nhật lịch tư vấn
    public Consultations updateConsultation(Integer id, Consultations consultation) {
        Optional<Consultations> existingConsultation = consultationsRepository.findById(id);
        if (existingConsultation.isPresent()) {
            Consultations updatedConsultation = existingConsultation.get();
            updatedConsultation.setContact(consultation.getContact());
            updatedConsultation.setDate(consultation.getDate());
            updatedConsultation.setTime(consultation.getTime());
            return consultationsRepository.save(updatedConsultation);
        }
        return null;
    }


    // Xóa lịch tư vấn
    public boolean deleteConsultation(Integer id) {
        Optional<Consultations> consultation = consultationsRepository.findById(id);
        if (consultation.isPresent()) {
            consultationsRepository.deleteById(id);
            return true;
        }
        return false;
    }
}