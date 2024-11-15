package com.arjuncodes.studentsystem.service;

import com.arjuncodes.studentsystem.model.Payment;
import java.util.List;

public interface PaymentService {
    Payment savePayment(Payment payment);
    List<Payment> getAllPayments();
}
