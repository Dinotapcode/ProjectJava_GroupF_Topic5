package com.arjuncodes.studentsystem.controller;

import com.arjuncodes.studentsystem.model.Payment;
import com.arjuncodes.studentsystem.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/payments")
@CrossOrigin
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/add")
    public String addPayment(@RequestBody Payment payment) {
        // Kiểm tra giá trị subscriptionId
        if (payment.getSubscriptionId() != 1 && payment.getSubscriptionId() != 2 && payment.getSubscriptionId() != 3) {
            return "Invalid subscription ID";
        }
        paymentService.savePayment(payment);
        return "New payment is added";
    }

    @GetMapping("/getAll")
    public List<Payment> getAllPayments() {
        return paymentService.getAllPayments();
    }
}
