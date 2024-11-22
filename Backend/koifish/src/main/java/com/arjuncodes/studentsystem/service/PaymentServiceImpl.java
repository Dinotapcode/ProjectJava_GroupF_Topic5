package com.arjuncodes.studentsystem.service;

import com.arjuncodes.studentsystem.model.Payment;
import com.arjuncodes.studentsystem.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private UserService userService;

    @Override
    public Payment savePayment(Payment payment) {
        return paymentRepository.save(payment);
    }

    @Override
    public boolean processPayment(Payment payment) {
        try {
            Double amount = payment.getAmount().doubleValue();
            boolean isSuccessful = userService.deductBalance(payment.getUserId(), amount);

            if (!isSuccessful) {
                return false;
            }

            payment.setPaymentDate(new Date(System.currentTimeMillis()));  // Ghi ngày giao dịch
            payment.setStatus("SUCCESS");
            paymentRepository.save(payment);

            return true;
        } catch (RuntimeException e) {
            return false;
        }
    }

    @Override
    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    @Override
    public List<Payment> getPaymentsByUserId(int userId) {
        return paymentRepository.findByUserId(userId);
    }

    @Override
    public boolean hasActiveSubscription(int userId) {
        List<Payment> userPayments = paymentRepository.findByUserId(userId);

        // Kiểm tra xem có thanh toán nào hợp lệ không
        return userPayments.stream()
                .anyMatch(payment -> "Completed".equals(payment.getStatus()));
    }
}
