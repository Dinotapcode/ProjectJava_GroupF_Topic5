package com.arjuncodes.studentsystem.service;

import com.arjuncodes.studentsystem.model.Subscription;
import java.util.List;

public interface SubscriptionService {
    Subscription saveSubscription(Subscription subscription);
    List<Subscription> getAllSubscriptions(); // Đúng tên phương thức
    List<Subscription> getActiveSubscription(); // Đúng tên phương thức
    Subscription getSubscriptionById(int id);
    void deleteSubscription(Subscription subscription);
    boolean existsById(int subscriptionId);
    long countSubscriptions();
}
