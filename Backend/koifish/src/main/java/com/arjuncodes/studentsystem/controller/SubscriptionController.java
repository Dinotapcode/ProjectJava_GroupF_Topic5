package com.arjuncodes.studentsystem.controller;

import com.arjuncodes.studentsystem.model.Subscription;
import com.arjuncodes.studentsystem.service.SubscriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/subscriptions")
@CrossOrigin(origins = "http://localhost:3000")
public class SubscriptionController {

    @Autowired
    private SubscriptionService subscriptionService;

    @PostMapping("/add")
    public String add(@RequestBody Subscription subscription) {
        subscriptionService.saveSubscription(subscription);
        return "New subscription is added";
    }

    @GetMapping("/user/all")
    public List<Subscription> getActiveSubscription() {
        return subscriptionService.getActiveSubscription();
    }

    @GetMapping("/admin/all")
    public List<Subscription> getAllSubscriptions() { // Đúng tên phương thức
        return subscriptionService.getAllSubscriptions();
    }

    @PutMapping("/pause/{id}")
    public String pauseSubscription(@PathVariable("id") int id) {
        Subscription subscription = subscriptionService.getSubscriptionById(id);
        if (subscription != null) {
            subscription.setStatus("Paused");
            subscriptionService.saveSubscription(subscription);
            return "Subscription paused successfully";
        } else {
            return "Subscription not found";
        }
    }

    @DeleteMapping("/delete/{id}")
    public String deleteSubscription(@PathVariable("id") int id) {
        Subscription subscription = subscriptionService.getSubscriptionById(id);
        if (subscription != null) {
            subscriptionService.deleteSubscription(subscription);
            return "Subscription deleted successfully";
        } else {
            return "Subscription not found";
        }
    }

    @PutMapping("/resume/{id}")
    public String resumeSubscription(@PathVariable int id) {
        Subscription subscription = subscriptionService.getSubscriptionById(id);
        if (subscription == null) {
            return "Subscription not found!";
        }
        subscription.setStatus("Active");
        subscriptionService.saveSubscription(subscription);
        return "Subscription resumed successfully";
    }
}
