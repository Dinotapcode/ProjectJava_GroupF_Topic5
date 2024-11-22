package com.arjuncodes.studentsystem.repository;

import com.arjuncodes.studentsystem.model.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubscriptionRepository extends JpaRepository<Subscription, Integer> {
    List<Subscription> findByStatus(String status);
    long count();
}
