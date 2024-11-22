package com.arjuncodes.studentsystem.controller;

import com.arjuncodes.studentsystem.model.Payment;
import com.arjuncodes.studentsystem.service.PaymentService;
import com.arjuncodes.studentsystem.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class PaymentController {

    @Autowired
    private UserService userService;

    @Autowired
    private PaymentService paymentService;

    // Xử lý thanh toán
    @PostMapping("/public/payment/add")
    public ResponseEntity<String> processPayment(@RequestBody Payment payment) {
        boolean isSuccessful = userService.deductBalance(payment.getUserId(), payment.getAmount().doubleValue());

        if (isSuccessful) {
            payment.setPaymentDate(new Date());
            payment.setStatus("Completed");  // Set trạng thái thanh toán thành "Completed"
            paymentService.savePayment(payment);
            return ResponseEntity.ok("Thanh toán thành công.");
        } else {
            return ResponseEntity.badRequest().body("Không đủ tiền trong ví.");
        }
    }

    // Kiểm tra thanh toán theo userId
    @GetMapping("/public/payment/user/{userId}")
    public ResponseEntity<List<Payment>> getUserPayments(@PathVariable int userId) {
        List<Payment> payments = paymentService.getPaymentsByUserId(userId);
        if (payments.isEmpty()) {
            return ResponseEntity.ok(payments);  // Trả về danh sách rỗng nếu không có thanh toán
        }
        return ResponseEntity.ok(payments);
    }

    // Kiểm tra trạng thái đăng ký dịch vụ
    @GetMapping("/public/payment/check-subscription/{userId}")
    public ResponseEntity<String> checkUserSubscription(@PathVariable int userId) {
        boolean hasSubscription = paymentService.hasActiveSubscription(userId);
        if (hasSubscription) {
            return ResponseEntity.ok("Người dùng đã đăng ký dịch vụ.");
        } else {
            return ResponseEntity.badRequest().body("Người dùng chưa đăng ký dịch vụ.");
        }
    }
}
