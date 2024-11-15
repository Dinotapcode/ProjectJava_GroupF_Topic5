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

    @GetMapping("/getAll")
    public List<Subscription> list() {
        return subscriptionService.getAllSubscriptions();
    }
}
