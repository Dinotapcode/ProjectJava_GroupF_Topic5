package com.arjuncodes.studentsystem.service;

import com.arjuncodes.studentsystem.model.Subscription;
import com.arjuncodes.studentsystem.repository.SubscriptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubscriptionServiceImpl implements SubscriptionService {

    @Autowired
    private SubscriptionRepository subscriptionRepository;

    @Override
    public Subscription saveSubscription(Subscription subscription) {
        return subscriptionRepository.save(subscription);
    }

    @Override
    public List<Subscription> getActiveSubscription() {
        return subscriptionRepository.findByStatus("ACTIVE");
    }

    @Override
    public List<Subscription> getAllSubscriptions() {
        return subscriptionRepository.findAll();
    }

    public long countSubscriptions() {
        return subscriptionRepository.count();
    }

    @Override
    public Subscription getSubscriptionById(int id) {
        return subscriptionRepository.findById(id).orElse(null);
    }

    @Override
    public void deleteSubscription(Subscription subscription) {
        subscriptionRepository.delete(subscription);
    }

    @Override
    public boolean existsById(int subscriptionId) {
        return subscriptionRepository.existsById(subscriptionId);
    }

}
