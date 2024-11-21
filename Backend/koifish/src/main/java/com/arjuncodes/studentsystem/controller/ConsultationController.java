package com.arjuncodes.studentsystem.controller;

import com.arjuncodes.studentsystem.model.Consultations;
import com.arjuncodes.studentsystem.service.ConsultationsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000") // Cấu hình CORS cho controller này
public class ConsultationController {

    @Autowired
    private ConsultationsService consultationsService;

    // API để tạo lịch tư vấn
    @PostMapping("/public/consultation/schedule")
    public ResponseEntity<String> scheduleConsultation(@RequestBody Consultations consultation) {
        try {
            // Kiểm tra nếu product_id là null
            if (consultation.getProduct_id() == null) {
                return new ResponseEntity<>("Product ID is required", HttpStatus.BAD_REQUEST);
            }

            Consultations scheduledConsultation = consultationsService.scheduleConsultations(consultation);
            return new ResponseEntity<>("Đặt lịch tư vấn thành công", HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Đã xảy ra lỗi khi tạo lịch hẹn", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // API để lấy danh sách tất cả consultations
    @GetMapping("/public/consultation/all")
    public ResponseEntity<?> getAllConsultations() {
        try {
            // Gọi service để lấy danh sách consultations
            List<Consultations> consultations = consultationsService.getAllConsultations();
            return new ResponseEntity<>(consultations, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Đã xảy ra lỗi khi lấy danh sách consultations", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PutMapping("/public/consultation/update/{id}")
    public ResponseEntity<String> updateConsultation(@PathVariable Integer id, @RequestBody Consultations consultation) {
        try {
            // Kiểm tra nếu id là hợp lệ và nếu lịch tư vấn tồn tại
            Consultations updatedConsultation = consultationsService.updateConsultation(id, consultation);
            if (updatedConsultation == null) {
                return new ResponseEntity<>("Lịch tư vấn không tồn tại", HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>("Cập nhật lịch tư vấn thành công", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Đã xảy ra lỗi khi cập nhật lịch tư vấn", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    // API để xóa lịch tư vấn
    @DeleteMapping("/public/consultation/delete/{id}")
    public ResponseEntity<String> deleteConsultation(@PathVariable Integer id) {
        try {
            boolean isDeleted = consultationsService.deleteConsultation(id);
            if (!isDeleted) {
                return new ResponseEntity<>("Lịch tư vấn không tồn tại", HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>("Lịch tư vấn đã bị xóa", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Đã xảy ra lỗi khi xóa lịch tư vấn", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
