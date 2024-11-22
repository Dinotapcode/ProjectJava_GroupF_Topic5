package com.arjuncodes.studentsystem.service;

import com.arjuncodes.studentsystem.model.Payment;

import java.util.List;

public interface    PaymentService {
    Payment savePayment(Payment payment);
    boolean processPayment(Payment payment);
    List<Payment> getAllPayments(); // Add this method to fetch all payments
    List<Payment> getPaymentsByUserId(int userId); // Add this method to fetch payments by userId
    boolean hasActiveSubscription(int userId); // Check if the user has an active subscription
}
