package com.arjuncodes.studentsystem.model;

import javax.persistence.*;

@Entity
public class Subscription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int subscriptionId;

    private String subscriptionName;
    private double price;
    private String description;
    private int duration; // Duration in days

    // Constructors
    public Subscription() {}

    public Subscription(String subscriptionName, double price, String description, int duration) {
        this.subscriptionName = subscriptionName;
        this.price = price;
        this.description = description;
        this.duration = duration;
    }

    // Getters and Setters
    public int getSubscriptionId() {
        return subscriptionId;
    }

    public void setSubscriptionId(int subscriptionId) {
        this.subscriptionId = subscriptionId;
    }

    public String getSubscriptionName() {
        return subscriptionName;
    }

    public void setSubscriptionName(String subscriptionName) {
        this.subscriptionName = subscriptionName;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }
}
