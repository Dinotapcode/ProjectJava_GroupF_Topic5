package com.arjuncodes.studentsystem.service;

import com.arjuncodes.studentsystem.model.Subscription;

import java.util.List;

public interface SubscriptionService {
    Subscription saveSubscription(Subscription subscription);
    List<Subscription> getAllSubscriptions();
}
